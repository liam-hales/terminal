import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalErrorBlock as ErrorBlock } from '../../types';

/**
 * The `TerminalErrorBlock` component props
 */
type Props = Omit<ErrorBlock, 'id' | 'type'> & BaseProps;

/**
 * Used to render the terminal error block
 *
 * @param props The component props
 * @returns The `TerminalErrorBlock` component
 */
const TerminalErrorBlock: FunctionComponent<Props> = ({ input, error }): ReactElement<Props> => {

  const inputText = `> ${input}`;
  return (
    <div className="pt-4 pb-4 pl-6 pr-6 border-solid border-t-2 border-zinc-900">
      <p className="font-mono font-bold text-sm text-zinc-500 pb-3">
        {inputText}
      </p>
      <pre className="font-mono font-bold text-sm text-red-400">
        {error.message}
      </pre>
    </div>
  );
};

export default TerminalErrorBlock;
