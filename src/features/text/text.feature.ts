import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { z } from 'zod';

/**
 * The text feature, executed with `text`, used
 * to switch the terminal to text mode
 */
const textFeature = buildFeature('system', {
  id: 'text',
  command: 'text',
  description: 'Used to enter text mode for posting plain text to the terminal',
  options: z.object({}),
  component: TextOutput,
  isEnabled: true,
});

export default textFeature;
