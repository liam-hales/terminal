import { z } from 'zod';

/**
 * The file upload options schema used to describe the
 * file upload feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const fileUploadOptions = z.object({
  zip: z
    .boolean()
    .optional()
    .default(false)
    .describe('Compress and archive the file(s) into a .zip before uploading'),
});

export default fileUploadOptions;
