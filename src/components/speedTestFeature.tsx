import { Fragment, FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';
import { DelayValues, ThroughputValues } from './types';

/**
 * The `SpeedTestFeature` component props
 */
interface Props extends BaseProps {
  readonly throughput: ThroughputValues;
  readonly latency: DelayValues;
  readonly jitter: DelayValues;
  readonly showDetails?: boolean;
}

/**
 * Used to render the output UI for
 * the network speed test feature
 *
 * @param props The component props
 * @returns The `SpeedTestFeature` component
 */
const SpeedTestFeature: FunctionComponent<Props> = ({ throughput, latency, jitter, showDetails = false }): ReactElement<Props> => {
  return (
    <div className="flex flex-col items-start gap-y-6">
      <div className="flex flex-col items-start gap-y-1">
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Download
          </p>
          <p className="text-xs">
            {`↓ ${throughput.download} ${throughput.unit}`}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="w-32 text-xs">
            Upload
          </p>
          <p className="text-xs">
            {`↑ ${throughput.upload} ${throughput.unit}`}
          </p>
        </div>
      </div>
      {
        (showDetails === true) && (
          <Fragment>
            <div className="flex flex-row items-start gap-y-1">
              <p className="w-32 text-xs">
                Latency
              </p>
              <div className="flex flex-col gap-y-2">
                <p className="text-xs">
                  {`${latency.idle} ms`}
                </p>
                <div className="flex flex-row">
                  <p className="w-24 text-[10px]">
                    {`↓ ${latency.download} ms`}
                  </p>
                  <p className="text-[10px]">
                    {`↑ ${latency.upload} ms`}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start gap-y-1">
              <p className="w-32 text-xs">
                Jitter
              </p>
              <div className="flex flex-col gap-y-2">
                <p className="text-xs">
                  {`${jitter.idle} ms`}
                </p>
                <div className="flex flex-row">
                  <p className="w-24 text-[10px]">
                    {`↓ ${jitter.download} ms`}
                  </p>
                  <p className="text-[10px]">
                    {`↑ ${jitter.upload} ms`}
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        )
      }
      {
        (showDetails === false) && (
          <div className="flex flex-row">
            <p className="w-32 text-xs">
              Latency
            </p>
            <p className="text-xs">
              {`${latency.idle} ms`}
            </p>
          </div>
        )
      }
    </div>
  );
};

export default SpeedTestFeature;
