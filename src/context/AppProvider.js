import React, { createContext, useContext, useMemo } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export function AppProvider({ children }) {
	const { user: { uid } } = useContext(AuthContext);

	// object condition will be changed every re-render
	// => the useEffect will re-run unnecessary 
	// => use useMemo
	const roomsCondition = useMemo(() => ({
		fieldName: 'members',
		operator: 'array-contains',
		compareValue: uid,
	}), [uid]);

	const rooms = useFirestore('rooms', roomsCondition);

	return (
		<AppContext.Provider value={{rooms}}>
			{ children }
		</AppContext.Provider>
	);
}