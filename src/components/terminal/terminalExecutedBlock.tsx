import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalExecutedBlock as ExecutedBlock } from '../../types';
import features from '../../features';

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

  const feature = features.find((feature) => feature.id === featureId);
  const inputText = `> ${input}`;

  return (
    <div className="pt-4 pb-4 pl-6 pr-6 rounded-lg bg-zinc-950">
      <p className="font-mono font-bold text-sm text-zinc-500 pb-3">
        {inputText}
      </p>
      {
        // Only render the help feature, all other
        // features will be rendered differently
        (
          feature != null &&
          feature.id === 'help'
        ) && (
          <feature.component {...props} />
        )
      }
    </div>
  );
};

export default TerminalExecutedBlock;
