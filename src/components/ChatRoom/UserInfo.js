import React, { useContext } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Typography } from 'antd';

import { auth, db } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider'

const WrapperStyle = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 16px;
	border-bottom: 1px solid rgba(82, 38, 83);

	.username {
		color: white;
		margin-left: 5px;
	}
`;

export default function UserInfo() {
	const { user } = useContext(AuthContext);
	const {
		displayName,
		photoURL,
	} = user;

	return (
		<WrapperStyle>
			<div>
				<Avatar src={photoURL}>
					{photoURL ? photoURL : displayName?.charAt(0)?.toUpperCase()}
				</Avatar>
				<Typography.Text className='username'>{displayName}</Typography.Text>
			</div>
			<Button
				ghost
				onClick={() => auth.signOut()}
			>
				Log out
			</Button>
		</WrapperStyle>
	)
}
