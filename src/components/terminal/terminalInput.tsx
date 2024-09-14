import { FunctionComponent, KeyboardEvent, ReactElement } from 'react';
import { BaseProps } from '../../types';
import { Loader } from '../common';
import { withRef } from '../../helpers';

/**
 * The `TerminalInput` component props
 */
interface Props extends BaseProps<HTMLInputElement> {
  readonly value: string;
  readonly isLoading?: boolean;
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
    isLoading = false,
    isDisabled = false,
    onChange,
    onKeyDown,
  } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-solid border-t-[1px] border-zinc-900">
      <div className="flex flex-row items-center pl-6 pr-6">
        {
          (isLoading === true) && (
            <Loader className="pr-2" />
          )
        }
        <input
          ref={internalRef}
          className="w-full h-14 text-white placeholder-zinc-700 font-mono text-sm bg-transparent outline-none"
          placeholder=">_ Enter command"
          value={value}
          disabled={isDisabled}
          onKeyDown={(event) => onKeyDown(event)}
          onChange={(event) => {

            // Destructure the event and the event target
            // and pass it's value to `onChange`
            const { target } = event;
            const { value } = target;

            onChange(value);
          }}
        />
      </div>
    </div>
  );
};

export default withRef(TerminalInput);
