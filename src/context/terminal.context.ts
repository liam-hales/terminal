import { createContext } from 'react';
import { TerminalActions, TerminalState } from './types';

/**
 * Used to represent the terminal context which can be provided with a
 * value using `.Provider` and consumed using the `useContext` hook.
 *
 * _**WARNING:** This context does not store or hold any state_
 */
const TerminalContext = createContext<TerminalState & TerminalActions | undefined>(undefined);

export default TerminalContext;
