import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true)
	const history = useHistory();

	useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			if (user) {
				const {
					displayName,
					email,
					uid,
					photoURL
				} = user;
				setUser({
					displayName,
					email,
					uid,
					photoURL
				});
				setIsLoading(false);
				history.push('/');
				return;
			}

			// reset user info
      setUser({});
      setIsLoading(false);
      history.push('/login');
		});
	
		return () => {
			unsubscribed();
		}
	}, [history]);

	return (
		<AuthContext.Provider value={{user}}>
			{ isLoading ? <Spin /> : children }
		</AuthContext.Provider>
	)
}

export default AuthProvider