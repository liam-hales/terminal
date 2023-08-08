import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { base64OptionsSchema, base64Action } from '.';

/**
 * The Base64 feature, executed with `base64`, used to
 * Base64 encode or decode a given value
 */
const base64Feature = buildFeature({
  id: 'base64',
  command: {
    name: 'base64',
    description: 'Used to Base64 encode or decode a given value',
    options: {
      schema: base64OptionsSchema,
      config: {
        value: {
          description: 'The value to encode or decode',
        },
        decode: {
          description: 'Specifies that the value should be decoded (encoded by default)',
        },
      },
    },
    action: base64Action,
  },
  component: TextOutput,
  enabled: true,
});

export default base64Feature;
