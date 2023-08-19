'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { BaseProps } from '../../types';
import { TerminalInput, TerminalErrorBlock, TerminalExecutedBlock } from '..';
import { useTerminal } from '../../hooks';

/**
 * The `Terminal` component props
 */
interface Props extends BaseProps {
  readonly children: ReactNode;
}

/**
 * Used to render the terminal user interface which
 * consists of the blocks and command input
 *
 * @param props The component props
 * @returns The `Terminal` component
 */
const Terminal: FunctionComponent<Props> = ({ children }): ReactElement<Props> => {
  const { blocks, inputHistory, isLoading, execute } = useTerminal();

  const [inputValue, setInputValue] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  /**
   * Used to handle keyboard events from the `TerminalInput`
   * component underlying `input` HTML element
   *
   * @param key The key pressed
   */
  const onKeyDown = async (key: string): Promise<void> => {
    switch (key) {
      case 'Enter': {

        // If the input is empty, return to
        // avoid executing an empty input
        if (inputValue === '') {
          return;
        }

        // Call the `execute` function with
        // the user input from state
        await execute(inputValue);

        // Reset the input and history index state
        setInputValue('');
        setHistoryIndex(-1);

        break;
      }

      case 'ArrowUp': {
        const index = historyIndex + 1;
        const input = inputHistory[index];

        if (index >= inputHistory.length) {
          return;
        }

        setHistoryIndex(index);
        setInputValue(input);

        break;
      }

      case 'ArrowDown': {
        const index = historyIndex - 1;
        const input = inputHistory[index] ?? '';

        if (index < -1) {
          return;
        }

        setHistoryIndex(index);
        setInputValue(input);

        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="h-full flex flex-col-reverse pb-14 p-2 gap-y-2 overflow-y-auto">
        {
          blocks.map((block) => {
            const { id, type, input } = block;

            // For the error block render the
            // terminal error block component
            if (type === 'error') {
              return (
                <TerminalErrorBlock
                  key={`error-block-${id}`}
                  input={input}
                  error={block.error}
                />
              );
            }

            // For the executed block render the
            // terminal executed block component
            return (
              <TerminalExecutedBlock
                key={`executed-block-${id}`}
                input={input}
                output={block.output}
              />
            );
          })
        }
        {children}
      </div>
      <TerminalInput
        value={inputValue}
        isDisabled={isLoading}
        onChange={setInputValue}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default Terminal;
