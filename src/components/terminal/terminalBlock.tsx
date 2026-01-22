import { FunctionComponent, ReactElement } from 'react';
import { TerminalFeatureBlock, TerminalValidationErrorBlock, TerminalErrorBlock } from '../';
import {
  BaseProps,
  TerminalFeatureBlock as FeatureBlock,
  TerminalValidationErrorBlock as ValidationErrorBlock,
  TerminalErrorBlock as ErrorBlock,
} from '../../types';

/**
 * The `TerminalBlock` component props
 */
type Props = BaseProps
  & (
    | Omit<FeatureBlock, 'id'>
    | Omit<ValidationErrorBlock, 'id'>
    | Omit<ErrorBlock, 'id'>
  );

/**
 * Used to render each type
 * of terminal block
 *
 * @param props The component props
 * @returns The `TerminalBlock` component
 */
const TerminalBlock: FunctionComponent<Props> = (props): ReactElement<Props> => {
  const { type } = props;

  // Switch for the block type
  // and render each type of block
  switch (type) {

    case 'feature': {
      return <TerminalFeatureBlock {...props} />;
    }

    case 'validation-error': {
      return <TerminalValidationErrorBlock {...props} />;
    }

    case 'error': {
      return <TerminalErrorBlock {...props} />;
    }

    default: {
      throw new Error(`Unknown block type "${type}"`);
    }
  }
};

export default TerminalBlock;
