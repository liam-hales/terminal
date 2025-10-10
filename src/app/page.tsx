'use client';

import { FunctionComponent, ReactElement } from 'react';
import { CodeInline } from '../components/common';
import Link from 'next/link';
import dedent from 'dedent';

/**
 * The entry point for the `/` app route,
 * used to display the app welcome UI
 *
 * @returns The `AppPage` component
 */
const AppPage: FunctionComponent = (): ReactElement => {
  return (
    <div className="w-full flex flex-col items-start pt-12 pb-12 pl-6 pr-6">
      <pre className="leading-5">
        {
          dedent`
              ████████╗ ███████╗ ██████╗  ███╗   ███╗ ██╗ ███╗   ██╗  █████╗  ██╗
              ╚══██╔══╝ ██╔════╝ ██╔══██╗ ████╗ ████║ ██║ ████╗  ██║ ██╔══██╗ ██║
                 ██║    █████╗   ██████╔╝ ██╔████╔██║ ██║ ██╔██╗ ██║ ███████║ ██║
                 ██║    ██╔══╝   ██╔══██╗ ██║╚██╔╝██║ ██║ ██║╚██╗██║ ██╔══██║ ██║
                 ██║    ███████╗ ██║  ██║ ██║ ╚═╝ ██║ ██║ ██║ ╚████║ ██║  ██║ ███████╗
                 ╚═╝    ╚══════╝ ╚═╝  ╚═╝ ╚═╝     ╚═╝ ╚═╝ ╚═╝  ╚═══╝ ╚═╝  ╚═╝ ╚══════╝
            `
        }
      </pre>
      <div className="flex flex-col pt-16">
        <p className="text-lg max-w-[440px]">
          Web-based developer tools with a dev-friendly terminal interface.
        </p>
        <p className="text-xs pt-8">
          <span className="italic mr-2">- Built by </span>
          <Link
            href="https://liamhales.dev"
            target="_blank"
            passHref={true}
          >
            <CodeInline>
              LIAM HALES
            </CodeInline>
          </Link>
        </p>
      </div>
      <div className="flex flex-col pt-24">
        <p className="text-2xl">
          GETTING STARTED
        </p>
        <div className="flex flex-col gap-y-2 pt-6">
          <p className="text-sm">
            - Use the
            <CodeInline className="ml-2 mr-2">
              help
            </CodeInline>
            command to display all available commands
          </p>
          <p className="text-sm">
            - Use the
            <CodeInline className="ml-2 mr-2">
              --help
            </CodeInline>
            command option to get help for a specific command
          </p>
          <p className="text-sm">
            - You can also use
            <CodeInline className="ml-2 mr-2">
              {'help --for <command>'}
            </CodeInline>
            to get help for a specific command
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
