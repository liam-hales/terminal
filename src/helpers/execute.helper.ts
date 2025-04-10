import { nanoid } from 'nanoid';
import { TerminalBlock } from '../types';
import { ValidationException } from '../exceptions';
import { parseInput, executeInput } from '.';

/**
 * Used to execute a given raw terminal `input` from the user.
 *
 * - Parses the `input` using `parseInput`
 * - Execute the parsed input using `executeInput`
 * - Builds a terminal block based on any caught errors or output data
 *
 * @param input The user input
 * @param onProgress The function used to update the action progress
 *
 * @returns The terminal block
 */
const execute = async (
  input: string,
  onProgress: (percentage: number) => void,
): Promise<TerminalBlock> => {
  const blockId = nanoid(16);

  // Get the start time stamp which will be used to
  // capture the time it takes to execute the input
  const startTime = performance.now();

  try {
    const parsed = parseInput(input);
    const output = await executeInput(parsed, onProgress);

    // Get the end time stamp which along with the start time can be
    // used to capture the time it took for the input to be executed
    const endTime = performance.now();

    // Add the terminal executed block
    // for the feature output
    return {
      type: 'executed',
      id: blockId,
      input: input,
      duration: endTime - startTime,
      output: output,
    };
  }
  catch (error) {

    // Get the end time stamp which along with the start time can be
    // used to capture the time it took for the input execution to fail
    const endTime = performance.now();

    // If the error is a validation exception
    // Add the terminal validation error block
    if (error instanceof ValidationException) {
      const { regex, errors } = error;

      return {
        type: 'validation-error',
        id: blockId,
        input: input,
        duration: endTime - startTime,
        regex: regex,
        errors: errors,
      };
    }

    // If the error is a generic error
    // Add the terminal error block
    if (error instanceof Error) {
      return {
        type: 'error',
        id: blockId,
        input: input,
        duration: endTime - startTime,
        error: error,
      };
    }

    throw error;
  }
};

export default execute;
