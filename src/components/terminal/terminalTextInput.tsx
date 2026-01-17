import { FunctionComponent, KeyboardEvent, ReactElement } from 'react';
import { BaseProps } from '../../types';
import { CodeInline } from '../common';
import { withRef } from '../../helpers';
import TextArea from 'react-textarea-autosize';

/**
 * The `TerminalTextInput` component props
 */
interface Props extends BaseProps<HTMLTextAreaElement> {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * Used to render the terminal text input which allows the
 * user to enter text when the terminal is in text mode
 *
 * @param props The component props
 * @returns The `TerminalTextInput` component
 */
const TerminalTextInput: FunctionComponent<Props> = ({ internalRef, value, onChange, onKeyDown }): ReactElement<Props> => {
  return (
    <div className="w-full flex flex-col items-start bg-background gap-y-3 pb-4 pl-4 pr-4">
      <TextArea
        ref={internalRef}
        className="w-full min-h-16 text-retro text-xs outline-none caret-white resize-none border-solid border-[1px] border-primary/20 rounded-sm p-3"
        value={value}
        onKeyDown={(event) => onKeyDown(event)}
        onChange={(event) => {

          // Destructure the event and the event target
          // and pass its value to `onChange`
          const { target } = event;
          const { value } = target;

          onChange(value);
        }}
      />
      <p className="text-[10px]">
        You are in text mode, use
        <CodeInline className="ml-2 mr-2">
          Esc
        </CodeInline>
        to exit
      </p>
    </div>
  );
};

export default withRef(TerminalTextInput);
