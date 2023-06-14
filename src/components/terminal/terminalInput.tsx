import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';

/**
 * The `TerminalInput` component props
 */
interface Props extends BaseProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onEnter: () => void;
}

/**
 * Used to render the terminal command `input` which
 * allows the user to enter commands to execute
 *
 * @param props The component props
 * @returns The `TerminalInput` component
 */
const TerminalInput: FunctionComponent<Props> = ({ value, onChange, onEnter }): ReactElement<Props> => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-solid border-t-2 border-zinc-900 bg-black">
      <input
        className="w-full h-12 text-white font-mono font-bold text-sm pl-6 pr-6 bg-transparent outline-none"
        value={value}
        onChange={(event) => {

          // Destructure the event and the event target
          // and pass it's value to `onChange`
          const { target } = event;
          const { value } = target;

          onChange(value);
        }}
        onKeyDown={(event) => {

          // If the key pressed was the enter
          // key then call `onEnter`
          if (event.key === 'Enter') {
            onEnter();
          }
        }}
      />
    </div>
  );
};

export default TerminalInput;
