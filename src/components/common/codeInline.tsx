import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';

/**
 * The `CodeInline` component props
 */
interface Props extends BaseProps {
  readonly children: string;
}

/**
 * Used to render inline code
 *
 * @param props The component props
 * @returns The `CodeInline` component
 */
const CodeInline: FunctionComponent<Props> = ({ className, children }): ReactElement<Props> => {
  return (
    <p className={`${className} inline font-mono font-bold text-xs text-white bg-zinc-900 pt-1 pb-1 pl-2 pr-2 rounded-md`}>
      {children}
    </p>
  );
};

export default CodeInline;
