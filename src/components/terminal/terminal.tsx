'use client';

import { FunctionComponent, KeyboardEvent, ReactElement, ReactNode, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { BaseProps } from '../../types';
import { TerminalInput, TerminalValidationErrorBlock, TerminalErrorBlock, TerminalExecutedBlock } from '..';
import { useTerminal } from '../../hooks';
import { decodeParam } from '../../helpers';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const {
    inputValue,
    blocks,
    inputHistory,
    inputHistoryIndex,
    loading,
    setInputValue,
    setInputHistoryIndex,
    execute,
  } = useTerminal();

  /**
   * Used to monitor the terminal `inputValue`
   * and set the `input` URL query param
   */
  useEffect(() => {
    const { history } = window;

    // Build the URL query based on
    // the terminal input value
    const urlQuery = (inputValue !== '')
      ? `?input=${
        Buffer
          .from(inputValue, 'utf8')
          .toString('base64')
      }`
      : '/';

    history.pushState({}, '', urlQuery);
  }, [inputValue]);

  /**
   * Used to monitor the
   * `input` URL search param
   */
  useEffect(() => {

    // Get and decode the input
    // search param from the URL
    const inputParam = decodeParam(searchParams.get('input') ?? '');

    // If the `input` param has been set, set
    // the terminal input value to it's value
    if (inputParam != null) {
      setInputValue(inputParam);
    }
  }, [
    searchParams,
    setInputValue,
  ]);

  /**
   * Used to focus the `TerminalInput` when the
   * `inputValue` state changes to an empty string
   */
  useEffect(() => {

    // Only focus the input if the input
    // value state is an empty string
    if (inputValue === '') {
      inputRef.current?.focus();
    }
  }, [inputValue]);

  /**
   * Used to handle keyboard events from the `TerminalInput`
   * component underlying `input` HTML element
   *
   * @param event The keyboard event
   */
  const _onKeyDown = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    const { key } = event;

    switch (key) {
      case 'Enter': {

        // If the input is empty, return to
        // avoid executing an empty input
        if (inputValue === '') {
          return;
        }

        // If the terminal is loading then return to avoid
        // executing the same command multiple times
        if (loading.status !== 'idle') {
          return;
        }

        // Call the `execute` function with
        // the user input from state
        await execute(inputValue);

        setInputValue('');
        setInputHistoryIndex(-1);

        break;
      }

      case 'ArrowUp': {
        // Prevent the default input behavior to
        // prevent incorrect cursor position
        event.preventDefault();

        const index = inputHistoryIndex + 1;
        const input = inputHistory[index];

        if (index >= inputHistory.length) {
          return;
        }

        setInputHistoryIndex(index);
        setInputValue(input);

        break;
      }

      case 'ArrowDown': {
        const index = inputHistoryIndex - 1;
        const input = inputHistory[index] ?? '';

        if (index < -1) {
          return;
        }

        setInputHistoryIndex(index);
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
      <div className="h-full flex flex-col-reverse pb-18 overflow-y-auto no-scrollbar">
        {
          blocks.map((block) => {
            const { id, type, input, duration } = block;

            // For the validation error block render the
            // terminal validation error block component
            if (type === 'validation-error') {
              return (
                <TerminalValidationErrorBlock
                  key={`validation-error-block-${id}`}
                  input={input}
                  duration={duration}
                  regex={block.regex}
                  errors={block.errors}
                />
              );
            }

            // For the error block render the
            // terminal error block component
            if (type === 'error') {
              return (
                <TerminalErrorBlock
                  key={`error-block-${id}`}
                  input={input}
                  duration={duration}
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
                duration={duration}
                output={block.output}
              />
            );
          })
        }
        {children}
      </div>
      <TerminalInput
        ref={inputRef}
        value={inputValue}
        loading={loading}
        isDisabled={loading.status !== 'idle'}
        onChange={setInputValue}
        onKeyDown={_onKeyDown}
      />
    </>
  );
};

export default Terminal;
