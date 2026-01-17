import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalFeatureBlock as FeatureBlock } from '../../types';
import { featureMap } from '../../features';

/**
 * The `TerminalFeatureBlock` component props
 */
type Props = Omit<FeatureBlock, 'id' | 'type'> & BaseProps;

/**
 * Used to render the terminal feature block
 *
 * @param props The component props
 * @returns The `TerminalFeatureBlock` component
 */
const TerminalFeatureBlock: FunctionComponent<Props> = ({ input, duration, output }): ReactElement<Props> => {
  const { featureId, componentProps } = output;

  const feature = featureMap[featureId];

  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-xs break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between gap-x-3">
        <div className="flex flex-col">
          {/* @ts-expect-error - TypeScript does not currently support correlated unions */}
          <feature.component {...componentProps} />
        </div>
        <p className="text-xs">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalFeatureBlock;
