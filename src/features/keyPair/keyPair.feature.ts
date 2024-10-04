import { buildFeature } from '../../helpers';
import { KeyPairFeature } from '../../components';
import { keyPairOptions, keyPairAction } from '.';

/**
 * The key pair feature, executed with `keypair`, used to generate
 * public and private key pairs using `crypto` under the hood
 */
const keyPairFeature = buildFeature({
  id: 'keyPair',
  command: {
    name: 'keypair',
    description: 'Used to generate public and private key pairs',
    options: keyPairOptions,
    action: keyPairAction,
  },
  component: KeyPairFeature,
  enabled: true,
});

export default keyPairFeature;
