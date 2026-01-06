import { buildFeature } from '../../helpers';
import { ListOutput } from '../../components';
import { ipOptions, ipAction } from '.';

/**
 * The IP feature, executed with `ip`, used to
 * resolve the users public IP address
 */
const ipFeature = buildFeature({
  id: 'ip',
  command: {
    name: 'ip',
    description: 'Used to resolve the users public IP address',
    options: ipOptions,
    execution: 'client',
    action: ipAction,
  },
  component: ListOutput,
  isEnabled: true,
});

export default ipFeature;
