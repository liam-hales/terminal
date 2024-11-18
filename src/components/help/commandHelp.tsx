import { FunctionComponent, ReactElement } from 'react';
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
      <div className="flex flex-wrap gap-y-2 pt-2 pl-4">
        {
          extractKeys(shape)
            .map((key) => {

              // Fully unwrap the Zod type to
              // extract the option details
              const { _def: def, description } = shape[key];
              const { _def: unwrappedDef } = unwrapType(shape[key]);

              const option = kebabCase(key);

              return (
                <>
                  <div className="w-[18%]">
                    <CodeInline>
                      {`--${option}`}
                    </CodeInline>
                  </div>
                  <div className="w-[32%]">
                    {
                      (() => {
                        if (unwrappedDef.typeName === 'ZodUnion') {

                          // Map the union options into all possible option
                          // values to display for the command help
                          const values = unwrappedDef.options
                            .map((option) => option.value)
                            .join(' | ');

                          return (
                            <CodeInline>
                              {`[${values}]`}
                            </CodeInline>
                          );
                        }

                        const { typeName } = unwrappedDef;

                        // Extract the type from the
                        // Zod definition type name
                        const type = typeName
                          .replace('Zod', '')
                          .toLowerCase();

                        return (
                          <CodeInline>
                            {`[${type}]`}
                          </CodeInline>
                        );
                      })()
                    }
                    {
                      (def.typeName === 'ZodDefault') && (
                        <CodeInline className="ml-2 text-zinc-500">
                          {`default: ${def.defaultValue()}`}
                        </CodeInline>
                      )
                    }
                  </div>
                  <div className="w-[50%] flex flex-row gap-x-2 pt-0.5">
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
    </>
  );
};

export default CommandHelp;
