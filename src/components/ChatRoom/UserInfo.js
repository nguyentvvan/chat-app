import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, Typography } from 'antd';

import { auth } from '../../firebase/config';

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
	return (
		<WrapperStyle>
			<div>
				<Avatar>V</Avatar>
				<Typography.Text className='username'>Van Nguyen</Typography.Text>
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
