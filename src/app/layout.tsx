import './globals.css';

import { FunctionComponent, ReactElement, ReactNode } from 'react';
import { BaseProps } from '../types';
import { hp100lx } from '../fonts';
import { RetroScreen } from '../components';
import { viewport, generateMetadata } from './metadata';

/**
 * The `AppLayout` component props
 */
interface Props extends BaseProps {
  readonly children: ReactNode;
}

/**
 * The app layout component used as the entry
 * point for the entire app across all routes
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
        <RetroScreen>
          {children}
        </RetroScreen>
      </body>
    </html>
  );
};

export default AppLayout;
export {
  viewport,
  generateMetadata,
};
