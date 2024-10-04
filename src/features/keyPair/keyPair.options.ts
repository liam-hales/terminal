import { z } from 'zod';

/**
 * The key pair options schema used to describe the
 * keys feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const keyPairOptions = z.object({
  alg: z
    .union([
      z.literal('rsa'),
      z.literal('rsa-pss'),
      z.literal('ed25519'),
      z.literal('x25519'),
    ])
    .describe('The algorithm used to generate they keypair'),
  format: z
    .union([
      z.literal('pem'),
      z.literal('jwk'),
    ])
    .optional()
    .default('pem')
    .describe('The format/encoding used to represent the key pair'),
  size: z
    .number()
    .int()
    .min(512)
    .max(8192)
    .optional()
    .default(2048)
    .describe('The size (modulus length) of each key pair in bits. Only applies to RSA keys'),
});

export default keyPairOptions;
