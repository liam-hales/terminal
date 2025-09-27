import { z } from 'zod';

/**
 * The encode options schema used to describe the
 * encode feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const encodeOptions = z.object({
  value: z
    .union([
      z
        .string()
        .min(1),
      z.number(),
    ])
    .describe('The value to encode'),
  from: z
    .union([
      z.literal('utf8'),
      z.literal('ascii'),
      z.literal('binary'),
      z.literal('hex'),
      z.literal('base64'),
    ])
    .optional()
    .default('utf8')
    .describe('The type of encoding to convert from (the current encoding)'),
  to: z
    .union([
      z.literal('utf8'),
      z.literal('ascii'),
      z.literal('binary'),
      z.literal('hex'),
      z.literal('base64'),
    ])
    .optional()
    .default('utf8')
    .describe('The type of encoding to convert to'),
});

export default encodeOptions;
