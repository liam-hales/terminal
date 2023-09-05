import { FunctionComponent, ReactElement } from 'react';
import { CodeInline } from '../components/common';

/**
 * The entry point for the `/` app route,
 * used to display the app welcome UI
 *
 * @returns The `AppPage` component
 */
const AppPage: FunctionComponent = async (): Promise<ReactElement> => {
  return (
    <>
      <div className="flex flex-col items-end pb-8">
        <p className="font-sans font-bold text-7xl text-white">
          Dev Tools
        </p>
        <p className="font-mono font-bold text-sm text-white">
          By Liam Hales
        </p>
      </div>
      <p className="max-w-sm font-mono text-sm text-white text-center">
        Useful dev tools accessed via a browser and used like a terminal
      </p>
      <div className="flex flex-col pt-16">
        <p className="font-sans font-bold text-3xl text-white">
          Getting started...
        </p>
        <div className="flex flex-col gap-y-2 pt-6">
          <p className="font-mono text-sm text-white">
            - Use the
            <CodeInline className="ml-2 mr-2">
              help
            </CodeInline>
            command to display all available commands
          </p>
          <p className="font-mono text-sm text-white">
            - Use
            <CodeInline className="ml-2 mr-2">
              {'help --for <command>'}
            </CodeInline>
            to get help for a specific command
          </p>
        </div>
      </div>
    </>
  );
};

export default AppPage;
