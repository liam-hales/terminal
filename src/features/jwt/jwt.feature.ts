import { buildFeature } from '../../helpers';
import { GroupedListOutput } from '../../components';
import { jwtOptions, jwtAction } from '.';

/**
 * The JWT feature, executed with `jwt`, used to
 * decode and inspect a JSON Web Token
 */
const jwtFeature = buildFeature('managed', {
  id: 'jwt',
  command: 'jwt',
  description: 'Used to decode and inspect a JSON Web Token',
  options: {
    schema: jwtOptions,
    aliases: {
      token: 't',
    },
  },
  execution: 'client',
  action: jwtAction,
  component: GroupedListOutput,
  isEnabled: true,
});

export default jwtFeature;
