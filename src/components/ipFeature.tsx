import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';

/**
 * The `IpFeature` component props
 */
type Props = SingleVersionProps | MultiVersionProps;

/**
 * The `IpFeature` component props to
 * render a single IP address version
 */
interface SingleVersionProps extends BaseProps {
  readonly type: 'single-version';
  readonly address: string;
}

/**
 * The `IpFeature` component props to
 * render multiple IP address versions
 */
interface MultiVersionProps extends BaseProps {
  readonly type: 'multi-version';
  readonly v4Address?: string;
  readonly v6Address?: string;
}

/**
 * Used to render the output UI
 * for the IP feature
 *
 * @param props The component props
 * @returns The `IpFeature` component
 */
const IpFeature: FunctionComponent<Props> = (props): ReactElement<Props> => {
  const { type } = props;
  const unknown = 'Unknown, could not resolve address';

  return (
    <>
      {
        (type === 'single-version') && (
          <p className="font-mono text-sm text-white">{props.address}</p>
        )
      }
      {
        (type === 'multi-version') && (
          <div className="flex flex-col gap-y-1 pt-4">
            <div className="flex flex-row">
              <p className="w-24 font-mono text-sm text-blue-300">
                IPv4
              </p>
              <p className="font-mono text-sm text-white">
                {props.v4Address ?? unknown}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="w-24 font-mono text-sm text-blue-300">
                IPv6
              </p>
              <p className="font-mono text-sm text-white">
                {props.v6Address ?? unknown}
              </p>
            </div>
          </div>
        )
      }
    </>
  );
};

export default IpFeature;
