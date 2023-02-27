import { Form, Input, Modal } from 'antd';
import React, { useContext } from 'react';

import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebase/services';

export default function AddRoomModal() {
	const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
	const { user: { uid } } = useContext(AuthContext);
	const [ form ] = Form.useForm();
	
	const handleOk = () => {
		addDocument('rooms', {
			...form.getFieldsValue(),
			members: [uid]
		});
		form.resetFields();
		setIsAddRoomVisible(false);
	};
	const handleCancel = () => {
		form.resetFields();
		setIsAddRoomVisible(false);
	};
	return (
		<div>
			<Modal
				title="Create Room"
				open={isAddRoomVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout='vertical'>
					<Form.Item label='Name' name='name'>
						<Input
							placeholder='Enter room name'
						/>
					</Form.Item>
					<Form.Item label='Description' name='description'>
						<Input.TextArea
							placeholder='Enter room description'
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}
