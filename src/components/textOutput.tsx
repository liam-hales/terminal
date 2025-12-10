import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';

/**
 * The `TextOutput` component props
 */
interface Props extends BaseProps {
  readonly value: string;
}

/**
 * Used to render a simple text output
 * for features which just output a text value
 *
 * @param props The component props
 * @returns The `TextOutput` component
 */
const TextOutput: FunctionComponent<Props> = ({ value }): ReactElement<Props> => {
  return (
    <p className="text-xs">
      {value}
    </p>
  );
};

export default TextOutput;
