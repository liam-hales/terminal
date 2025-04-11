import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import getConfig from 'next/config';

/**
 * Used to generate the file upload token to access Vercel storage
 * used by the `@vercel/blob` file upload client
 *
 * @param request The request
 * @returns The response
 */
export const POST = async (request: Request): Promise<NextResponse> => {
  const body: HandleUploadBody = await request.json();

  const { serverRuntimeConfig } = getConfig();
  const { fileUploadToken } = serverRuntimeConfig;

  try {
    // Handle the file upload
    // to Vercel storage
    const response = await handleUpload({
      body: body,
      request: request,
      token: fileUploadToken,
      onUploadCompleted: async () => {},
      onBeforeGenerateToken: async () => {
        return {
          // Set the maximum size
          // per file to 100mb
          maximumSizeInBytes: 104_857_600,
        };
      },
    });

    return NextResponse.json(response);
  }
  catch (error) {
    if (error instanceof Error) {

      // Extract the error details and
      // return the error response
      const { message, stack } = error;
      return NextResponse.json(
        {
          statusCode: 500,
          message: message,
          stack: stack,
        },
        {
          status: 500,
        },
      );
    }

    throw error;
  }
};
