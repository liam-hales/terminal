import './globals.css';

import { FunctionComponent, ReactElement, ReactNode } from 'react';
import { BaseProps } from '../types';
import { urbanist, firaCode } from '../fonts';
import { Terminal } from '../components';
import { TerminalProvider } from '../providers';

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
const AppLayout: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  return (
    <html
      lang="en"
      className={`h-full ${urbanist.variable} ${firaCode.variable}`}
    >
      <body className="h-full bg-black">
        <TerminalProvider>
          <Terminal>
            <div className="flex flex-col items-center pt-16 pb-16 pl-4 pr-4 border-solid border-b-[1px] border-zinc-900">
              {children}
            </div>
          </Terminal>
        </TerminalProvider>
      </body>
    </html>
  );
};

export default AppLayout;
