import { buildFeature } from '../../helpers';
import { GroupedListOutput } from '../../components';
import { keyPairOptions, keyPairAction } from '.';

/**
 * The key pair feature, executed with `keypair`, used to generate
 * public and private key pairs using the `crypto` package under the hood
 */
const keyPairFeature = buildFeature('managed', {
  id: 'key-pair',
  command: 'keypair',
  description: 'Used to generate public and private key pairs',
  options: keyPairOptions,
  execution: 'server',
  action: keyPairAction,
  component: GroupedListOutput,
  isEnabled: true,
});

export default keyPairFeature;
