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
      <div className="flex flex-col gap-y-1 pt-2 pl-4">
        {
          extractKeys(shape)
            .map((key) => {

              // Fully unwrap the Zod type to
              // extract the option details
              const { description } = shape[key];
              const { _def } = unwrapType(shape[key]);

              const option = kebabCase(key);

              return (
                <div
                  className="flex flex-row"
                  key={`help-command-option-${option}`}
                >
                  <div className="min-w-24">
                    <CodeInline>
                      {`--${option}`}
                    </CodeInline>
                  </div>
                  <div className="flex flex-row gap-x-2 pt-0.5">
                    <p className="font-mono text-sm text-white">
                      -
                    </p>
                    <div className="flex flex-col">
                      <p className="font-mono text-sm text-white">
                        {description}
                      </p>
                      {(() => {
                        if (_def.typeName === 'ZodUnion') {

                          // Map the union options into all possible option
                          // values to display for the command help
                          const values = _def.options
                            .map((option) => option.value)
                            .join(' | ');

                          return (
                            <p className="mt-1 mb-2">
                              <CodeInline>
                                {values}
                              </CodeInline>
                            </p>
                          );
                        }
                      })()}
                    </div>
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
