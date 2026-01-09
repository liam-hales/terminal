import './globals.css';

import { FunctionComponent, ReactElement, ReactNode, Suspense } from 'react';
import { BaseProps } from '../types';
import { hp100lx } from '../fonts';
import { RetroScreen, Terminal } from '../components';
import { TerminalProvider } from '../providers';
import { viewport, generateMetadata } from './metadata';
import { Analytics } from '@vercel/analytics/next';

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
      className={`h-full ${hp100lx.className} overscroll-none`}
    >
      <body className="h-full bg-background touch-none">
        <Analytics />
        {
        /**
         * `<Suspense>` is required here because the `Terminal` component
         * uses the `useSearchParams` hook which requires it
         */
        }
        <Suspense>
          <TerminalProvider>
            <RetroScreen>
              <Terminal>
                {children}
              </Terminal>
            </RetroScreen>
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
