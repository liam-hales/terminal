import { FunctionComponent, Ref } from 'react';
import { ZodObject, ZodRawShape, z } from 'zod';
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
 * Describes the function which is used to update
 * the current progress of an action
 */
export type OnProgress = (percentage: number, message?: string) => void;

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
  O extends ZodObject<ZodRawShape>,
  P extends object,
> {
  readonly id: F;
  readonly command: ICommand<O, P>;
  readonly component: FunctionComponent<P>;
  readonly enabled: boolean;
}

/**
 * Used to describe a feature command which
 * can be executed in the terminal
 *
 * - Generic type `O` for the options
 * - Generic type `P` for the component props
 */
export interface ICommand<
  O extends ZodObject<ZodRawShape>,
  P extends object,
> {
  readonly name: string;
  readonly description: string;
  readonly options: O;
  readonly execution: 'server' | 'client';
  readonly action: (
    options: z.infer<O>,
    onProgress: OnProgress,
  ) => P | Promise<P>;
}

/**
 * The type used to describe
 * all feature commands
 */
export type FeatureCommand = Feature['command'];

/**
 * The intersection type used to describe
 * all feature command options
 *
 * _Used for type casting only as TypeScript does not support correlated unions_
 *
 * [TypeScript Issue](https://github.com/microsoft/TypeScript/issues/30581)
 */
export type FeatureOption = Intersect<
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
export type FeatureAction = Intersect<
  Feature['command']['action']
>;

/**
 * The intersection type used to
 * describe all feature props
 *
 * _Used for type casting only as TypeScript does not support correlated unions_
 *
 * [TypeScript Issue](https://github.com/microsoft/TypeScript/issues/30581)
 */
export type FeatureProp = Intersect<
  Awaited<
    ReturnType<
      Feature['command']['action']
    >
  >
>;

/**
 * Used to build the feature output
 * type for all features
 *
 * - Generic type `T` for the feature union type
 */
export type FeatureOutput = {
  [K in keyof FeatureMap]: {
    readonly featureId: K;
    readonly props: Awaited<ReturnType<FeatureMap[K]['command']['action']>>;
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
 * Describes the server action response
 * used within the `serverAction` helper.
 *
 * - Generic type `T` for the data
 */
export interface ServerActionResponse<T> {
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

/**
 * The union type for all
 * terminal block types
 */
export type TerminalBlock = TerminalExecutedBlock | TerminalValidationErrorBlock | TerminalErrorBlock;
