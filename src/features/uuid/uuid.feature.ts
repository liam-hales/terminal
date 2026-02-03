import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { uuidOptions, uuidAction } from '.';

/**
 * The UUID feature, executed with `uuid`, used to generate
 * a UUID using the `uuid` package under the hood
 */
const uuidFeature = buildFeature('managed', {
  id: 'uuid',
  command: 'uuid',
  description: 'Used to generate a UUID',
  options: {
    schema: uuidOptions,
    aliases: {
      version: 'v',
    },
  },
  execution: 'client',
  action: uuidAction,
  component: TextOutput,
  isEnabled: true,
});

export default uuidFeature;
