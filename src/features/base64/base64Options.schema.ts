import { z } from 'zod';

/**
 * The Base64 options schema used to describe the
 * Base64 feature command options using `zod`.
 *
 * The schema is used for validation
 * and type inference.
 */
const base64OptionsSchema = z
  .object({
    value: z.string(),
    decode: z.boolean().optional().default(false),
  });

export default base64OptionsSchema;
