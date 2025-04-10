'use server';

import { OnProgress, ServerActionErrorResponse, ServerActionResponse } from '../types';

/**
 * Used to wrap server actions and catch any errors thrown
 * making sure they are correctly returned to the client
 *
 * - Generic type `O` for the options
 * - Generic type `P` for the component props
 *
 * @param action The server action to call
 * @param options The options for the action
 * @param onProgress The function used to update the action progress
 *
 * @returns The server action response
 */
const serverAction = async <
  O extends object,
  P extends object,
>(
  action: (options: O, onProgress: OnProgress) => P | Promise<P>,
  options: O,
  onProgress: OnProgress,
): Promise<ServerActionResponse<P> | ServerActionErrorResponse> => {

  try {
    const data = await action(options, onProgress);
    return {
      status: 'success',
      data: data,
    };
  }
  // Any errors will be unwrapped and their
  // message returned in the response
  catch (error) {
    if (error instanceof Error) {
      const { message } = error;

      return {
        status: 'error',
        errorMessage: message,
      };
    }

    throw error;
  }
};

export default serverAction;
