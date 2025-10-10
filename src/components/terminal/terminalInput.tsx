import { FunctionComponent, KeyboardEvent, ReactElement } from 'react';
import { BaseProps } from '../../types';
import { Loader, ProgressBar } from '../common';
import { withRef } from '../../helpers';
import { TerminalLoading } from '../../context/types';

/**
 * The `TerminalInput` component props
 */
interface Props extends BaseProps<HTMLInputElement> {
  readonly value: string;
  readonly loading?: TerminalLoading;
  readonly isDisabled?: boolean;
  readonly onChange: (value: string) => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Used to render the terminal command `input` which
 * allows the user to enter commands to execute
 *
 * @param props The component props
 * @returns The `TerminalInput` component
 */
const TerminalInput: FunctionComponent<Props> = (props): ReactElement<Props> => {
  const {
    internalRef,
    value,
    loading = {
      status: 'idle',
      progress: 0,
    },
    isDisabled = false,
    onChange,
    onKeyDown,
  } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d0803]">
      <div className="flex flex-col pt-4 pb-6 pl-6 pr-6">
        <div className="flex flex-row items-center">
          {
            (loading.status !== 'idle') && (
              <Loader className="pr-4" />
            )
          }
          <div className="relative w-full flex flex-col items-start">
            <p className="absolute text-sm white whitespace-pre pointer-events-none">
              {
                (value !== '')
                  ? value
                  : '>_ Enter command'
              }
            </p>
            <input
              ref={internalRef}
              className="w-full relative text-sm bg-transparent text-transparent placeholder-transparent outline-none caret-white"
              value={value}
              disabled={isDisabled}
              onKeyDown={(event) => onKeyDown(event)}
              onChange={(event) => {

                // Destructure the event and the event target
                // and pass its value to `onChange`
                const { target } = event;
                const { value } = target;

                onChange(value);
              }}
            />
          </div>
        </div>
        {
          (loading.status === 'long-running') && (
            <ProgressBar
              percentage={loading.percentage}
              message={loading.message}
            />
          )
        }
      </div>
    </div>
  );
};

export default withRef(TerminalInput);
