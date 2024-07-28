'use client';

import { FunctionComponent, ReactElement } from 'react';
import TypewriterEffect, { TypewriterClass } from 'typewriter-effect';
import { BaseProps } from '../../types';

/**
 * The `Typewriter` component props
 */
interface Props extends BaseProps {
  readonly onInit: (typewriter: TypewriterClass) => void;
}

/**
 * Used to render the typewriter text effect
 * using `typewriter-effect` under the hood
 *
 * @param props The component props
 * @returns The `Typewriter` component
 */
const Typewriter: FunctionComponent<Props> = ({ className, onInit }): ReactElement<Props> => {
  return (
    <div className={`${className} [&>div>.TypewriterCursor]:font-normal [&>div>.TypewriterCursor]:animate-cursor`}>
      <TypewriterEffect
        onInit={onInit}
        options={{
          cursor: '_',
          deleteSpeed: 30,
          wrapperClassName: 'TypewriterWrapper',
          cursorClassName: 'TypewriterCursor',
        }}
      />
    </div>
  );
};

export default Typewriter;
