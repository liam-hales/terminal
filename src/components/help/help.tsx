import { FunctionComponent, ReactElement } from 'react';
import { features } from '../../features';
import { CodeInline } from '../common';

/**
 * Used to render the help user interface
 * for a all feature commands
 *
 * @param props The component props
 * @returns The `Help` component
 */
const Help: FunctionComponent = (): ReactElement => {
  return (
    <>
      <p className="font-mono text-sm text-white pb-6">
        Usage:
        <CodeInline className="ml-2">
          {'<command> [options]'}
        </CodeInline>
      </p>
      <p className="font-mono text-sm text-white">
        Commands:
      </p>
      <div className="flex flex-wrap gap-y-2 pt-2 pb-8 pl-4">
        {
          features
            .map((feature) => feature.command)
            .map((command) => {
              const { name, description } = command;

              return (
                <>
                  <div className="w-[18%]">
                    <CodeInline>
                      {name}
                    </CodeInline>
                  </div>
                  <div className="w-[82%] flex flex-row gap-x-2">
                    <p className="font-mono text-sm text-white">
                      -
                    </p>
                    <p className="font-mono text-sm text-white">
                      {description}
                    </p>
                  </div>
                </>
              );
            })
        }
      </div>
      <p className="font-mono text-sm text-white">
        Use the
        <CodeInline className="ml-2 mr-2">
          --help
        </CodeInline>
        command option or
        <CodeInline className="ml-2 mr-2">
          {'help --for <command>'}
        </CodeInline>
        to get help for a specific command
      </p>
    </>
  );
};

export default Help;
