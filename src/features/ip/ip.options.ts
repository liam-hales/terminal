import { z } from 'zod';

/**
 * The IP options schema used to describe the
 * IP feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const ipOptions = z.object({
  version: z
    .union([
      z.literal(4),
      z.literal(6),
    ])
    .optional()
    .describe('The IP address version to resolve'),
});

export default ipOptions;
