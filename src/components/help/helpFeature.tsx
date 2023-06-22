import { FunctionComponent, ReactElement } from 'react';
import { BaseProps, Command } from '../../types';
import { Help, CommandHelp } from '..';

/**
 * The `HelpFeature` component props
 */
interface Props extends BaseProps {
  readonly command?: Command;
}

/**
 * Used to render the user interface
 * for the help feature
 *
 * @param props The component props
 * @returns The `HelpFeature` component
 */
const HelpFeature: FunctionComponent<Props> = ({ command }): ReactElement<Props> => {

  // Render the correct help component depending
  // on if the `command` prop was passed
  return (command != null)
    ? <CommandHelp command={command} />
    : <Help />;
};

export default HelpFeature;
