import React, { useContext } from 'react';
import styled from 'styled-components';
import { Collapse, Typography, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import { AppContext } from '../../context/AppProvider';

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
	/* get rooms: move to AppProvider to use it globally
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
	*/
	const {
		rooms,
		setIsAddRoomVisible,
		setSelectedRoomId,
	} = useContext(AppContext);

	return (
		<Collapse ghost defaultActiveKey='1'>
			<PanelStyle header='Room List' key='1'>
				{rooms.map((room) => 
					<LinkStyle
						key={room.id}
						onClick={() => setSelectedRoomId(room.id)}
					>
						{room.name}
					</LinkStyle>
				)}
				<Button
					type='text'
					className='add-room'
					icon={<PlusSquareOutlined />}
					onClick={() => setIsAddRoomVisible(true)}
				>
					Add new room
				</Button>
			</PanelStyle>
		</Collapse>
	)
}
