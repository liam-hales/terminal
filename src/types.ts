import { ReactElement, Ref } from 'react';

/**
 * The props that all component
 * props should `extends`
 *
 * - Generic type `T` for the `internalRef`
 *
 * The `internalRef` prop is used with the `withRef`
 * helper to forward component references
 *
 * @see [React - Forwarding Refs](https://reactjs.org/docs/forwarding-refs.html)
 */
export interface BaseProps<T extends HTMLElement = HTMLElement> {
  readonly internalRef?: Ref<T>;
  readonly className?: string;
}

/**
 * Like `FunctionComponent from `react` but for `async`
 * server components with a `Promise` return type
 */
export interface AsyncComponent<P extends Partial<Record<keyof P, unknown>> = never> {
  (props: P): Promise<ReactElement<P>> | Promise<ReactElement>;
}

/**
 * Describes the terminal input block used
 * to store terminal input data
 */
export interface TerminalInputBlock {
  readonly type: 'input';
  readonly value: string;
}

/**
 * Describes the terminal output block used
 * to store terminal output data
 */
export interface TerminalOutputBlock {
  readonly type: 'output';
  readonly value: unknown;
}

/**
 * Describes the terminal error block used
 * to store terminal error data
 */
export interface TerminalErrorBlock {
  readonly type: 'error';
  readonly value: string;
}

/**
 * The union type for all
 * terminal block types
 */
export type TerminalBlock =
  | TerminalInputBlock
  | TerminalOutputBlock
  | TerminalErrorBlock;
