import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';

/**
 * The `ProgressBar` component props
 */
interface Props extends BaseProps {
  readonly percentage: number;
}

/**
 * Used to render a progress bar to
 * display progress for some action
 *
 * @example
 * [#########_______] 52%
 *
 * @param percentage
 * @constructor
 */
const ProgressBar: FunctionComponent<Props> = ({ percentage }): ReactElement<Props> => {

  // Calculate the `#` and `_` characters
  // to use to display the progress bar
  const total = 75;
  const filled = Math.round((percentage / 100) * total);
  const empty = total - filled;

  return (
    <div className="flex flex-row gap-4 pt-4">
      <p className="font-mono text-white text-sm">
        {`[${'#'.repeat(filled)}${'_'.repeat(empty)}]`}
      </p>
      <p className="font-mono text-white text-sm">
        {`${percentage}%`}
      </p>
    </div>
  );
};

export default ProgressBar;
