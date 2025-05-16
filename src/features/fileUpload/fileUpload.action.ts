import { ComponentProps } from 'react';
import { z } from 'zod';
import { fileUploadOptions } from '.';
import { selectFiles, zipStream } from '../../helpers';
import { upload } from '@vercel/blob/client';
import { FileUploadFeature } from '../../components';
import { OnProgress } from '../../types';

/**
 * The file upload feature options
 */
type Options = z.infer<typeof fileUploadOptions>;

/**
 * The file upload feature component props
 */
type Props = ComponentProps<typeof FileUploadFeature>;

/**
 * The action used to execute the logic
 * for the file upload feature command
 *
 * @param options The feature options
 * @param onProgress The function used to update the action progress
 *
 * @returns The feature component props
 */
const fileUploadAction = async (
  options: Options,
  onProgress: OnProgress,
): Promise<Props> => {
  const { zip } = options;

  // Define the maximum file size
  // in bytes (50 MB)
  const maxFileSize = 52_428_800;

  // Allow the user to select files and make sure none
  // of them exceed the maximum file size limit
  const files = await selectFiles();
  const exceedsMaxSize = files.some((file) => file.size > maxFileSize);

  // If any of the files exceed the maximum file
  // size limit then throw an error
  if (exceedsMaxSize === true) {
    throw new Error('One or more files exceeds the maximum file size of 50 MB');
  }

  // Generate the array of data to upload
  // based on the command options
  const toUpload = (zip === true)
    ? [zipStream(files, (percentage) => onProgress(percentage, 'Archiving'))]
    : files;

  // Map the data to upload into an array of
  // upload promises and `await` on them all
  const blobs = await Promise.all(
    toUpload.map(async (file) => {

      // Workout the name based on
      // the data structure
      const name = (file instanceof ReadableStream)
        ? 'archive.zip'
        : file.name;

      return await upload(name, file, {
        access: 'public',
        handleUploadUrl: '/api/files/upload',
        onUploadProgress: ({ percentage }) => onProgress(percentage, 'Uploading'),
      });
    }),
  );

  return {
    files: blobs.map((blob, index) => {
      const { pathname, url, contentType } = blob;

      // Extract the file size (not supported for zip streams)
      const data = toUpload[index];
      const size = (data instanceof ReadableStream)
        ? 0
        : data.size;

      // Extract the unique file ID from the file URL which
      // will be used for the file URL to display
      const [, id] = url
        .split('vercel-storage.com/');

      return {
        name: pathname,
        size: size,
        contentType: contentType,
        url: `https://${window.location.hostname}/files/${id}`,
      };
    }),
  };
};

export default fileUploadAction;
