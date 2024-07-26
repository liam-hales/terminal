import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { base64Options, base64Action } from '.';

/**
 * The Base64 feature, executed with `base64`, used to
 * Base64 encode or decode a given value
 */
const base64Feature = buildFeature({
  id: 'base64',
  command: {
    name: 'base64',
    description: 'Used to Base64 encode or decode a given value',
    options: base64Options,
    action: base64Action,
  },
  component: TextOutput,
  enabled: true,
});

export default base64Feature;
