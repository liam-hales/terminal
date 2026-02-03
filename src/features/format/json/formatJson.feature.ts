import { buildFeature } from '../../../helpers';
import { TextOutput } from '../../../components';
import { formatJsonOptions, formatJsonAction } from './';

/**
 * The format JSON feature, executed with `format json`,
 * used to format a given JSON string
 */
const formatJsonFeature = buildFeature('managed', {
  id: 'format-json',
  command: 'format json',
  description: 'Used to format a given JSON string',
  options: {
    schema: formatJsonOptions,
    aliases: {
      value: 'v',
    },
  },
  execution: 'client',
  action: formatJsonAction,
  component: TextOutput,
  isEnabled: true,
});

export default formatJsonFeature;
