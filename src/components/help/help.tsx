import { FunctionComponent, ReactElement } from 'react';
import features from '../../features';

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
      <p className="font-mono font-bold text-sm text-white">
        Commands:
      </p>
      {
        features
          .map((feature) => feature.command)
          .map((command) => {
            const { name, description } = command;

            return (
              <div
                className="flex flex-row pl-4"
                key={`help-command-${name}`}
              >
                <p className="w-28 shrink-0 font-mono font-bold text-sm text-white">
                  {name}
                </p>
                <p className="font-mono font-bold text-sm text-white">
                  {description}
                </p>
              </div>
            );
          })
      }
    </>
  );
};

export default Help;
