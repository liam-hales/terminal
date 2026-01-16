import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, TerminalTextBlock as TextBlock } from '../../types';

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
      <pre className="text-xs">
        {value}
      </pre>
    </div>
  );
};

export default TerminalTextBlock;
