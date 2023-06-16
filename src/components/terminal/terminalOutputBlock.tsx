import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalOutputBlock as OutputBlock } from '../../types';

/**
 * The `TerminalOutputBlock` component props
 */
type Props = Omit<OutputBlock, 'type'> & BaseProps;

/**
 * Used to render the terminal output block
 *
 * @param props The component props
 * @returns The `TerminalOutputBlock` component
 */
const TerminalOutputBlock: FunctionComponent<Props> = ({ input }): ReactElement<Props> => {

  const inputText = `> ${input}`;
  return (
    <div className="p-6 border-solid border-t-2 border-zinc-900">
      <p className="font-mono font-bold text-sm text-white pb-2">
        {inputText}
      </p>
    </div>
  );
};

export default TerminalOutputBlock;
