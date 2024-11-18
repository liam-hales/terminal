import { z } from 'zod';

/**
 * The MAC address lookup options schema used to describe the
 * MAC address lookup feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const macLookupOptions = z.object({
  address: z
    .string()
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, {
      message: 'Should be a valid MAC address',
    })
    .describe('The MAC address to lookup'),
});

export default macLookupOptions;
