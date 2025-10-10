import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';

/**
 * The `CodeInline` component props
 */
interface Props extends BaseProps {
  readonly children: string | string[];
}

/**
 * Used to render inline code
 *
 * @param props The component props
 * @returns The `CodeInline` component
 */
const CodeInline: FunctionComponent<Props> = ({ className, children }): ReactElement<Props> => {
  return (
    <span className={`${className ?? ''} border-solid border-[1px] border-l-[4px] border-orange-400 pt-1 pb-1 pl-2 pr-2`}>
      {children}
    </span>
  );
};

export default CodeInline;
