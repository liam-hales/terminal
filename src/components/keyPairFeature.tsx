import { FunctionComponent, ReactElement, Fragment } from 'react';
import { BaseProps } from '../types';

/**
 * The `KeyPairFeature` component props
 */
interface Props extends BaseProps {
  readonly publicKey: string;
  readonly privateKey: string;
}

/**
 * Used to render the output UI
 * for the key pair feature
 *
 * @param props The component props
 * @returns The `KeyPairFeature` component
 */
const KeyPairFeature: FunctionComponent<Props> = ({ publicKey, privateKey }): ReactElement<Props> => {
  return (
    <Fragment>
      <p className="font-mono text-sm text-white">
        Public Key
      </p>
      <pre className="font-mono text-sm text-blue-300 pt-2">
        {publicKey}
      </pre>
      <p className="font-mono text-sm text-white pt-4">
        Private Key
      </p>
      <pre className="font-mono text-sm text-blue-300 pt-2">
        {privateKey}
      </pre>
    </Fragment>
  );
};

export default KeyPairFeature;
