import { buildFeature } from '../../helpers';
import { shareOptions } from '.';
import { ListOutput } from '../../components';

/**
 * The share feature, executed with `share`, used to
 * share encrypted terminal blocks via share URLs
 */
const shareFeature = buildFeature('system', {
  id: 'share',
  command: 'share',
  description: 'Used to share encrypted terminal blocks via share URLs',
  options: shareOptions,
  component: ListOutput,
  isEnabled: true,
});

export default shareFeature;
