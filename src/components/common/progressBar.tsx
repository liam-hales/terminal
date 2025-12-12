import { FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';

/**
 * The `ProgressBar` component props
 */
interface Props extends BaseProps {
  readonly percentage: number;
  readonly message?: string;
}

/**
 * Used to render a progress bar to
 * display progress for some action
 *
 * @example
 * [#########_______] 52%
 *
 * @example
 * Message [###########_____] 62%
 *
 * @param props The component props
 * @returns The `ProgressBar` component
 */
const ProgressBar: FunctionComponent<Props> = ({ percentage, message }): ReactElement<Props> => {

  // Calculate the `#` and `_` characters
  // to use to display the progress bar
  const total = 75;
  const filled = Math.round((percentage / 100) * total);
  const empty = total - filled;

  return (
    <div className="flex flex-row gap-x-4">
      {
        (message != null) && (
          <p className="shrink-0 text-xs">
            {message}
          </p>
        )
      }
      <p className="text-xs">
        {`[${'#'.repeat(filled)}${'_'.repeat(empty)}]`}
      </p>
      <p className="text-xs">
        {`${percentage.toFixed((2))}%`}
      </p>
    </div>
  );
};

export default ProgressBar;
