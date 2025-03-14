import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';

/**
 * The `IpFeature` component props
 */
interface Props {
  /**
   * This is required to avoid a component with props that have a union type. Union types
   * for component props breaks the `FeatureProp` intersection type used for type casting
   */
  readonly data: SingleVersionProps | MultiVersionProps;
}

/**
 * The `IpFeature` component props used to
 * render a single IP address version
 */
interface SingleVersionProps extends BaseProps {
  readonly type: 'single-version';
  readonly address: string;
}

/**
 * The `IpFeature` component props used to
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
const IpFeature: FunctionComponent<Props> = ({ data }): ReactElement<Props> => {
  const { type } = data;
  const unknown = 'Unknown, could not resolve address';

  return (
    <>
      {
        (type === 'single-version') && (
          <p className="font-mono text-sm text-white">{data.address}</p>
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
                {data.v4Address ?? unknown}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="w-24 font-mono text-sm text-blue-300">
                IPv6
              </p>
              <p className="font-mono text-sm text-white">
                {data.v6Address ?? unknown}
              </p>
            </div>
          </div>
        )
      }
    </>
  );
};

export default IpFeature;
