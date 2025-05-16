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
    <div className="fixed bottom-0 left-0 right-0 bg-black border-solid border-t-[1px] border-zinc-900">
      <div className="flex flex-col pt-4 pb-4 pl-6 pr-6">
        <div className="flex flex-row items-center">
          {
            (loading.status !== 'idle') && (
              <Loader className="pr-4" />
            )
          }
          <input
            ref={internalRef}
            className="w-full h-6 text-white placeholder-zinc-700 font-mono text-sm bg-transparent outline-none"
            placeholder=">_ Enter command"
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
