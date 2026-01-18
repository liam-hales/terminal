import { z } from 'zod';

/**
 * The common options schema used to describe the
 * common command options for all features using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const commonOptions = z.object({
  help: z
    .boolean()
    .optional()
    .default(false)
    .describe('Display help for the command'),
});

export default commonOptions;
