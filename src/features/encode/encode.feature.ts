import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { encodeOptions, encodeAction } from '.';

/**
 * The encode feature, executed with `encode`, used to
 * encode a given value from one encoding to another
 */
const encodeFeature = buildFeature({
  id: 'encode',
  command: {
    name: 'encode',
    description: 'Used to encode a given value from one encoding to another',
    options: encodeOptions,
    execution: 'client',
    action: encodeAction,
  },
  component: TextOutput,
  enabled: true,
});

export default encodeFeature;
