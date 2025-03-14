'use server';

import { ServerActionErrorResponse, ServerActionResponse } from '../types';

/**
 * Used to wrap server actions and catch any errors thrown
 * making sure they are correctly returned to the client
 *
 * @param action The server action to call
 * @param options The options for the action
 *
 * @returns The server action response
 */
const serverAction = async <T extends object, O extends object>(
  action: (options: O) => T | Promise<T>,
  options: O,
): Promise<ServerActionResponse<T> | ServerActionErrorResponse> => {

  try {
    const data = await action(options);
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
