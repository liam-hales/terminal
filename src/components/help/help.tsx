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
        <p className="text-sm">
          Usage:
        </p>
        <p className="text-sm pl-4">
          {'<command> [options]'}
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-sm">
          Commands:
        </p>
        <div className="flex flex-wrap gap-y-4 pb-8 pl-4">
          {
            features
              .map((feature) => feature.command)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((command) => {
                const { name, description } = command;

                return (
                  <Fragment key={`feature-${name}`}>
                    <div className="w-[18%]">
                      <p className="text-sm">
                        <CodeInline>
                          {name}
                        </CodeInline>
                      </p>
                    </div>
                    <div className="w-[82%] flex flex-row gap-x-2">
                      <p className="text-sm">
                        -
                      </p>
                      <p className="text-sm">
                        {description}
                      </p>
                    </div>
                  </Fragment>
                );
              })
          }
        </div>
      </div>
      <p className="text-sm">
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
