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
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs">
          Usage:
        </p>
        <p className="text-xs pl-4">
          {'<command> [options]'}
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-xs">
          Commands:
        </p>
        <div className="flex flex-wrap gap-y-4 pb-8 pl-4">
          {
            features
              .sort((a, b) => a.command.localeCompare(b.command))
              .map((feature) => {
                const { command, description } = feature;

                return (
                  <Fragment key={`feature-${command}`}>
                    <div className="w-[18%]">
                      <p className="text-xs">
                        <CodeInline>
                          {command}
                        </CodeInline>
                      </p>
                    </div>
                    <div className="w-[82%] flex flex-row gap-x-2">
                      <p className="text-xs">
                        -
                      </p>
                      <p className="text-xs">
                        {description}
                      </p>
                    </div>
                  </Fragment>
                );
              })
          }
        </div>
      </div>
      <p className="text-xs">
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
    </div>
  );
};

export default Help;
