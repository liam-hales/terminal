'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { nanoid } from 'nanoid';
import { TerminalContext } from '../context';
import { BaseProps, TerminalBlock } from '../types';
import { parseInput, executeInput } from '../helpers';

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

  /**
   * Used to add a terminal block to
   * the `blocks` state
   *
   * @param block The block to add
   */
  const addBlock = (block: TerminalBlock): void => {
    setBlocks((current) => {
      return [
        block,
        ...current,
      ];
    });
  };

  /**
   * Used to execute a terminal command
   * from a user `input`
   *
   * @param input The user input
   */
  const execute = async (input: string): Promise<void> => {
    const blockId = nanoid(16);

    try {
      const parsed = parseInput(input);
      const output = await executeInput(parsed);

      // Add the terminal executed block
      // for the feature output
      addBlock({
        type: 'executed',
        id: blockId,
        input: input,
        output: output,
      });
    }
    catch (error) {
      if (error instanceof Error) {

        // Add the terminal error block
        // for the caught error
        addBlock({
          type: 'error',
          id: blockId,
          input: input,
          error: error,
        });
      }
    }
  };

  return (
    <TerminalContext.Provider value={
      {
        blocks: blocks,
        inputHistory: blocks.map((block) => block.input),
        execute: execute,
      }
    }
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalProvider;
