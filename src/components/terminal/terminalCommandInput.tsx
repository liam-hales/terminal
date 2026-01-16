import { FunctionComponent, KeyboardEvent, ReactElement } from 'react';
import { BaseProps } from '../../types';
import { Loader, ProgressBar } from '../common';
import { withRef } from '../../helpers';
import { TerminalLoading } from '../../context/types';

/**
 * The `TerminalCommandInput` component props
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
 * @returns The `TerminalCommandInput` component
 */
const TerminalCommandInput: FunctionComponent<Props> = (props): ReactElement<Props> => {
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
    <div className="w-full flex flex-col items-start bg-background gap-y-4 pb-4 pl-4 pr-4">
      <div className="relative w-full flex flex-col items-start">
        <div className="absolute w-full h-10 flex flex-row items-center border-solid border-[1px] border-primary/20 rounded-sm blur-[0.4px]" />
        <div className="relative w-full h-10 flex flex-row items-center pl-3 pr-3">
          {
            (loading.status !== 'idle') && (
              <Loader className="pr-4" />
            )
          }
          <div className="relative w-full flex flex-col items-start">
            <p className={`
              absolute text-xs whitespace-pre pointer-events-none

              ${(value !== '') ? 'opacity-100' : 'opacity-60'}
            `}
            >
              {
                (value !== '')
                  ? value
                  : '>_ Enter command'
              }
            </p>
            <input
              ref={internalRef}
              className="w-full text-xs bg-transparent text-transparent placeholder-transparent outline-none caret-white"
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
  );
};

export default withRef(TerminalCommandInput);
