import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';
import { Loader } from '../common';

/**
 * The `TerminalInput` component props
 */
interface Props extends BaseProps {
  readonly value: string;
  readonly isLoading?: boolean;
  readonly isDisabled?: boolean;
  readonly onChange: (value: string) => void;
  readonly onKeyDown: (key: string) => void;
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
    value,
    isLoading = false,
    isDisabled = false,
    onChange,
    onKeyDown,
  } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black">
      <div className="flex flex-row items-center pl-6 pr-6">
        {
          (isLoading === true && (
            <Loader className="pr-2" />
          ))
        }
        <input
          className="w-full h-14 text-white placeholder-zinc-700 font-mono text-sm bg-transparent outline-none"
          placeholder=">_ Enter command"
          value={value}
          disabled={isDisabled}
          onKeyDown={(event) => onKeyDown(event.key)}
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

export default TerminalInput;
