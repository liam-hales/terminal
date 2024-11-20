'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { TerminalContext } from '../context';
import { BaseProps, TerminalBlock } from '../types';
import { execute } from '../helpers';

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
  const [inputValue, setInputValue] = useState<string>('');
  const [blocks, setBlocks] = useState<TerminalBlock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputHistoryIndex, setInputHistoryIndex] = useState<number>(-1);

  /**
   * Used to execute a terminal command
   * from a user `input`
   *
   * @param input The user input
   */
  const _execute = async (input: string): Promise<void> => {
    setIsLoading(true);

    // Executes the input on the server and
    // receives the terminal block
    const block = await execute(input);

    // All errors are handled in the `execute` function
    // The terminal block can be added to state
    setBlocks((current) => {
      return [
        block,
        ...current,
      ];
    });

    // Resets the loading state once the terminal
    // block as been added to state
    setIsLoading(false);
  };

  return (
    <TerminalContext.Provider value={
      {
        inputValue: inputValue,
        blocks: blocks,
        inputHistory: blocks.map((block) => block.input),
        inputHistoryIndex: inputHistoryIndex,
        isLoading: isLoading,
        setInputValue: setInputValue,
        setInputHistoryIndex: setInputHistoryIndex,
        execute: _execute,
      }
    }
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
