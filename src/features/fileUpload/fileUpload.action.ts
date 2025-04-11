import { ComponentProps } from 'react';
import { z } from 'zod';
import { fileUploadOptions } from '.';
import { selectFiles } from '../../helpers';
import { upload } from '@vercel/blob/client';
import { FileUploadFeature } from '../../components';

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
  onProgress: (percentage: number) => void,
): Promise<Props> => {
  const { zip } = options;

  const files = await selectFiles();
  const blobs = await Promise.all(
    files.map(async (file) => {
      return await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/files/upload',
        onUploadProgress: ({ percentage }) => onProgress(percentage),
      });
    }),
  );

  return {
    files: blobs.map((blob, index) => {
      const { name, size } = files[index];
      const { url, contentType } = blob;

      const [, id] = url
        .split('vercel-storage.com/');

      return {
        name: name,
        size: size,
        contentType: contentType,
        url: `${window.location.hostname}/${id}`,
      };
    }),
  };
};

export default fileUploadAction;
