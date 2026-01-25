import { FunctionComponent, ReactElement, ReactNode, Suspense } from 'react';
import { TerminalProvider } from '../../providers';
import { Terminal } from '../../components';

/**
 * The `TerminalLayout` component props
 */
interface Props {
  readonly children: ReactNode;
}

/**
 * The terminal layout component used to configure the terminal
 * context provider and render the main `Terminal` component
 *
 * @param props The component props
 * @returns The `TerminalLayout` component
 */
const TerminalLayout: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  return (
    <TerminalProvider>
      {
        /**
         * `<Suspense>` is required here because the `Terminal` component
         * uses the `useSearchParams` hook which requires it
         */
      }
      <Suspense>
        <Terminal>
          {children}
        </Terminal>
      </Suspense>
    </TerminalProvider>
  );
};

export default TerminalLayout;
