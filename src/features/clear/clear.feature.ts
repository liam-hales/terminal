import { buildFeature } from '../../helpers';
import { clearOptions } from '.';

/**
 * The clear feature, executed with `clear`, used
 * to clear the terminal of any blocks
 */
const clearFeature = buildFeature('system', {
  id: 'clear',
  command: 'clear',
  description: 'Used to clear the terminal',
  options: {
    schema: clearOptions,
    aliases: {
      last: 'l',
    },
  },
  component: undefined,
  isEnabled: true,
});

export default clearFeature;
