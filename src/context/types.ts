import { TerminalBlock, TerminalMode } from '../types';

/**
 * Describes the terminal loading status used for when
 * the terminal is executing a command action
 */
export interface TerminalLoading {
  readonly status: 'idle' | 'loading' | 'long-running';
  readonly percentage: number;
  readonly message?: string;
}

/**
 * Describes the terminal state which consists
 * of the terminal `blocks`
 */
export interface TerminalState {
  readonly mode: TerminalMode;
  readonly inputValue: string;
  readonly blocks: TerminalBlock[];
  readonly inputHistory: string[];
  readonly inputHistoryIndex: number;
  readonly loading: TerminalLoading;
}

/**
 * Describes the terminal actions which consists of the
 * `execute` function used to execute terminal commands
 */
export interface TerminalActions {

  /**
   * Used to set the current mode
   * the terminal is in
   *
   * @param value The mode to switch to
   */
  readonly setMode: (mode: TerminalMode) => void;

  /**
   * Used to set the terminal input
   * value to a given `value`
   *
   * @param value The input value to set
   */
  readonly setInputValue: (value: string) => void;

  /**
   * Used to set the current
   * input history index
   *
   * @param value The input history index to set
   */
  readonly setInputHistoryIndex: (value: number) => void;

  /**
   * Used to execute a terminal command
   * from a user `input`
   *
   * @param input The user input
   */
  readonly execute: (input: string) => Promise<void>;

  /**
   * Used to send text to the
   * terminal when in text mode
   *
   * @param input The user text input
   */
  readonly sendText: (input: string) => void;
}
