import { z } from 'zod';

/**
 * The datetime options schema used to describe the
 * datetime feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const dateOptions = z.object({
  value: z
    .union([
      z.string(),
      z
        .number()
        .int()
        .min(0),
    ])
    .optional()
    .describe('The UTC datetime value in any format such as an ISO string or UNIX time in milliseconds. If omitted, the current datetime is used'),
  timezone: z
    .union([
      z.string(),
      z.literal('current'),
    ])
    .optional()
    .describe('The timezone used to display the datetime'),
});

export default dateOptions;
