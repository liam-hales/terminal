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
const TerminalErrorBlock: FunctionComponent<Props> = ({ input, duration, error }): ReactElement<Props> => {
  return (
    <div className="pt-4 pb-4 pl-6 pr-4 bg-red-950/40">
      <p className="font-mono text-sm text-zinc-500 pb-3 break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between">
        <pre className="font-mono font-bold text-sm text-red-400 whitespace-pre-wrap break-all">
          {error.message}
        </pre>
        <p className="font-mono text-xs text-zinc-500">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalErrorBlock;
