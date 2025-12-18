import { buildFeature } from '../../../helpers';
import { TextOutput } from '../../../components';
import { formatJsonOptions, formatJsonAction } from './';

/**
 * The format JSON feature, executed with `format json`,
 * used to format a given JSON string
 */
const formatJsonFeature = buildFeature({
  id: 'format-json',
  command: {
    name: 'format json',
    description: 'Used to format a given JSON string',
    options: formatJsonOptions,
    execution: 'client',
    action: formatJsonAction,
  },
  component: TextOutput,
  isEnabled: true,
});

export default formatJsonFeature;
