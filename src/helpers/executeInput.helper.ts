import { ExecuteInputEvent, ExecuteInputSystemEvent, ExecuteInputManagedFeatureEvent, ParsedInput } from '../types';
import { resolveFeature, serverAction, validateOptions } from './';
import { isAsyncGenerator } from '../guards';

/**
 * Used to validate and execute
 * a given input
 *
 * @param input The parsed input
 * @returns The async generator used to transmit events
 */
const executeInput = async function* (input: ParsedInput): AsyncGenerator<ExecuteInputEvent> {
  // Resolve the feature from the parsed input and validate
  // the input options against the feature schema
  const feature = resolveFeature(input);
  const options = validateOptions(input, feature.options);

  // If the help option has been set to true,
  // yield the event for the help feature
  if (options.help === true) {
    yield {
      type: 'managed-feature',
      featureId: 'help',
      actionEvent: {
        type: 'update',
        componentProps: {
          featureId: feature.id,
        },
      },
    };

    return;
  }

  // If the feature is a system feature
  // then yield the system event
  if (feature.type === 'system') {
    yield {
      type: 'system',
      featureId: feature.id,
      options: options,
    } as ExecuteInputSystemEvent;

    return;
  }

  const { id, execution, action } = feature;

  // If the command execution needs to be done on the server, wrap the
  // action in the `serverAction` helper to execute this correctly
  if (execution === 'server') {
    // @ts-expect-error - TypeScript does not currently support correlated unions
    const response = await serverAction(action, options);

    // Check the response status and if there was an error, throw
    // a new error using the error message from the response
    if (response.status === 'error') {
      throw new Error(response.errorMessage);
    }

    yield {
      type: 'managed-feature',
      featureId: id,
      actionEvent: {
        type: 'update',
        componentProps: response.data,
      },
    } as ExecuteInputManagedFeatureEvent;
  }

  // @ts-expect-error - TypeScript does not currently support correlated unions
  const response = action(options);

  // If the response is an async generator then loop
  // through each event and yield the event
  if (isAsyncGenerator(response) === true) {
    for await (const event of response) {
      yield {
        type: 'managed-feature',
        featureId: id,
        actionEvent: event,
      } as ExecuteInputManagedFeatureEvent;
    }

    return;
  }

  // The response will either already be the props or a promise which
  // will resolve the props so use `await` to obtain them correctly
  const props = await response;
  yield {
    type: 'managed-feature',
    featureId: id,
    actionEvent: {
      type: 'update',
      componentProps: props,
    },
  } as ExecuteInputManagedFeatureEvent;
};

export default executeInput;
