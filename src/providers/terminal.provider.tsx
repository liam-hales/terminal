'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { TerminalContext } from '../context';
import { BaseProps, TerminalBlock } from '../types';

/**
 * The `TerminalProvider` component props
 */
interface Props extends BaseProps {
  readonly children: ReactNode;
}

/**
 * Used to provide the `TerminalContext` value which
 * consists of the terminal state and actions
 *
 * @param props The component props
 * @returns The `TerminalProvider` component
 * @example
 *
 * return (
 *   <TerminalProvider>
 *     { ... }
 *   </TerminalProvider>
 * );
 */
const TerminalProvider: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  const [blocks, setBlocks] = useState<TerminalBlock[]>([]);

  return (
    <TerminalContext.Provider value={
      {
        blocks: blocks,
        execute: () => {},
      }
    }
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
