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
    <div className="w-full">
      <p className="text-xs pb-3 break-all">
        {`> ${input}`}
      </p>
      <div className="flex flex-row items-end justify-between gap-x-3">
        <div className="w-full pt-2 pb-4 pl-5 pr-5">
          <p className="text-xs whitespace-pre-wrap break-all pb-6">
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
                        className="!text-error border-solid border-[1px] border-l-[6px] border-error pt-1 pb-1 pl-2 pr-2"
                        key={`validation-error-input-${part}`}
                      >
                        {part}
                      </span>
                    );
                  }

                  return (
                    <span key={`validation-error-input-${part}`}>
                      {part}
                    </span>
                  );
                })
            }
          </p>
          <p className="text-xs !text-error">
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
                    <p className="w-24 text-xs">
                      {`[${line}:${position}]`}
                    </p>
                    <p className="w-28 text-xs !text-error">
                      x error
                    </p>
                    <pre className="text-xs !text-error whitespace-pre-wrap break-all">
                      {message}
                    </pre>
                  </div>
                );
              })
            }
          </div>
        </div>
        <p className="text-xs">
          {duration.toFixed(0)}
          <span className="pl-1">ms</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalValidationErrorBlock;
