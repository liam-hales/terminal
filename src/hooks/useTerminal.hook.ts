import { useContext } from 'react';
import { TerminalContext } from '../context';
import { TerminalActions, TerminalState } from '../context/types';

/**
 * Used to access the `TerminalContext` value
 * provided by the `TerminalProvider`
 *
 * @returns The terminal context value
 */
const useTerminal = (): TerminalState & TerminalActions => {

  // Check if the context value exists, if not then this
  // hook is being used outside of it's provider
  const context = useContext(TerminalContext);
  if (context == null) {
    throw new Error('The "useTerminal" hook must be used within "TerminalProvider"');
  }

  return context;
};

export default useTerminal;
