import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalExecutedBlock as ExecutedBlock } from '../../types';

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
const TerminalExecutedBlock: FunctionComponent<Props> = ({ input }): ReactElement<Props> => {

  const inputText = `> ${input}`;
  return (
    <div className="p-6 border-solid border-t-2 border-zinc-900">
      <p className="font-mono font-bold text-sm text-white pb-2">
        {inputText}
      </p>
    </div>
  );
};

export default TerminalExecutedBlock;
