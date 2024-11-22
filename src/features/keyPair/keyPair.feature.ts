import { buildFeature } from '../../helpers';
import { KeyPairFeature } from '../../components';
import { keyPairOptions, keyPairAction } from '.';

/**
 * The key pair feature, executed with `keypair`, used to generate
 * public and private key pairs using the `crypto` package under the hood
 */
const keyPairFeature = buildFeature({
  id: 'key-pair',
  command: {
    name: 'keypair',
    description: 'Used to generate public and private key pairs',
    options: keyPairOptions,
    execution: 'server',
    action: keyPairAction,
  },
  component: KeyPairFeature,
  enabled: true,
});

export default keyPairFeature;
