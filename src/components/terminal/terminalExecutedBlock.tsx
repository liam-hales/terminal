import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, FeatureComponentProps, TerminalExecutedBlock as ExecutedBlock } from '../../types';
import { featureMap } from '../../features';

/**
 * The `TerminalExecutedBlock` component props
 */
type Props = Omit<ExecutedBlock, 'id' | 'type'> & BaseProps;

/**
 * Used to render the terminal executed block
 *
 * @param props The component props
 * @returns The `TerminalExecutedBlock` component
 */
const TerminalExecutedBlock: FunctionComponent<Props> = ({ input, duration, output }): ReactElement<Props> => {
  const { featureId, componentProps } = output;

  const feature = featureMap[featureId];

  return (
    <div className="w-full flex flex-col gap-y-3">
      <p className="text-xs break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between gap-x-3">
        <div className="flex flex-col">
          <feature.component {...componentProps as FeatureComponentProps} />
        </div>
        <p className="text-xs">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalExecutedBlock;
