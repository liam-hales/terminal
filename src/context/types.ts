import { TerminalBlock } from '../types';

/**
 * Describes the terminal state which consists
 * of the terminal `blocks`
 */
export interface TerminalState {
  readonly blocks: TerminalBlock[];
  readonly inputHistory: string[];
  readonly isLoading: boolean;
}

/**
 * Describes the terminal actions which consists of the
 * `execute` function used to execute terminal commands
 */
export interface TerminalActions {
  /**
   * Used to execute a terminal command
   * from a user `input`
   *
   * @param input The user input
   */
  readonly execute: (input: string) => Promise<void>;
}
