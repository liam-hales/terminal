import { z } from 'zod';

/**
 * The JWT options schema used to describe the
 * JWT feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const jwtOptions = z.object({
  token: z
    .string()
    .min(1)
    .describe('The token to decode and inspect'),
});

export default jwtOptions;
