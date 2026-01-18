import { buildFeature } from '../../helpers';
import { TextOutput } from '../../components';
import { passGenOptions, passGenAction } from '.';

/**
 * The password generator feature, executed with `passgen`,
 * used to generate strong and secure passwords
 */
const passGenFeature = buildFeature('managed', {
  id: 'pass-gen',
  command: 'passgen',
  description: 'Used to generate strong and secure passwords',
  options: passGenOptions,
  execution: 'client',
  action: passGenAction,
  component: TextOutput,
  isEnabled: true,
});

export default passGenFeature;
