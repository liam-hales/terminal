import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { ipOptionsSchema, ipAction } from '.';

/**
 * The IP feature, executed with `ip`, used to
 * get the users public IP address
 */
const ipFeature = buildFeature({
  id: 'ip',
  command: {
    name: 'ip',
    description: 'Used to get the users public IP address',
    options: {
      schema: ipOptionsSchema,
      config: {
        version: {
          description: 'The IP address version to resolve',
        },
      },
    },
    action: ipAction,
  },
  component: TextOutput,
  enabled: true,
});

export default ipFeature;
