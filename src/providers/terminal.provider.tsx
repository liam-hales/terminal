'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { TerminalContext } from '../context';
import { BaseProps, TerminalBlock } from '../types';
import { execute } from '../helpers';
import { TerminalLoadingStatus } from '../context/types';

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
  const [loadingStatus, setLoadingStatus] = useState<TerminalLoadingStatus>('idle');
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);
  const [inputHistoryIndex, setInputHistoryIndex] = useState<number>(-1);

  /**
   * Used to update the terminal loading status and
   * percentage state when called by the action
   *
   * @param percentage The progress percentage
   */
  const onProgress = (percentage: number): void => {
    setLoadingStatus('long-running');
    setLoadingPercentage(percentage);
  };

  /**
   * Used to execute a terminal command
   * from a user `input`
   *
   * @param input The user input
   */
  const _execute = async (input: string): Promise<void> => {
    setLoadingStatus('loading');

    // Executes the input and
    // receives the terminal block
    const block = await execute(input, onProgress);

    // All errors are handled in the `execute` function
    // The terminal block can be added to state
    setBlocks((current) => {
      return [
        block,
        ...current,
      ];
    });

    // Resets the loading state and loading percentage
    // once the terminal block as been added to state
    setLoadingStatus('idle');
    setLoadingPercentage(0);
  };

  return (
    <TerminalContext.Provider value={
      {
        inputValue: inputValue,
        blocks: blocks,
        inputHistory: blocks.map((block) => block.input),
        inputHistoryIndex: inputHistoryIndex,
        loadingStatus: loadingStatus,
        loadingPercentage: loadingPercentage,
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
