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
    <div className="w-full">
      <p className="text-xs pb-3 break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between">
        <p className="text-xs !text-error border-solid border-[1px] border-l-[6px] border-error whitespace-pre-wrap break-all pt-1 pb-1 pl-2 pr-2">
          {`X - ${error.message}`}
        </p>
        <p className="text-xs">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalErrorBlock;
