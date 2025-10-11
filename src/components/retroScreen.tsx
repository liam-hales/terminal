import { Fragment, FunctionComponent, ReactElement, ReactNode } from 'react';
import { BaseProps } from '../types';

/**
 * The `RetroScreen` component props
 */
interface Props extends BaseProps {
  readonly children: ReactNode;
}

/**
 * Used to render the retro 80's style screen effect
 * which consists of the following effects...
 *
 * - Animated screen noise background
 * - Animated screen scanner
 * - Text bloom
 * - Text blur
 *
 * @param props The component props
 * @returns The `RetroScreen` component
 */
const RetroScreen: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  return (
    <Fragment>
      <div className={`
        w-full h-full flex flex-col items-center bg-background

        [&_p]:text-retro
        [&_pre]:text-retro
       `}
      >
        {children}
      </div>
      <div className="fixed left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white/5 blur-[1px] animate-scanner z-10 pointer-events-none" />
      <div className="fixed -inset-[200%] bg-[url('/noise.png')] animate-shift opacity-10 z-20 pointer-events-none" />
    </Fragment>
  );
};

export default RetroScreen;
