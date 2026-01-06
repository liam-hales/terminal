import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../types';
import { ListOutputGroup, ListOutputSpacing } from './types';
import { ListOutput } from './';

/**
 * The `GroupedTextListOutput` component props
 */
interface Props extends BaseProps {
  readonly spacing?: ListOutputSpacing;
  readonly groups: ListOutputGroup[];
}

/**
 * Used to render a simple grouped text list for features
 * which just output a list of grouped name and value pairs
 *
 * @param props The component props
 * @returns The `GroupedTextListOutput` component
 */
const GroupedListOutput: FunctionComponent<Props> = ({ spacing, groups }): ReactElement<Props> => {
  return (
    <div className="flex flex-col items-start gap-y-6">
      {
        groups.map((group, index) => {
          const { items } = group;

          return (
            <ListOutput
              key={`text-list-group-${index}`}
              spacing={spacing}
              items={items}
            />
          );
        })
      }
    </div>
  );
};

export default GroupedListOutput;
