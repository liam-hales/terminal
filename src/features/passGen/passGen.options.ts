import { z } from 'zod';

/**
 * The password generator options schema used to describe the
 * password generator feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const passGenOptions = z.object({
  length: z
    .number()
    .int()
    .min(1)
    .max(256)
    .describe('The password length'),
  lowercase: z
    .boolean()
    .optional()
    .default(true)
    .describe('Includes lowercase letters'),
  uppercase: z
    .boolean()
    .optional()
    .default(true)
    .describe('Includes uppercase letters'),
  numbers: z
    .boolean()
    .optional()
    .default(true)
    .describe('Includes numbers'),
  symbols: z
    .boolean()
    .optional()
    .default(true)
    .describe('Includes symbols'),
});

export default passGenOptions;
