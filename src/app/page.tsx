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
      <div className="flex flex-col pb-24">
        <div className="flex flex-col items-end pb-7">
          <p className="text-8xl text-white">
            <span className="font-sans">
              _
            </span>
            <span className="font-sans font-bold">
              Terminal
            </span>
          </p>
          <p className="font-sans text-md text-white">
            Built by Liam Hales
          </p>
        </div>
        <div className="flex flex-row gap-x-3">
          <p className="font-mono font-bold text-zinc-500">
            {'>'}
            _
          </p>
          <p className="font-mono text-sm text-white max-w-96">
            Web-based developer tools with a dev-friendly terminal interface
          </p>
        </div>
      </div>
      <div className="flex flex-col pt-7 pb-7 pl-9 pr-9 rounded-xl border-solid border-2 border-zinc-900">
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
