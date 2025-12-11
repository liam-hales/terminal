import { ComponentProps, FunctionComponent, Ref } from 'react';
import { ZodObject, z } from 'zod';
import { Feature, FeatureMap } from './features';

/**
 * The feature ID used to differentiate
 * each individual feature
 */
export type FeatureId =
  | 'help'
  | 'encode'
  | 'ip'
  | 'jwt'
  | 'whois'
  | 'datetime'
  | 'key-pair'
  | 'pass-gen'
  | 'uuid'
  | 'mac-lookup'
  | 'file-upload';

/**
 * The union type for all
 * terminal block types
 */
export type TerminalBlock = TerminalExecutedBlock | TerminalValidationErrorBlock | TerminalErrorBlock;

/**
 * The union type for all server
 * action response types
 *
 * - Generic type `T` for the data
 */
export type ServerActionResponse<T> = ServerActionSuccessResponse<T> | ServerActionErrorResponse;

/**
 * The union type for all
 * action event types
 *
 * - Generic type `T` for the props
 */
export type ActionEvent<P extends object> = ActionProgressEvent | ActionUpdateEvent<P>;

/*
 * The utility type used to convert a type
 * into an intersection type
 *
 * - Generic type `T` for the type to convert
 */
type Intersect<T> = (T extends T ? (k: T) => void : never) extends ((k: infer I) => void) ? I : never;

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
 * Used to describe a feature that can
 * be used within the terminal
 *
 * - Generic type `F` for the feature ID
 * - Generic type `O` for the command options
 * - Generic type `P` for the component props
 */
export interface IFeature<
  F extends FeatureId,
  O extends ZodObject,
  P extends object,
> {
  readonly id: F;
  readonly command: ICommand<O, P>;
  readonly component: FunctionComponent<P>;
  readonly isEnabled: boolean;
}

/**
 * Used to describe a feature command which
 * can be executed in the terminal
 *
 * - Generic type `O` for the options
 * - Generic type `P` for the component props
 */
export interface ICommand<
  O extends ZodObject,
  P extends object,
> {
  readonly name: string;
  readonly description: string;
  readonly options: O;
  readonly execution: 'server' | 'client';
  readonly action: (options: z.infer<O>) => P | Promise<P> | AsyncGenerator<ActionEvent<P>>;
}

/**
 * The type used to describe
 * all feature commands
 */
export type Command = Feature['command'];

/**
 * The intersection type used to describe
 * all feature command options
 *
 * _Used for type casting only as TypeScript does not support correlated unions_
 *
 * [TypeScript Issue](https://github.com/microsoft/TypeScript/issues/30581)
 */
export type CommandOption = Intersect<
  z.infer<
    Feature['command']['options']
  >
>;

/**
 * The intersection type used to describe
 * all feature command actions
 *
 * _Used for type casting only as TypeScript does not support correlated unions_
 *
 * [TypeScript Issue](https://github.com/microsoft/TypeScript/issues/30581)
 */
export type CommandAction = Intersect<
  Feature['command']['action']
>;

/**
 * The intersection type used to describe
 * all feature component props
 *
 * _Used for type casting only as TypeScript does not support correlated unions_
 *
 * [TypeScript Issue](https://github.com/microsoft/TypeScript/issues/30581)
 */
export type FeatureComponentProps = Intersect<
  ComponentProps<
    Feature['component']
  >
>;

/**
 * Used to describe the feature output
 * type for all features
 */
export type FeatureOutput = {
  [K in keyof FeatureMap]: {
    readonly featureId: K;
    readonly componentProps: ComponentProps<FeatureMap[K]['component']>;
  }
}[keyof FeatureMap];

/**
 * Used to describe the event data used for events
 * sent from the `executeInput` helper
 */
export type ExecuteInputEvent = {
  [K in keyof FeatureMap]: {
    readonly featureId: K;
    readonly actionEvent: ActionEvent<ComponentProps<FeatureMap[K]['component']>>;
  }
}[keyof FeatureMap];

/**
 * Describes the parsed input which consists of
 * the `command` and the `options`
 */
export interface ParsedInput {
  readonly rawInput: string;
  readonly command?: string;
  readonly options?: Record<string, unknown>;
}

/**
 * Used to send progress from an action to the
 * terminal for long-running actions
 */
export interface ActionProgressEvent {
  readonly type: 'progress';
  readonly percentage: number;
  readonly message?: string;
}

/**
 * Used to send updates from an action to the terminal to update
 * the feature data such as the component `props`
 *
 * - Generic type `P` for the component props
 */
export interface ActionUpdateEvent<P extends object> {
  readonly type: 'update';
  readonly componentProps: P;
}

/**
 * Describes the server action success response
 * used within the `serverAction` helper.
 *
 * - Generic type `T` for the data
 */
export interface ServerActionSuccessResponse<T> {
  readonly status: 'success';
  readonly data: T;
}

/**
 * Describes the server action error response
 * used within the `serverAction` helper.
 */
export interface ServerActionErrorResponse {
  readonly status: 'error';
  readonly errorMessage: string;
}

/**
 * Describes a validation error used
 * within the `ValidationException`
 */
export interface ValidationError {
  readonly match: string | RegExp;
  readonly message: string;
  readonly line: number;
  readonly position: number;
}

/**
 * Describes the terminal executed block used
 * to store data for an executed command
 */
export interface TerminalExecutedBlock {
  readonly type: 'executed';
  readonly id: string;
  readonly input: string;
  readonly duration: number;
  readonly output: FeatureOutput;
}

/**
 * Describes the terminal validation error block
 * used to store data for an input error
 */
export interface TerminalValidationErrorBlock {
  readonly type: 'validation-error';
  readonly id: string;
  readonly input: string;
  readonly duration: number;
  readonly regex: RegExp;
  readonly errors: ValidationError[];
}

/**
 * Describes the terminal error block used
 * to store data for an input error
 */
export interface TerminalErrorBlock {
  readonly type: 'error';
  readonly id: string;
  readonly input: string;
  readonly duration: number;
  readonly error: Error;
}
