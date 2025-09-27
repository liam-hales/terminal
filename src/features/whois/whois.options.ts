import { z } from 'zod';

/**
 * The whois options schema used to describe the
 * whois feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const whoisOptions = z.object({
  search: z
    .string()
    .min(1)
    .describe('The domain or IP address to search'),
  server: z
    .string()
    .min(1)
    .optional()
    .describe('The whois server to search against'),
  follow: z
    .number()
    .int()
    .min(0)
    .optional()
    .default(0)
    .describe('The number of times to follow redirects'),
  excludeRedacted: z
    .boolean()
    .optional()
    .default(false)
    .describe('Excludes the redacted data points from the output'),
});

export default whoisOptions;
