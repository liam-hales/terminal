import { FunctionComponent, ReactElement, Fragment } from 'react';
import { kebabCase } from 'change-case';
import { BaseProps, FeatureCommand } from '../../types';
import { extractKeys, unwrapType } from '../../helpers';
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
    <Fragment>
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
      <div className="flex flex-wrap gap-y-2 pt-2 pl-4">
        {
          extractKeys(shape)
            .sort((a, b) => a.localeCompare(b))
            .map((key) => {

              // Fully unwrap the Zod type to
              // extract the option details
              const { def, description } = shape[key];
              const { def: unwrappedDef } = unwrapType(shape[key]);

              const option = kebabCase(key);

              return (
                <Fragment key={`command-option-${option}`}>
                  <div className="w-[18%]">
                    <CodeInline>
                      {`--${option}`}
                    </CodeInline>
                  </div>
                  <div className="w-[32%]">
                    {
                      (() => {
                        if (unwrappedDef.type === 'union') {

                          // Map the union options into all possible option
                          // values to display for the command help
                          const values = unwrappedDef.options
                            .map((option) => {
                              const { def } = option;

                              // If the option is a literal then it
                              // will have a value we can use
                              if (def.type === 'literal') {
                                const [value] = def.values;
                                return (typeof value === 'string') ? `"${value}"` : value;
                              }

                              // There is no value so instead
                              // we can use the type value
                              return def.type;
                            })
                            .join(' | ');

                          return (
                            <CodeInline>
                              {`[${values}]`}
                            </CodeInline>
                          );
                        }

                        return (
                          <CodeInline>
                            {`[${unwrappedDef.type}]`}
                          </CodeInline>
                        );
                      })()
                    }
                    {
                      (() => {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        if (def.type === 'default') {

                          // Extract the default value from the definition and wrap said
                          // value in quotes if it is a string to display it correctly
                          const { defaultValue } = def;
                          const value = (typeof defaultValue === 'string') ? `"${defaultValue}"` : defaultValue;

                          return (
                            <CodeInline className="ml-2 text-zinc-500">
                              {`default: ${value}`}
                            </CodeInline>
                          );
                        }
                      })()
                    }
                  </div>
                  <div className="w-[50%] flex flex-row gap-x-2">
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
    </Fragment>
  );
};

export default CommandHelp;
