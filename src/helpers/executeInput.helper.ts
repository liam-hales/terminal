import { ExecuteInputEvent, ParsedInput } from '../types';
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

  // Resolve the feature from
  // the parsed input
  const { id, command } = resolveFeature(input);
  const { action, execution } = command;

  // Validate the input options against
  // the command options schema
  const options = validateOptions(input, command.options);

  // If the help option has been set to true,
  // yield the event for the help feature
  if (options.help === true) {
    yield {
      featureId: 'help',
      actionEvent: {
        type: 'update',
        componentProps: {
          command: command,
        },
      },
    };

    return;
  }

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
      featureId: id,
      actionEvent: {
        type: 'update',
        componentProps: response.data,
      },
    } as ExecuteInputEvent;
  }

  // @ts-expect-error - TypeScript does not currently support correlated unions
  const response = action(options);

  // If the response is an async generator then loop
  // through each event and yield the event
  if (isAsyncGenerator(response) === true) {
    for await (const event of response) {
      yield {
        featureId: id,
        actionEvent: event,
      } as ExecuteInputEvent;
    }

    return;
  }

  // The response will either already be the props or a promise which
  // will resolve the props so use `await` to obtain them correctly
  const props = await response;
  yield {
    featureId: id,
    actionEvent: {
      type: 'update',
      componentProps: props,
    },
  } as ExecuteInputEvent;
};

export default executeInput;
