import { FunctionComponent, ReactElement } from 'react';
import dedent from 'dedent';
import { BaseProps } from '../../types';

/**
 * The `TerminalTitle` component props
 */
type Props = BaseProps;

/**
 * Renders the "Terminal" title
 * in ASCII block text
 *
 * @returns The `TerminalTitle` component
 */
const TerminalTitle: FunctionComponent<Props> = ({ className }): ReactElement<Props> => {
  return (
    <pre className={className}>
      {
        dedent`
          ████████╗ ███████╗ ██████╗  ███╗   ███╗ ██╗ ███╗   ██╗  █████╗  ██╗
          ╚══██╔══╝ ██╔════╝ ██╔══██╗ ████╗ ████║ ██║ ████╗  ██║ ██╔══██╗ ██║
             ██║    █████╗   ██████╔╝ ██╔████╔██║ ██║ ██╔██╗ ██║ ███████║ ██║
             ██║    ██╔══╝   ██╔══██╗ ██║╚██╔╝██║ ██║ ██║╚██╗██║ ██╔══██║ ██║
             ██║    ███████╗ ██║  ██║ ██║ ╚═╝ ██║ ██║ ██║ ╚████║ ██║  ██║ ███████╗
             ╚═╝    ╚══════╝ ╚═╝  ╚═╝ ╚═╝     ╚═╝ ╚═╝ ╚═╝  ╚═══╝ ╚═╝  ╚═╝ ╚══════╝
        `
      }
    </pre>
  );
};

export default TerminalTitle;
