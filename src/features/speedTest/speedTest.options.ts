import { z } from 'zod';

/**
 * The speed test options schema used to describe the
 * speed test feature command options using `zod`.
 *
 * This options schema is used for
 * validation and type inference.
 */
const speedTestOptions = z.object({
  unit: z
    .union([
      z.literal('Kbps'),
      z.literal('Mbps'),
      z.literal('Gbps'),
    ])
    .optional()
    .default('Mbps')
    .describe('The unit used to display network throughput'),
  detailed: z
    .boolean()
    .default(false)
    .describe('Displays more granular details such as directional latency/jitter'),
});

export default speedTestOptions;
