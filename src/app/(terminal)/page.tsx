'use client';

import { FunctionComponent, ReactElement } from 'react';
import { CodeInline } from '../../components/common';
import { TerminalTitle } from '../../components';
import Link from 'next/link';
import date from '../../date';

/**
 * The terminal page component used to render the welcome UI
 * and getting started section within the terminal
 *
 * @returns The `TerminalPage` component
 */
const TerminalPage: FunctionComponent = (): ReactElement => {

  const year = date
    .utc()
    .format('YYYY');

  return (
    <div className="w-full flex flex-col items-start pt-12 pb-12">
      <div className="flex flex-col items-end gap-y-2">
        <TerminalTitle className="leading-5" />
        <p className="text-[11px]">
          {`© ${year} <LIAM HALES>`}
        </p>
      </div>
      <div className="flex flex-col pt-12 gap-y-8">
        <p className="max-w-110 text-xs">
          Web-based developer tools with a dev-friendly terminal interface.
        </p>
        <div className="flex flex-row items-center gap-x-6">
          <Link
            href="https://liamhales.dev"
            target="_blank"
            passHref={true}
          >
            <p className="text-xs border-solid border border-primary shadow-primary/60 shadow-[4px_4px_0px_0px] p-2">
              liamhales.dev
            </p>
          </Link>
          <Link
            href="https://github.com/liam-hales/terminal"
            target="_blank"
            passHref={true}
          >
            <p className="text-xs border-solid border border-primary shadow-primary/60 shadow-[4px_4px_0px_0px] p-2">
              source / github
            </p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col pt-24">
        <p className="text-xl">
          GETTING STARTED
        </p>
        <div className="flex flex-col gap-y-2 pt-6">
          <p className="text-xs">
            - Use the
            <CodeInline className="ml-2 mr-2">
              help
            </CodeInline>
            command to display all available commands
          </p>
          <p className="text-xs">
            - Use the
            <CodeInline className="ml-2 mr-2">
              --help
            </CodeInline>
            command option to get help for a specific command
          </p>
          <p className="text-xs">
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

export default TerminalPage;
