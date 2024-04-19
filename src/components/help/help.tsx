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
      <p className="font-mono text-sm text-white pb-8">
        Use the
        <CodeInline className="ml-2 mr-2">
          {'--for <command>'}
        </CodeInline>
        option to get help for a specific command
      </p>
      <p className="font-mono text-sm text-white">
        Commands:
      </p>
      <div className="flex flex-col gap-y-1 pt-2 pl-4">
        {
          features
            .map((feature) => feature.command)
            .map((command) => {
              const { name, description } = command;

              return (
                <div
                  className="flex flex-row"
                  key={`help-command-${name}`}
                >
                  <div className="w-24 shrink-0">
                    <CodeInline>
                      {name}
                    </CodeInline>
                  </div>
                  <div className="flex flex-row mt-[2px]">
                    <p className="font-mono text-sm font-bold text-white pl-2 pr-2">
                      -
                    </p>
                    <p className="font-mono text-sm text-white">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })
        }
      </div>
    </>
  );
};

export default Help;
