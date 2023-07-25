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
const TerminalExecutedBlock: FunctionComponent<Props> = ({ input, output }): ReactElement<Props> => {
  const { featureId, props } = output;

  const feature = featureMap[featureId];
  const inputText = `> ${input}`;

  return (
    <div className="pt-4 pb-4 pl-6 pr-6 rounded-lg bg-zinc-950">
      <p className="font-mono font-bold text-sm text-zinc-500 pb-3">
        {inputText}
      </p>
      <feature.component {...props as FeatureProp} />
    </div>
  );
};

export default TerminalExecutedBlock;
