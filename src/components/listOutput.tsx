import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';
import { ListOutputItem, ListOutputSpacing } from './types';

/**
 * The `TextListOutput` component props
 */
interface Props extends BaseProps {
  readonly spacing?: ListOutputSpacing;
  readonly items: ListOutputItem[] | string[];
}

/**
 * Used to render a simple text list for features
 * which just output a list of name and value pairs
 *
 * @param props The component props
 * @returns The `TextListOutput` component
 */
const ListOutput: FunctionComponent<Props> = ({ spacing = 'small', items }): ReactElement<Props> => {
  // Define the map between the spacing prop and the
  // actual width to use for the name data column
  const widthMap: Record<ListOutputSpacing, string> = {
    small: 'w-24',
    medium: 'w-36',
    large: 'w-56',
  };

  return (
    <div className="flex flex-col items-start gap-y-1">
      {
        items.map((item) => {

          // If the item is a string then
          // just render it as is
          if (typeof item === 'string') {
            return (
              <pre
                className="text-xs"
                key={`list-item-${item}`}
              >
                {item}
              </pre>
            );
          }

          const { name, value } = item;
          return (
            <div
              className="flex flex-row"
              key={`list-item-${name}`}
            >
              <p className={`${widthMap[spacing]} text-xs`}>
                {name}
              </p>
              <pre className="text-xs">
                {value}
              </pre>
            </div>
          );
        })
      }
    </div>
  );
};

export default ListOutput;
