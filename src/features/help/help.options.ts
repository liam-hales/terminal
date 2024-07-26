import { z } from 'zod';

/**
 * The help options schema used to describe the
 * help feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const helpOptions = z.object({
  for: z
    .string()
    .optional(),
});

export default helpOptions;
