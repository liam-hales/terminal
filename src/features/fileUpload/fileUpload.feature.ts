import { buildFeature } from '../../helpers';
import { fileUploadOptions, fileUploadAction } from '.';
import { FileUploadFeature } from '../../components';

/**
 * The file upload feature, executed with `file upload`, used to upload files
 * and share via a link using the `@vercel/blob` package under the hood
 */
const fileUploadFeature = buildFeature({
  id: 'file-upload',
  command: {
    name: 'file upload',
    description: 'Used to upload files and share via a link',
    options: fileUploadOptions,
    execution: 'client',
    action: fileUploadAction,
  },
  component: FileUploadFeature,
  enabled: true,
});

export default fileUploadFeature;
