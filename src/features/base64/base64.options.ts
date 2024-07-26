import { z } from 'zod';

/**
 * The Base64 options schema used to describe the
 * Base64 feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const base64Options = z.object({
  value: z
    .string()
    .describe('The value to encode or decode'),
  decode: z
    .boolean()
    .optional()
    .default(false)
    .describe('Specifies that the value should be decoded'),
});

export default base64Options;
