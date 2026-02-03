import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { encodeOptions, encodeAction } from '.';

/**
 * The encode feature, executed with `encode`, used to
 * encode a given value from one encoding to another
 */
const encodeFeature = buildFeature('managed', {
  id: 'encode',
  command: 'encode',
  description: 'Used to encode a given value from one encoding to another',
  options: {
    schema: encodeOptions,
    aliases: {
      value: 'v',
      from: 'f',
      to: 't',
    },
  },
  execution: 'client',
  action: encodeAction,
  component: TextOutput,
  isEnabled: true,
});

export default encodeFeature;
