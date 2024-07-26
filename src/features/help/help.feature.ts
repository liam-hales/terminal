import { buildFeature } from '../../helpers';
import { HelpFeature } from '../../components';
import { helpOptions, helpAction } from '.';

/**
 * The help feature, executed with `help`, used to display help for
 * commands and give guidance on their options and how to use them
 */
const helpFeature = buildFeature({
  id: 'help',
  command: {
    name: 'help',
    description: 'Used to display help for commands and give guidance on their options and how to use them',
    options: helpOptions,
    action: helpAction,
  },
  component: HelpFeature,
  enabled: true,
});

export default helpFeature;
