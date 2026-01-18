import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, FeatureId } from '../../types';
import { Help, CommandHelp } from '..';

/**
 * The `HelpFeature` component props
 */
interface Props extends BaseProps {
  readonly featureId?: FeatureId;
}

/**
 * Used to render the user interface
 * for the help feature
 *
 * @param props The component props
 * @returns The `HelpFeature` component
 */
const HelpFeature: FunctionComponent<Props> = ({ featureId }): ReactElement<Props> => {

  // Render the correct help component depending
  // on if the `featureId` prop was passed
  return (featureId != null)
    ? <CommandHelp featureId={featureId} />
    : <Help />;
};

export default HelpFeature;
