import { z } from 'zod';

/**
 * The UUID options schema used to describe the
 * UUID feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const uuidOptions = z.object({
  version: z
    .union([
      z.literal(1),
      z.literal(4),
      z.literal(6),
      z.literal(7),
    ])
    .optional()
    .default(4)
    .describe('The version of UUID to generate'),
});

export default uuidOptions;
