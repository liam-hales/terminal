import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';

/**
 * The `JWTFeature` component props
 */
interface Props extends BaseProps {
  readonly header: string;
  readonly payload: string;
  readonly signature: string;
}

/**
 * Used to render the output UI
 * for the JWT feature
 *
 * @param props The component props
 * @returns The `JWTFeature` component
 */
const JWTFeature: FunctionComponent<Props> = ({ header, payload, signature }): ReactElement<Props> => {
  return (
    <>
      <p className="font-mono text-sm text-white">
        Decoded Token
      </p>
      <pre className="font-mono text-sm text-red-300 pt-4">
        header:
        {' '}
        {header}
      </pre>
      <pre className="font-mono text-sm text-purple-300 pt-4">
        payload:
        {' '}
        {payload}
      </pre>
      <pre className="font-mono text-sm text-blue-300 pt-4">
        signature:
        {' '}
        {`"${signature}"`}
      </pre>
    </>
  );
};

export default JWTFeature;
