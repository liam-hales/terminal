import { FunctionComponent, ReactElement, Fragment } from 'react';
import { features } from '../../features';
import { CodeInline } from '../common';

/**
 * Used to render the help user interface
 * for all feature commands
 *
 * @returns The `Help` component
 */
const Help: FunctionComponent = (): ReactElement => {
  return (
    <Fragment>
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
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((command) => {
              const { name, description } = command;

              return (
                <Fragment key={`feature-${name}`}>
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
                </Fragment>
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
    </Fragment>
  );
};

export default Help;
