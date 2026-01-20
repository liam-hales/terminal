import { z } from 'zod';

/**
 * The share options schema used to describe the
 * share feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const shareOptions = z.object({
  last: z
    .number()
    .min(1)
    .max(8)
    .optional()
    .default(1)
    .describe('The number of previous blocks to share'),
  selfDestruct: z
    .boolean()
    .optional()
    .default(false)
    .describe('Self destructs the block data once viewed'),
});

export default shareOptions;
