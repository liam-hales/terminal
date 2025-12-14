import { buildFeature } from '../../helpers';
import { SpeedTestFeature } from '../../components';
import { speedTestOptions, speedTestAction } from '.';

/**
 * The speed test feature, executed with `speed test`, used to perform a network
 * speed test using the `@cloudflare/speedtest` package under the hood
 */
const speedTestFeature = buildFeature({
  id: 'speed-test',
  command: {
    name: 'speed test',
    description: 'Used to perform a network speed test (powered by Cloudflare)',
    options: speedTestOptions,
    execution: 'client',
    action: speedTestAction,
  },
  component: SpeedTestFeature,
  isEnabled: true,
});

export default speedTestFeature;
