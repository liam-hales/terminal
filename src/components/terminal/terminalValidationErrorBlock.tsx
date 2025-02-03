import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalValidationErrorBlock as ValidationErrorBlock } from '../../types';

/**
 * The `TerminalValidationErrorBlock` component props
 */
type Props = Omit<ValidationErrorBlock, 'id' | 'type'> & BaseProps;

/**
 * Used to render the terminal
 * validation error block
 *
 * @param props The component props
 * @returns The `TerminalValidationErrorBlock` component
 */
const TerminalValidationErrorBlock: FunctionComponent<Props> = ({ input, duration, regex, errors }): ReactElement<Props> => {
  return (
    <div className="pt-4 pb-4 pl-6 pr-4 border-solid border-t-[1px] border-zinc-900">
      <p className="font-mono text-sm text-zinc-500 pb-3 break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between">
        <div className="w-full pt-2 pb-4 pl-5 pr-5">
          <p className="font-mono font-bold text-sm whitespace-pre-wrap break-all pb-6">
            {
              input
                // Split the input string at the spaces while
                // grouping command options and their values
                .split(/("[^"]*"|--\S+="[^"]*"|--\S+=\S+|--\S+\s\S+|--\S+|\S+)/g)
                .filter((part) => part !== '')
                .map((part) => {

                  const isMatch = regex.test(part);

                  // If the part of the input string is a match
                  // then render the text underlined
                  if (isMatch === true) {
                    return (
                      <span
                        className="text-white underline underline-offset-4 decoration-2 decoration-wavy decoration-red-400"
                        key={`validation-error-input-${part}`}
                      >
                        {part}
                      </span>
                    );
                  }

                  return (
                    <span
                      className="text-white"
                      key={`validation-error-input-${part}`}
                    >
                      {part}
                    </span>
                  );
                })
            }
          </p>
          <p className="font-mono text-sm text-red-400">
            {`${errors.length} problem${(errors.length > 1) ? 's' : ''} ...`}
          </p>
          <div className="flex flex-col gap-y-2 pt-2 pl-4">
            {
              errors.map((error) => {
                const { message, line, position } = error;
                return (
                  <div
                    className="flex flex-row"
                    key={`validation-error-message-${message}`}
                  >
                    <p className="font-mono text-sm text-white">
                      {`[${line}:${position}]`}
                    </p>
                    <p className={`font-mono text-sm text-red-400 pl-${(position >= 10) ? '4' : '6'} pr-5`}>
                      error
                    </p>
                    <pre className="font-mono text-sm text-red-400 whitespace-pre-wrap break-all">
                      {message}
                    </pre>
                  </div>
                );
              })
            }
          </div>
        </div>
        <p className="font-mono text-xs text-zinc-500">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalValidationErrorBlock;
