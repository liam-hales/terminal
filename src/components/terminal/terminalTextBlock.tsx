import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalTextBlock as TextBlock } from '../../types';
import TextArea from 'react-textarea-autosize';

/**
 * The `TerminalTextBlock` component props
 */
type Props = Omit<TextBlock, 'id' | 'type'> & BaseProps;

/**
 * Used to render the terminal text block
 *
 * @param props The component props
 * @returns The `TerminalTextBlock` component
 */
const TerminalTextBlock: FunctionComponent<Props> = ({ value }): ReactElement<Props> => {
  return (
    <div className="w-full flex flex-col gap-y-3">
      <p className="text-xs break-all">
        {`> text`}
      </p>
      <div className="relative w-full flex flex-col items-start">
        <TextArea
          className="w-full text-retro text-xs outline-none caret-white resize-none border-solid border-[1px] border-primary/20 rounded-sm p-3"
          value={value}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default TerminalTextBlock;
