import { FunctionComponent, ReactElement, Fragment } from 'react';
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
    <Fragment>
      <p className="text-xs">
        Decoded Token
      </p>
      <pre className="text-xs pt-4">
        header:
        {' '}
        {header}
      </pre>
      <pre className="text-xs pt-4">
        payload:
        {' '}
        {payload}
      </pre>
      <pre className="text-xs pt-4">
        signature:
        {' '}
        {`"${signature}"`}
      </pre>
    </Fragment>
  );
};

export default JWTFeature;
