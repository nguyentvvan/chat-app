import React, { createContext, useContext, useMemo, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export function AppProvider({ children }) {
	const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
	const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
	const [selectedRoomId, setSelectedRoomId] = useState('');

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

	const selectedRoom = useMemo(
		() => rooms.find(room => room.id === selectedRoomId) || {},
		[rooms, selectedRoomId]
	);

	const usersCondition = useMemo(() => ({
		fieldName: 'uid',
		operator: 'in',
		compareValue: selectedRoom.members,
	}), [selectedRoom.members]);

	const members = useFirestore('users', usersCondition);

	const clearState = () => {
    setSelectedRoomId('');
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

	return (
		<AppContext.Provider
			value={{
				rooms,
				isAddRoomVisible,
				setIsAddRoomVisible,
				isInviteMemberVisible,
				setIsInviteMemberVisible,
				selectedRoomId,
				setSelectedRoomId,
				selectedRoom,
				members,
				clearState,
			}}
		>
			{ children }
		</AppContext.Provider>
	);
}