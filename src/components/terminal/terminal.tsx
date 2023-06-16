'use client';

import { FunctionComponent, ReactElement, ReactNode, useState } from 'react';
import { BaseProps } from '../../types';
import { TerminalInput, TerminalErrorBlock, TerminalOutputBlock } from '..';
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
  const { blocks, execute } = useTerminal();
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div className="h-screen flex flex-col">
      {children}
      <div className="h-full flex flex-col-reverse pb-12">
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

            // For the output block render the
            // terminal output block component
            return (
              <TerminalOutputBlock
                key={`output-block-${id}`}
                input={input}
                output={block.output}
              />
            );
          })
        }
      </div>
      <TerminalInput
        value={inputValue}
        onChange={setInputValue}
        onEnter={() => execute(inputValue)}
      />
    </div>
  );
};

export default Terminal;
