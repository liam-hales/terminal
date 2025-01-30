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
const TerminalValidationErrorBlock: FunctionComponent<Props> = ({ input, duration, details }): ReactElement<Props> => {
  const { matches, messages, suggestion } = details;

  // Turn the `matches` from the details into a regex pattern
  // which will then be used to split the input string
  const pattern = `(${matches.join('|')})`;
  const regex = new RegExp(pattern, 'g');

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
                .split(regex)
                .filter((part) => part !== '')
                .map((part) => {

                  // If the part of the input string is a match
                  // then render the text underlined
                  if (matches.includes(part) === true) {
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
            {
              (suggestion != null) && (
                <span className="text-zinc-700">
                  {' '}
                  {suggestion}
                </span>
              )
            }
          </p>
          <p className="font-mono text-sm text-red-400">
            {`${messages.length} problem${(messages.length > 1) ? 's' : ''} ...`}
          </p>
          <div className="flex flex-col gap-y-2 pt-2 pl-4">
            {
              messages.map((message, index) => {
                const position = input.indexOf(matches[index]) + 1;

                return (
                  <div
                    className="flex flex-row"
                    key={`validation-error-message-${message}`}
                  >
                    <p className="font-mono text-sm text-white">
                      {`[1:${position}]`}
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
