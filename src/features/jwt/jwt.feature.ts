import { buildFeature } from '../../helpers';
import { JWTFeature } from '../../components';
import { jwtOptions, jwtAction } from '.';

/**
 * The JWT feature, executed with `jwt`, used to
 * decode and inspect a JSON Web Token
 */
const jwtFeature = buildFeature({
  id: 'jwt',
  command: {
    name: 'jwt',
    description: 'Used to decode and inspect a JSON Web Token',
    options: jwtOptions,
    action: jwtAction,
  },
  component: JWTFeature,
  enabled: true,
});

export default jwtFeature;
