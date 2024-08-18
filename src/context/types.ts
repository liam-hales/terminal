import { TerminalBlock } from '../types';

/**
 * Describes the terminal state which consists
 * of the terminal `blocks`
 */
export interface TerminalState {
  readonly inputValue: string;
  readonly blocks: TerminalBlock[];
  readonly inputHistory: string[];
  readonly inputHistoryIndex: number;
  readonly isLoading: boolean;
}

/**
 * Describes the terminal actions which consists of the
 * `execute` function used to execute terminal commands
 */
export interface TerminalActions {
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
}
