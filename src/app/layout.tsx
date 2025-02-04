import './globals.css';

import { FunctionComponent, ReactElement, ReactNode, Suspense } from 'react';
import { BaseProps } from '../types';
import { urbanist, firaCode } from '../fonts';
import { Terminal } from '../components';
import { TerminalProvider } from '../providers';
import { viewport, generateMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/react';

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
        <Analytics />
        {
        /**
         * `<Suspense>` is required here because the `Terminal` component
         * uses the `useSearchParams` hook which requires it
         */
        }
        <Suspense>
          <TerminalProvider>
            <Terminal>
              <div className="flex flex-col items-center pt-28 pb-28 pl-6 pr-6">
                {children}
              </div>
            </Terminal>
          </TerminalProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default AppLayout;
export {
  viewport,
  generateMetadata,
};
