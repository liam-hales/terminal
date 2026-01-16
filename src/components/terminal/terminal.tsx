'use client';

import { FunctionComponent, KeyboardEvent, ReactElement, ReactNode, useEffect, useRef, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { BaseProps } from '../../types';
import {
  TerminalCommandInput,
  TerminalExecutedBlock,
  TerminalTextBlock,
  TerminalValidationErrorBlock,
  TerminalErrorBlock,
  TerminalTextInput,
} from '..';
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
    mode,
    inputValue,
    blocks,
    inputHistory,
    inputHistoryIndex,
    loading,
    setMode,
    setInputValue,
    setInputHistoryIndex,
    execute,
    sendText,
  } = useTerminal();

  /**
   * Used to monitor the terminal `inputValue`
   * and set the `?input=` URL query param
   */
  useEffect(() => {
    const { history } = window;

    // The `?input=` URL query param should only be set when the terminal is in command mode
    // However let the query param be removed if the input value is empty
    if (mode === 'text' && inputValue !== '') {
      return;
    }

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
  }, [inputValue, mode]);

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
   * Used to focus the `TerminalCommandInput` when the
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
   * Used to handle keyboard events from the `TerminalCommandInput`
   * component underlying `input` HTML element
   *
   * @param event The keyboard event
   */
  const _onCommandInputKeyDown = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    const { key } = event;

    switch (key) {
      case 'Enter': {

        // If the input is empty, break to
        // avoid executing an empty input
        if (inputValue === '') {
          break;
        }

        // If the terminal is loading then break to avoid
        // executing the same command multiple times
        if (loading.status !== 'idle') {
          break;
        }

        // Call the `execute` function with
        // the user input from state
        await execute(inputValue);

        setInputValue('');
        setInputHistoryIndex(-1);

        event.preventDefault();

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

  /**
   * Used to handle keyboard events from the `TerminalTextInput`
   * component underlying `textarea` HTML element
   *
   * @param event The keyboard event
   */
  const _onTextInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key, shiftKey } = event;

    switch (key) {
      case 'Enter': {

        // If the user is holding shift
        // then continue as normal
        if (shiftKey === true) {
          break;
        }

        // If the input value is not empty, send the text
        // input to the terminal and reset the input state
        if (inputValue !== '') {
          sendText(inputValue);
          setInputValue('');
        }

        event.preventDefault();

        break;
      }

      case 'Escape': {

        // Set the terminal mode state back to `command` to exit
        // text mode and reset the input value state
        setMode('command');
        setInputValue('');

        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <Fragment>
      <div className="w-full h-full flex flex-col-reverse items-start gap-y-10 pb-6 pl-6 pr-6 overflow-y-auto no-scrollbar touch-pan-y">
        {
          blocks.map((block) => {

            switch (block.type) {
              case 'executed': {
                const { id, input, duration, output } = block;

                return (
                  <TerminalExecutedBlock
                    key={`executed-block-${id}`}
                    input={input}
                    duration={duration}
                    output={output}
                  />
                );
              }

              case 'text': {
                const { id, value } = block;

                return (
                  <TerminalTextBlock
                    key={`text-block-${id}`}
                    value={value}
                  />
                );
              }

              case 'validation-error': {
                const { id, input, duration, regex, errors } = block;

                return (
                  <TerminalValidationErrorBlock
                    key={`validation-error-block-${id}`}
                    input={input}
                    duration={duration}
                    regex={regex}
                    errors={errors}
                  />
                );
              }

              case 'error': {
                const { id, input, duration, error } = block;

                return (
                  <TerminalErrorBlock
                    key={`error-block-${id}`}
                    input={input}
                    duration={duration}
                    error={error}
                  />
                );
              }
            }
          })
        }
        {children}
      </div>
      {
        (mode === 'command') && (
          <TerminalCommandInput
            ref={inputRef}
            value={inputValue}
            loading={loading}
            isDisabled={loading.status !== 'idle'}
            onChange={setInputValue}
            onKeyDown={_onCommandInputKeyDown}
          />
        )
      }
      {
        (mode === 'text') && (
          <TerminalTextInput
            ref={inputRef}
            value={inputValue}
            onChange={setInputValue}
            onKeyDown={_onTextInputKeyDown}
          />
        )
      }
    </Fragment>
  );
};

export default Terminal;
