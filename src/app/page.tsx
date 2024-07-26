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
      <div className="flex flex-col">
        <div className="flex flex-col items-end pb-7">
          <p className="text-8xl text-white">
            <span className="font-sans">
              _
            </span>
            <span className="font-sans font-bold">
              Dev Tools
            </span>
          </p>
          <p className="font-sans font-bold text-md text-white">
            By Liam Hales
          </p>
        </div>
        <div className="flex flex-row gap-x-3">
          <p className="font-mono font-bold text-zinc-500">
            {'>'}
            _
          </p>
          <p className="font-mono text-sm text-white">
            Useful dev tools accessed via a browser
            <br />
            and used like a terminal
          </p>
        </div>
      </div>
      <div className="flex flex-col pt-36">
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
            - Use the
            <CodeInline className="ml-2 mr-2">
              --help
            </CodeInline>
            command option to get help for a specific command
          </p>
          <p className="font-mono text-sm text-white">
            - You can also use
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
