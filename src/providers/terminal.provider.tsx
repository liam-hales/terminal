'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { TerminalContext } from '../context';
import { BaseProps, FeatureOutput, TerminalBlock } from '../types';
import { executeInput, parseInput } from '../helpers';
import { TerminalLoading } from '../context/types';
import { nanoid } from 'nanoid';
import { ValidationException } from '../exceptions';

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
  const [inputHistoryIndex, setInputHistoryIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<TerminalLoading>({
    status: 'idle',
    percentage: 0,
  });

  /**
   * Used to execute a terminal command
   * from a user `input`
   *
   * @param input The user input
   */
  const _execute = async (input: string): Promise<void> => {
    setLoading({
      ...loading,
      status: 'loading',
    });

    const blockId = nanoid(16);

    // Get the start time stamp which will be used to
    // capture the time it takes to execute the input
    const startTime = performance.now();

    try {
      const parsed = parseInput(input);
      const generator = executeInput(parsed);

      // Loop through and process
      // each generator event
      for await (const event of generator) {

        // Process each type of event and update
        // the terminal state for each
        switch (event.type) {

          case 'clear': {
            const { last } = event;

            // If `last` has been set in the event then remove that
            // number of blocks, otherwise remove them all
            setBlocks((previous) => previous.slice(last ?? previous.length, previous.length));

            break;
          }

          case 'feature': {
            const { featureId, actionEvent } = event;

            // Process each type of action event and
            // update the terminal state for each
            switch (actionEvent.type) {

              case 'progress': {
                const { percentage, message } = actionEvent;

                setLoading({
                  status: 'long-running',
                  percentage: percentage,
                  message: message,
                });

                break;
              }

              case 'update': {
                const { componentProps } = actionEvent;

                // Get the end time stamp which along with the start time
                // can be used to capture the current duration
                const endTime = performance.now();
                const output = {
                  featureId: featureId,
                  componentProps: componentProps,
                } as FeatureOutput;

                setBlocks((previous) => {
                  const found = previous.find((block) => block.id === blockId);

                  // If there has not yet been an executed terminal
                  // block created then add a new one to state
                  if (found == null) {
                    return [
                      {
                        type: 'executed',
                        id: blockId,
                        input: input,
                        duration: endTime - startTime,
                        output: output,
                      },
                      ...previous,
                    ];
                  }

                  // There is an existing terminal block, update
                  // it wth the latest duration and output
                  return previous.map((block) => {
                    return (block.id === blockId && block.type === 'executed')
                      ? {
                          ...block,
                          duration: endTime - startTime,
                          output: output,
                        }
                      : block;
                  });
                });
              }
            }
          }
        }
      }
    }
    catch (error) {

      // Get the end time stamp which along with the start time can be
      // used to capture the time it took for the input execution to fail
      const endTime = performance.now();

      // If the error is a validation exception
      // Add the terminal validation error block
      if (error instanceof ValidationException) {
        const { regex, errors } = error;

        setBlocks((previous) => {
          return [
            {
              type: 'validation-error',
              id: blockId,
              input: input,
              duration: endTime - startTime,
              regex: regex,
              errors: errors,
            },
            ...previous,
          ];
        });

        return;
      }

      // If the error is a generic error
      // Add the terminal error block
      if (error instanceof Error) {
        setBlocks((previous) => {
          return [
            {
              type: 'error',
              id: blockId,
              input: input,
              duration: endTime - startTime,
              error: error,
            },
            ...previous,
          ];
        });

        return;
      }

      throw error;
    }
    finally {
      // Reset the loading state once the
      // terminal block as been added to state
      setLoading({
        status: 'idle',
        percentage: 0,
      });
    }
  };

  return (
    <TerminalContext.Provider value={
      {
        inputValue: inputValue,
        blocks: blocks,
        inputHistory: blocks.map((block) => block.input),
        inputHistoryIndex: inputHistoryIndex,
        loading: loading,
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
