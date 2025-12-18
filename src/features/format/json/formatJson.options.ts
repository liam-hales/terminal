import { z } from 'zod';

/**
 * The format JSON options schema used to describe the
 * format JSON feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const formatJsonOptions = z.object({
  value: z
    .string()
    .min(1)
    .describe('The JSON value to format'),
});

export default formatJsonOptions;
