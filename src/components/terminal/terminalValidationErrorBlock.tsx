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
const TerminalValidationErrorBlock: FunctionComponent<Props> = ({ input, duration, errors }): ReactElement<Props> => {
  return (
    <div className="pt-4 pb-4 pl-6 pr-4 border-solid border-t-[1px] border-zinc-900">
      <p className="font-mono text-sm text-zinc-500 pb-3 break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between pt-2">
        <div className="w-full flex flex-col pr-6 gap-y-4">
          {
            errors.map((error) => {
              const { name, match, details, suggestion } = error;

              // Turn the `match` from the error into a regex pattern qhich will then be used to split the input string
              const pattern = `(${(Array.isArray(match) === true) ? match.join('|') : match})`;
              const regex = new RegExp(pattern, 'g');

              return (
                <div
                  className="flex flex-col"
                  key={`validation-error-${pattern}`}
                >
                  <div className="pt-4 pb-4 pl-5 pr-5 rounded-lg bg-zinc-900 bg-opacity-45">
                    <p className="font-mono text-sm text-zinc-500">
                      {name}
                    </p>
                    <p className="whitespace-pre-wrap break-all pt-2 pb-4">
                      {
                        input
                          .split(regex)
                          .map((part) => {

                            const isMatch = (Array.isArray(match) === true)
                              ? match.includes(part)
                              : match === part;

                            // If the part of the input string is a match
                            // then render the text underlined
                            if (isMatch === true) {
                              return (
                                <span
                                  className="font-mono font-bold text-sm text-white underline underline-offset-4 decoration-2 decoration-wavy decoration-red-400"
                                  key={`validation-error-${pattern}-input-${part}`}
                                >
                                  {part}
                                </span>
                              );
                            }

                            return (
                              <span
                                className="font-mono font-bold text-sm text-white"
                                key={`validation-error-${pattern}-input-${part}`}
                              >
                                {part}
                              </span>
                            );
                          })
                      }
                      {
                        (suggestion != null) && (
                          <span className="font-mono font-bold text-sm text-zinc-700">
                            {' '}
                            {suggestion}
                          </span>
                        )
                      }
                    </p>
                    {
                      (typeof details === 'string') && (
                        <pre className="font-mono text-sm text-red-400 pl-4 whitespace-pre-wrap break-all">
                          {details}
                        </pre>
                      )
                    }
                    {
                      (Array.isArray(details) === true) && (
                        <div className="flex flex-col pl-4">
                          {
                            details.map((detail) => {
                              return (
                                <pre
                                  className="font-mono text-sm text-red-400 whitespace-pre-wrap break-all"
                                  key={`validation-error-${pattern}-detail-${detail}`}
                                >
                                  {detail}
                                </pre>
                              );
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
              );
            })
          }
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
