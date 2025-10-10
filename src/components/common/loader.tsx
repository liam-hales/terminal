'use client';

import React, { useState, useEffect, FunctionComponent, ReactElement } from 'react';
import { BaseProps } from '../../types';

/**
 * The `Loader` component props
 */
type Props = BaseProps;

/**
 * Used to render the loader which provides
 * UI during data loading
 *
 * @param props The component props
 * @returns The `Loader` component
 */
const Loader: FunctionComponent<Props> = ({ className }): ReactElement<Props> => {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  // Define the internal and frames
  // used to display the loader
  const interval = 120;
  const frames = [
    '-',
    '\\',
    '|',
    '/',
  ];

  /**
   * Used to update the frame index after a specific
   * interval everytime the frame index changes
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {

      // Increment the frame index setting it back to 0 once
      // there are no more frames to display using mod
      setFrameIndex((currentIndex) => {
        return (currentIndex + 1) % frames.length;
      });
    }, interval);

    // Clear the timeout as
    // part of the cleanup
    return () => clearTimeout(timeoutId);
  }, [
    frameIndex,
    frames.length,
  ]);

  return (
    <p className={`${className ?? ''} text-md`}>
      {frames[frameIndex]}
    </p>
  );
};

export default Loader;
