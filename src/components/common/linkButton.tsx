import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';
import Link from 'next/link';

/**
 * The `LinkButton` component props
 */
interface Props extends BaseProps {
  readonly url: string;
  readonly children: string;
}

/**
 * Used to render a link button that when
 * actioned, sends the user to a given URL
 *
 * @param props The component props
 * @returns The `LinkButton` component
 */
const LinkButton: FunctionComponent<Props> = ({ url, children }): ReactElement<Props> => {
  return (
    <Link
      className="text-xs border-solid border border-primary shadow-primary/60 shadow-[4px_4px_0px_0px] hover:shadow-[6px_6px_0px_0px] hover:translate-x-0.5 hover:translate-y-0.5 p-2"
      href={url}
      target="_blank"
      passHref={true}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
