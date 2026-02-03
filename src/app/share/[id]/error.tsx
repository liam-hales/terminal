'use client';

import { ReactElement, useEffect } from 'react';
import { ErrorComponent } from 'next/dist/client/components/error-boundary';

/**
 * The share error boundary used to catch any errors
 * thrown while fetching and decrypting share items
 *
 * @returns The `ShareError` component
 */
const ShareError: ErrorComponent = ({ error }): ReactElement => {

  /**
   * Logs out the error to the console
   * for extra visibility
   */
  // eslint-disable-next-line no-console
  useEffect(() => console.error(error), [error]);

  return (
    <div className="w-full max-w-200 h-full flex flex-col items-center pt-6 pb-10 pl-6 pr-6">
      <div className="w-full flex flex-col items-start border-solid border border-error shadow-error/60 shadow-[5px_5px_0px_0px] rounded-sm pt-6 pb-6 pl-4 pr-20 gap-y-2">
        <p className="text-xs text-error!">
          {`X - ${error.message}`}
        </p>
        <p className="text-xs italic text-error! pl-8">
          Please check the URL is correct
        </p>
      </div>
    </div>
  );
};

export default ShareError;
