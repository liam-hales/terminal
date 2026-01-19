import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';
import TextArea from 'react-textarea-autosize';

/**
 * The `TextOutput` component props
 */
interface Props extends BaseProps {
  readonly value: string;
  readonly showBorder?: boolean;
}

/**
 * Used to render a simple text output
 * for features which just output a text value
 *
 * @param props The component props
 * @returns The `TextOutput` component
 */
const TextOutput: FunctionComponent<Props> = ({ value, showBorder = false }): ReactElement<Props> => {
  return (
    <>
      {(showBorder === true) && (
        <TextArea
          className="w-full text-retro text-xs outline-none caret-white resize-none border-solid border-[1px] border-primary/20 rounded-sm p-3"
          value={value}
          disabled={true}
        />
      )}
      {
        (showBorder === false) && (
          <pre className="text-xs">
            {value}
          </pre>
        )
      }
    </>
  );
};

export default TextOutput;
