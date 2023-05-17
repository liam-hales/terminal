import './globals.css';

import { ReactElement, ReactNode } from 'react';
import { BaseProps, ServerComponent } from '../types';
import { urbanist, firaCode } from '../fonts';

/**
 * The `AppLayout` component props
 */
interface Props extends BaseProps {
  readonly children: ReactNode;
}

/**
 * The root layout component used as the
 * entry point to render the app
 *
 * @param props The component props
 * @returns The `AppLayout` component
 */
const AppLayout: ServerComponent<Props> = async ({ children }): Promise<ReactElement<Props>> => {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${firaCode.variable}`}
    >
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
};

export default AppLayout;