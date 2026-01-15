import { z } from 'zod';

/**
 * The clear options schema used to describe the
 * clear feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const clearOptions = z.object({
  last: z
    .number()
    .min(1)
    .optional()
    .describe('The number of previous blocks to clear'),
});

export default clearOptions;
