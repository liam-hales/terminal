import { FunctionComponent, ReactElement, Ref } from 'react';
import { ZodSchema, z } from 'zod';
import { Feature } from './features';

/**
 * The feature ID used to differentiate
 * each individual feature
 */
export type FeatureId = 'help';

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
 *
 * - Generic type `T` for the props
 */
export interface AsyncComponent<T extends object = never> {
  (props: T): Promise<ReactElement<T>> | Promise<ReactElement>;
}

/**
 * Used to describe a feature that can
 * be used within the terminal
 *
 * - Generic type `F` for the feature ID
 * - Generic type `S` for the command schema
 * - Generic type `P` for the component props
 */
export interface IFeature<
  F extends FeatureId,
  S extends ZodSchema,
  P extends object,
> {
  readonly id: F;
  readonly command: ICommand<S, P>;
  readonly component: FunctionComponent<P>;
  readonly enabled: boolean;
}

/**
 * Used to describe a feature command which
 * can be executed in the terminal
 *
 * - Generic type `S` for the schema
 * - Generic type `P` for the component props
 */
export interface ICommand<
  S extends ZodSchema,
  P extends object,
> {
  readonly name: string;
  readonly description: string;
  readonly options: CommandOptions<S>;
  readonly action: (options: z.infer<S>) => P | undefined;
}

/**
 * Used to describe the command options which consists of the `schema`
 * used for validation and a `config` for each option
 *
 * - Generic type `T` for the schema
 */
export interface CommandOptions<T extends ZodSchema> {
  readonly schema: T;
  readonly config: Record<keyof z.infer<T>, CommandOptionConfig>;
}

/**
 * Used to describe the config
 * for a command option
 */
export interface CommandOptionConfig {
  readonly description: string;
}

/**
 * The utility type used to extract the
 * type for a specific feature
 *
 * - Generic type `T` for the feature ID
 */
export type ExtractFeature<T extends FeatureId> =
  Extract<
    Feature,
    {
      readonly id: T;
    }
  >;

/**
 * The utility type used to extract the feature `component`
 * props type for a specific feature
 *
 * - Generic type `T` for the feature ID
 */
export type ExtractProps<T extends FeatureId> =
  ReturnType<
    ExtractFeature<T>['command']['action']
  >;

/**
 * Used to build the feature output
 * type for all features
 *
 * - Generic type `T` for the feature union type
 */
export type FeatureOutput<T extends Feature> =
  T extends Feature
    ? {
        readonly featureId: T['id'];
        readonly props: ExtractProps<T['id']>;
      }
    : never;

/**
 * The command type used to describe
 * all feature commands
 */
export type Command = Feature['command'];

/**
 * Describes the parsed input which consists of
 * the `command` and the `options`
 */
export interface ParsedInput {
  readonly command?: string;
  readonly options?: Record<string, unknown>;
}

/**
 * Describes the terminal executed block used
 * to store data for an executed command
 */
export interface TerminalExecutedBlock {
  readonly type: 'executed';
  readonly id: string;
  readonly input: string;
  readonly output: FeatureOutput<Feature>;
}

/**
 * Describes the terminal error block used
 * to store data for an input error
 */
export interface TerminalErrorBlock {
  readonly type: 'error';
  readonly id: string;
  readonly input: string;
  readonly error: Error;
}

/**
 * The union type for all
 * terminal block types
 */
export type TerminalBlock = TerminalExecutedBlock | TerminalErrorBlock;
