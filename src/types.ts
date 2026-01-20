import { ComponentProps, FunctionComponent, Ref } from 'react';
import { ZodObject, z } from 'zod';
import { SystemFeatureMap, ManagedFeatureMap, FeatureMap } from './features';

/**
 * Describes the feature ID's used to
 * differentiate each feature
 */
export type FeatureId =
  | 'clear'
  | 'text'
  | 'share'
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
  | 'file-upload'
  | 'isp'
  | 'speed-test'
  | 'format-json'
  | 'format-sql';

/**
 * Describes the different
 * feature types
 */
export type FeatureType = 'system' | 'managed';

/**
 * Describes the different modes
 * the terminal can be in
 */
export type TerminalMode = 'command' | 'text';

/**
 * The union type for all
 * terminal block types
 */
export type TerminalBlock = TerminalFeatureBlock | TerminalValidationErrorBlock | TerminalErrorBlock;

/**
 * The union type for all server
 * action response types
 *
 * - Generic type `T` for the data
 */
export type ServerActionResponse<T> = ServerActionSuccessResponse<T> | ServerActionErrorResponse;

/**
 * The union type for all
 * execute input event types
 */
export type ExecuteInputEvent = ExecuteInputSystemEvent | ExecuteInputManagedFeatureEvent;

/**
 * The union type for all managed
 * feature action event types
 *
 * - Generic type `T` for the props
 */
export type ActionEvent<P extends object> = ActionProgressEvent | ActionUpdateEvent<P>;

/**
 * Used to create a map type from a
 * given object type and index key
 *
 * - Generic type `T` for the type to map
 * - Generic type `U` for the index key
 */
export type Map<
  T extends { readonly [K in U]: string },
  U extends keyof T,
> = {
  [K in T[U]]: Extract<
    T,
    {
      readonly [Key in U]: K;
    }
  >;
};

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
 * Used to describe a feature that is run at a system
 * level and is managed different to other features
 *
 * - Generic type `F` for the feature ID
 * - Generic type `O` for the options schema
 * - Generic type `C` for the component
 */
export interface SystemFeature<
  F extends FeatureId,
  O extends ZodObject,
  C extends FunctionComponent<never> | undefined = undefined,
> {
  readonly type: 'system';
  readonly id: F;
  readonly command: string;
  readonly description: string;
  readonly options: O;
  readonly component: C;
  readonly isEnabled: boolean;
}

/**
 * Used to describe a feature that is fully managed
 * by the terminal and is executed on the client
 *
 * - Generic type `F` for the feature ID
 * - Generic type `O` for the options schema
 * - Generic type `P` for the component props
 */
export interface ClientFeature<
  F extends FeatureId,
  O extends ZodObject,
  P extends object,
> {
  readonly type: 'managed';
  readonly id: F;
  readonly command: string;
  readonly description: string;
  readonly options: O;
  readonly execution: 'client';
  readonly action: (options: z.infer<O>) => P | Promise<P> | AsyncGenerator<ActionEvent<P>>;
  readonly component: FunctionComponent<P>;
  readonly isEnabled: boolean;
}

/**
 * Used to describe a feature that is fully managed
 * by the terminal and is executed on the server
 *
 * - Generic type `F` for the feature ID
 * - Generic type `O` for the options schema
 * - Generic type `P` for the component props
 */
export interface ServerFeature<
  F extends FeatureId,
  O extends ZodObject,
  P extends object,
> {
  readonly type: 'managed';
  readonly id: F;
  readonly command: string;
  readonly description: string;
  readonly options: O;
  readonly execution: 'server';
  readonly action: (options: z.infer<O>) => P | Promise<P>;
  readonly component: FunctionComponent<P>;
  readonly isEnabled: boolean;
}

/**
 * Used to describe the feature output
 * type for all features
 */
export type FeatureOutput = {
  [K in keyof FeatureMap]: FeatureMap[K] extends { readonly component: infer C; }
    ? C extends FunctionComponent<infer P>
      ? {
          readonly featureId: K;
          readonly componentProps: P;
        }
      : never
    : never;
}[keyof FeatureMap];

/**
 * Used to describe the system events
 * sent from the `executeInput` helper
 */
export type ExecuteInputSystemEvent =
  {
    readonly type: 'system';
  }
  & {
    [K in keyof SystemFeatureMap]: {
      readonly featureId: K;
      readonly options: z.infer<SystemFeatureMap[K]['options']>;
    }
  }[keyof SystemFeatureMap];

/**
 * Used to describe the managed feature events
 * sent from the `executeInput` helper
 */
export type ExecuteInputManagedFeatureEvent =
  {
    readonly type: 'managed-feature';
  }
  & {
    [K in keyof ManagedFeatureMap]: {
      readonly featureId: K;
      readonly actionEvent: ActionEvent<ComponentProps<ManagedFeatureMap[K]['component']>>;
    }
  }[keyof ManagedFeatureMap];

/**
 * Describes the parsed input which consists of
 * the `command` and the `options`
 */
export interface ParsedInput {
  readonly rawInput: string;
  readonly command: string;
  readonly options?: Record<string, unknown>;
}

/**
 * Used to send progress from a managed feature
 * action to the terminal for long-running actions
 */
export interface ActionProgressEvent {
  readonly type: 'progress';
  readonly percentage: number;
  readonly message?: string;
}

/**
 * Used to send updates from a managed feature action to the terminal
 * to update the feature data such as the component `props`
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
 * Describes the terminal feature block used
 * to store data for the feature
 */
export interface TerminalFeatureBlock {
  readonly type: 'feature';
  readonly id: string;
  readonly input: string;
  readonly duration?: number;
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
 * Describes the share item
 * record stored in DynamoDB
 */
export interface ShareItem {
  readonly id: string;
  readonly iv: string;
  readonly ciphertext: string;
  readonly selfDestruct: boolean;
}
