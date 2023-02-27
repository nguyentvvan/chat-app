import React, { useContext, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Form, Tooltip, Input, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import Message from './Message';

import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebase/services';
import { useFirestore } from '../../hooks/useFirestore';

const WrapperStyle = styled.div`
	height: 100vh;
`;

const HeaderStyle = styled.div`
	height: 56px;
	display: flex;
	justify-content: space-between;
	padding: 0 16px;
	border-bottom: 1px solid rgb(230, 230, 230);
	align-items: center;

	.header {
		&__info {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		&__title {
			font-weight: bold;
			margin: 0;
		}

		&__description {
			font-size: 12px;
		}
	}
`;

const ContentStyle = styled.div`
	height: calc(100% - 56px);
	padding: 11px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

const ButtonGroupStyle = styled.div`
	display: flex;
	align-items: center;
`;

const MessageListStyle = styled.div`
	max-height: 100%;
	overflow-y: auto;
`;

const FormStyle = styled(Form)`
	display: flex;
	border: 1px solid rgb(230, 230, 230);
	border-radius: 2px;
	padding: 2px 2px 2px 0;

	.ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

export default function ChatWindow() {
	const {
		selectedRoom,
		selectedRoomId,
		members,
		setIsInviteMemberVisible,
	} = useContext(AppContext);
	const {
		user: {
			uid,
			photoURL,
			displayName,
		},
	} = useContext(AuthContext);
	const inputRef = useRef(null);
	const messageListRef = useRef(null);
	const [form] = Form.useForm();

	const handleOnSubmit = () => {
		addDocument('messages', {
      text: inputRef.current.input.value,
      uid,
      photoURL,
      roomId: selectedRoomId,
      displayName,
    });

		form.resetFields(['message']);

		// focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
	};

	const condition = useMemo(() => ({
		fieldName: 'roomId',
		operator: '==',
		compareValue: selectedRoomId,
	}), [selectedRoomId]);

	const messages = useFirestore('messages', condition);

	useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

	return (
		<WrapperStyle>
		{selectedRoomId ? (
			<>
				<HeaderStyle>
					<div className='header__info'>
						<p className='header__title'>{selectedRoom.name}</p>
						<span className='header__description'>{selectedRoom.description}</span>
					</div>
					<ButtonGroupStyle>
						<Button 
							type='text'
							icon={<UserAddOutlined />}
							onClick={() => setIsInviteMemberVisible(true)}
						>
							Add user
						</Button>
						<Avatar.Group size='small' maxCount={2}>
							{members.map((member) => (
								<Tooltip title={member.displayName} key={member.id}>
									<Avatar src={member.photoURL}>
										{member.photoURL ? member.photoURL : member.displayName?.charAt(0)?.toUpperCase()}
									</Avatar>
								</Tooltip>
							))}
						</Avatar.Group>
					</ButtonGroupStyle>
				</HeaderStyle>

				<ContentStyle>
					<MessageListStyle ref={messageListRef}>
					{messages.map((message) => (
						<Message
							key={message.id}
							text={message.text}
							photoURL={message.photoURL}
							displayName={message.displayName}
							createdAt={message.createdAt}
						/>))}
					</MessageListStyle>

					<FormStyle form={form}>
						<Form.Item name='message'>
							<Input
								ref={inputRef}
								onPressEnter={handleOnSubmit}
								placeholder='Enter your message...'
								autoComplete='off'
								bordered={false}
							/>
						</Form.Item>
						<Button
							type='primary'
							onClick={handleOnSubmit}
						>
							Send
						</Button>
					</FormStyle>
				</ContentStyle>
			</>
		) : (
			<Alert
				message='Select chat room'
				type='info'
				showIcon
				style={{ margin: 5 }}
				// closable
			/>
		)}
		</WrapperStyle>
	)
}
