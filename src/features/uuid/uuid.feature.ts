import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { uuidOptions, uuidAction } from '.';

/**
 * The UUID feature, executed with `uuid`,
 * used to generate a UUID
 */
const uuidFeature = buildFeature({
  id: 'uuid',
  command: {
    name: 'uuid',
    description: 'Used to generate a UUID',
    options: uuidOptions,
    action: uuidAction,
  },
  component: TextOutput,
  enabled: true,
});

export default uuidFeature;
