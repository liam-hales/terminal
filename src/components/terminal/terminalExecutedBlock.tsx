import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalExecutedBlock as ExecutedBlock, FeatureProp } from '../../types';
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
  const { featureId, props } = output;

  const feature = featureMap[featureId];

  return (
    <div className="pt-4 pb-5 pl-6 pr-4 border-solid border-t-[1px] border-zinc-900">
      <p className="font-mono text-sm text-zinc-500 pb-3 break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between">
        <feature.component {...props as FeatureProp} />
        <p className="font-mono text-xs text-zinc-500">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalExecutedBlock;
