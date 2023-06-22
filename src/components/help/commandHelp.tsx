import { FunctionComponent, ReactElement } from 'react';
import { paramCase } from 'param-case';
import { BaseProps, Command } from '../../types';
import { extractKeys } from '../../helpers';

/**
 * The `CommandHelp` component props
 */
interface Props extends BaseProps {
  readonly command: Command;
}

/**
 * Used to render the help user interface
 * for a specific feature command
 *
 * @param props The component props
 * @returns The `CommandHelp` component
 */
const CommandHelp: FunctionComponent<Props> = ({ command }): ReactElement<Props> => {
  const { name, description, options } = command;
  const { config } = options;

  return (
    <>
      <p className="font-mono font-bold text-sm text-white">
        {`Usage: ${name} [options]`}
      </p>
      <p className="font-mono font-bold text-sm text-white pt-6 pb-8">
        {description}
      </p>
      <p className="font-mono font-bold text-sm text-white">
        Options:
      </p>
      {
        extractKeys(config)
          .map((key) => {
            const { description } = config[key];
            const option = paramCase(key);

            return (
              <div
                className="flex flex-row pl-4"
                key={`help-command-${option}`}
              >
                <p className="w-28 shrink-0 font-mono font-bold text-sm text-white">
                  {`--${option}`}
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

export default CommandHelp;
