import { ComponentProps } from 'react';
import { z } from 'zod';
import { fileUploadOptions } from '.';
import { selectFiles, zipStream } from '../../helpers';
import { upload } from '@vercel/blob/client';
import { FileUploadFeature } from '../../components';
import { ActionEvent } from '../../types';
import { Channel } from 'queueable';
import { PutBlobResult } from '@vercel/blob';

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
 * @returns The feature component props
 */
const fileUploadAction = async function* (options: Options): AsyncGenerator<ActionEvent<Props>> {
  const { zip } = options;

  // Define the queue channel and the maximum
  // file size in bytes (50 MB)
  const channel = new Channel<ActionEvent<Props>>();
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

  const blobs: PutBlobResult[] = [];
  const toUpload = (zip === true)
    ? [
        zipStream(files, (percentage) => {
          void channel.push({
            type: 'progress',
            percentage: percentage,
            message: 'Archiving',
          });
        }),
      ]
    : files;

  // Execute the function to used to upload the files one
  // after another and push events to the channel
  void (async () => {
    for (let index = 0; index < toUpload.length; index++) {

      const file = toUpload[index];
      const name = (file instanceof ReadableStream)
        ? 'archive.zip'
        : file.name;

      const blob = await upload(name, file, {
        access: 'public',
        handleUploadUrl: '/api/files/upload',
        onUploadProgress: ({ percentage }) => {

          // Push the progress event to the channel with the correct percentage
          // calculated based on how many files are being uploaded
          void channel.push({
            type: 'progress',
            percentage: ((index + (percentage / 100)) / toUpload.length) * 100,
            message: `Uploading ${index + 1}/${toUpload.length}`,
          });
        },
      });

      blobs.push(blob);

      // Push the update event to the channel
      // with the updated files array
      void channel.push({
        type: 'update',
        componentProps: {
          files: blobs.map((blob) => {
            const { pathname, url, contentType } = blob;

            // Extract the file size (not supported for zip streams)
            const size = (file instanceof ReadableStream)
              ? 0
              : file.size;

            // Extract the unique fi``le ID from the file URL which
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
        },
      });
    }

    void channel.return();
  })();

  // Loop through the channel and
  // yield each event
  for await (const event of channel) {
    yield event;
  }
};

export default fileUploadAction;
