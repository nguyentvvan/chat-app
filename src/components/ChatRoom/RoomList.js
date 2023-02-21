import React from 'react';
import styled from 'styled-components';
import { Collapse, Typography, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

// &&&: & is current class, &&& to increase priority
const PanelStyle = styled(Collapse.Panel)`
	&&& {
		.ant-collapse-header, p {
			color: white;
		}

		.ant-collapse-content-box {
			padding: 0 40px;
		}

		.add-room {
			color: white;
			padding: 0;
		}
	}
`;

const LinkStyle = styled(Typography.Link)`
	display: flex;
	margin-bottom: 5px;
`;

export default function RoomList() {
	return (
		<Collapse ghost defaultActiveKey='1'>
			<PanelStyle header='Room List' key='1'>
				<LinkStyle>Room 1</LinkStyle>
				<LinkStyle>Room 2</LinkStyle>
				<LinkStyle>Room 3</LinkStyle>
				<Button
					type='text'
					className='add-room'
					icon={<PlusSquareOutlined />}
				>
					Add new room
				</Button>
			</PanelStyle>
		</Collapse>
	)
}
