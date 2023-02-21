import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import UserInfo from './UserInfo';
import RoomList from './RoomList';

const SidebarStyle = styled.div`
	background-color: #3f0e40;
	color: white;
	height: 100vh;
`;

export default function Sidebar() {
	return (
		<SidebarStyle>
			<Row>
				<Col span={24}>
					<UserInfo />
				</Col>
				<Col span={24}>
					<RoomList />
				</Col>
			</Row>
		</SidebarStyle>
	)
}
