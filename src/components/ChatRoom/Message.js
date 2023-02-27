import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';

const WrapperStyle = styled.div`
	margin-bottom: 10px;

	.author {
		font-weight: bold;
		margin-left: 5px;
	}
	.date {
		margin-left: 10px;
		font-size: 11px;
		color: #A7A7A7;
	}
	.content {
		margin-left: 30px;
	}
`;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
	text,
	displayName,
	createdAt,
	photoURL,
}) {
	return (
		<WrapperStyle>
			<div>
				<Avatar size='small' src={photoURL}>V</Avatar>
				<Typography.Text className='author'>
					{displayName}
				</Typography.Text>
				<Typography.Text className='date'>
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
			</div>
			<div>
				<Typography.Text className='content'>{text}</Typography.Text>
			</div>
		</WrapperStyle>
	)
}
