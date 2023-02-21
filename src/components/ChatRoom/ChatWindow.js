import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, Form, Tooltip, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import Message from './Message';

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
`;

export default function ChatWindow() {
	return (
		<WrapperStyle>
			<HeaderStyle>
				<div className='header__info'>
					<p className='header__title'>Room 1</p>
					<span className='header__description'>This is room 1</span>
				</div>
				<ButtonGroupStyle>
					<Button 
						type='text'
						icon={<UserAddOutlined />}
					>
						Add user
					</Button>
					<Avatar.Group size='small' maxCount={2}>
						<Tooltip title='A'>
							<Avatar>A</Avatar>
						</Tooltip>
						<Tooltip title='B'>
							<Avatar>B</Avatar>
						</Tooltip>
						<Tooltip title='C'>
							<Avatar>C</Avatar>
						</Tooltip>
						<Tooltip title='D'>
							<Avatar>D</Avatar>
						</Tooltip>
						<Tooltip title='E'>
							<Avatar>E</Avatar>
						</Tooltip>
					</Avatar.Group>
				</ButtonGroupStyle>
			</HeaderStyle>

			<ContentStyle>
				<MessageListStyle>
					<Message
						text='Hello'
						photoURL={null}
						displayName='Van Nguyen'
						createdAt={1676978879}
					/>
					<Message
						text='Hi friend!'
						photoURL={null}
						displayName='Ha Tran'
						createdAt={1676978899}
					/>
					<Message
						text='How are you?'
						photoURL={null}
						displayName='Van Nguyen'
						createdAt={1676978979}
					/>
					<Message
						text="I'm fine, thank you. And you?"
						photoURL={null}
						displayName='Ha Tran'
						createdAt={1676979115}
					/>
				</MessageListStyle>

				<FormStyle>
					<Input
						placeholder='Enter your message...'
						autoComplete='off'
						bordered={false}
					/>
					<Button
						type='primary'
					>
						Send
					</Button>
				</FormStyle>
			</ContentStyle>
		</WrapperStyle>
	)
}
