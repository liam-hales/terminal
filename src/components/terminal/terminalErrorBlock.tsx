import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalErrorBlock as ErrorBlock } from '../../types';

/**
 * The `TerminalErrorBlock` component props
 */
type Props = Omit<ErrorBlock, 'type'> & BaseProps;

/**
 * Used to render the terminal error block
 *
 * @param props The component props
 * @returns The `TerminalErrorBlock` component
 */
const TerminalErrorBlock: FunctionComponent<Props> = ({ input, value }): ReactElement<Props> => {

  const inputText = `> ${input}`;
  return (
    <div className="p-6 border-solid border-t-2 border-zinc-900">
      <p className="font-mono font-bold text-sm text-white pb-2">
        {inputText}
      </p>
      <pre className="font-mono font-bold text-sm text-red-400">
        {value}
      </pre>
    </div>
  );
};

export default TerminalErrorBlock;
