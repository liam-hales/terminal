import { FunctionComponent, ReactElement } from 'react';
import { paramCase } from 'param-case';
import { BaseProps, FeatureCommand } from '../../types';
import { extractKeys } from '../../helpers';
import { CodeInline } from '../common';

/**
 * The `CommandHelp` component props
 */
interface Props extends BaseProps {
  readonly command: FeatureCommand;
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
  const { shape } = options;

  return (
    <>
      <p className="font-mono text-sm text-white">
        Usage:
        <CodeInline className="ml-2">
          {name}
          {' '}
          [options]
        </CodeInline>
      </p>
      <p className="font-mono text-sm text-white pt-6 pb-8">
        {description}
      </p>
      <p className="font-mono text-sm text-white">
        Options:
      </p>
      <div className="flex flex-col gap-y-1 pt-2 pl-4">
        {
          extractKeys(shape)
            .map((key) => {
              const { description } = shape[key];
              const option = paramCase(key);

              return (
                <div
                  className="flex flex-row"
                  key={`help-command-${option}`}
                >
                  <div className="min-w-24">
                    <CodeInline>
                      {`--${option}`}
                    </CodeInline>
                  </div>
                  <div className="flex flex-row gap-x-2">
                    <p className="font-mono text-sm text-white">
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

export default CommandHelp;
