import { z } from 'zod';

/**
 * The IP options schema used to describe the
 * IP feature command options using `zod`.
 *
 * The schema is used for validation
 * and type inference.
 */
const base64OptionsSchema = z
  .object({
    version: z
      .union([
        z.literal(4),
        z.literal(6),
      ])
      .optional()
      .default(4),
  });

export default base64OptionsSchema;
