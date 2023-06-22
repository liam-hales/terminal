import { z } from 'zod';

/**
 * The help options schema used to describe the
 * help feature command options using `zod`.
 *
 * The schema is used for validation
 * and type inference.
 */
const helpOptionsSchema = z
  .object({
    for: z.string().optional(),
  });

export default helpOptionsSchema;
