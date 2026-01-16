import { ExecuteInputEvent, ExecuteInputFeatureEvent, ParsedInput } from '../types';
import { resolveFeature, serverAction, validateOptions } from './';
import { isAsyncGenerator } from '../guards';
import { clearOptions } from '../features/clear';

/**
 * Used to validate and execute
 * a given input
 *
 * @param input The parsed input
 * @returns The async generator used to transmit events
 */
const executeInput = async function* (input: ParsedInput): AsyncGenerator<ExecuteInputEvent> {
  const { command: inputCommand } = input;

  // If the command is set to `clear` then treat this separately
  // to a standard feature and yield the clear event
  if (inputCommand === 'clear') {
    const { last } = validateOptions(input, clearOptions);
    yield {
      type: 'clear',
      last: last,
    };

    return;
  }

  // If the command is set to `text` then treat this separately
  // to a standard feature and yield the text event
  if (inputCommand === 'text') {
    yield {
      type: 'text',
    };

    return;
  }

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
      type: 'feature',
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
      type: 'feature',
      featureId: id,
      actionEvent: {
        type: 'update',
        componentProps: response.data,
      },
    } as ExecuteInputFeatureEvent;
  }

  // @ts-expect-error - TypeScript does not currently support correlated unions
  const response = action(options);

  // If the response is an async generator then loop
  // through each event and yield the event
  if (isAsyncGenerator(response) === true) {
    for await (const event of response) {
      yield {
        type: 'feature',
        featureId: id,
        actionEvent: event,
      } as ExecuteInputFeatureEvent;
    }

    return;
  }

  // The response will either already be the props or a promise which
  // will resolve the props so use `await` to obtain them correctly
  const props = await response;
  yield {
    type: 'feature',
    featureId: id,
    actionEvent: {
      type: 'update',
      componentProps: props,
    },
  } as ExecuteInputFeatureEvent;
};

export default executeInput;
