'use client';

import { FunctionComponent, ReactElement } from 'react';
import { CodeInline, Typewriter } from '../components/common';
import Link from 'next/link';

/**
 * The entry point for the `/` app route,
 * used to display the app welcome UI
 *
 * @returns The `AppPage` component
 */
const AppPage: FunctionComponent = (): ReactElement => {
  return (
    <>
      <div className="flex flex-col pb-28">
        <div className="flex flex-col pb-7">
          <Typewriter
            className="font-sans font-bold text-9xl text-white"
            onInit={(typewriter) => {
              typewriter
                .pauseFor(400)
                .typeString('Terminal')
                .pauseFor(200)
                .typeString('.')
                .start();
            }}
          />
        </div>
        <div className="flex flex-col pl-6">
          <p className="font-mono text-sm text-white max-w-96">
            Web-based developer tools with a dev-friendly terminal interface.
          </p>
          <p className="font-mono italic text-xs text-white pt-8">
            <span>- Built by </span>
            <Link
              href="https://liamhales.dev"
              target="_blank"
              passHref={true}
            >
              <span className="font-bold underline underline-offset-2">Liam Hales</span>
            </Link>
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
