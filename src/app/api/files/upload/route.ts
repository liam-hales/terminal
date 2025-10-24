import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

/**
 * Used to generate the file upload token to access Vercel storage
 * used by the `@vercel/blob` file upload client
 *
 * @param request The request
 * @returns The response
 */
export const POST = async (request: Request): Promise<NextResponse> => {
  const fileUploadToken = process.env.FILE_READ_WRITE_TOKEN;

  // Make sure the `FILE_READ_WRITE_TOKEN`
  // environment variable has been set
  if (fileUploadToken == null) {
    throw new Error('The "FILE_READ_WRITE_TOKEN" environment variable is required');
  }

  const body: HandleUploadBody = await request.json();

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
          // per file to 50 MB
          maximumSizeInBytes: 52_428_800,
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
