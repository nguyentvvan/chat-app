import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Form, Modal, Select, Avatar, Spin } from 'antd';
import { debounce } from 'lodash';

import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';

function DebounceSelect({
	debounceTimeout = 300,
	curMembers,
	fetchOptions,
	...props
}) {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState([]);

	const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

	useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

	return (
		<Select
			labelInValue
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size='small' /> : null}
			{...props}
		>
			{options?.map((opt) => (
				<Select.Option key={opt.value} value={opt.value} title={opt.label}>
					<Avatar size='small' src={opt.photoURL}>
						{opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
					</Avatar>
					{` ${opt.label}`}
				</Select.Option>
			))}
		</Select>
	);
}

async function fetchUserList(search, curMembers) {
	return db
    .collection('users')
    .where('keywords', 'array-contains', search?.toLowerCase())
    .orderBy('displayName')
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
			.filter((opt) => !curMembers.includes(opt.value));
    });
}

export default function InviteMemberModal() {
	const {
		isInviteMemberVisible,
		setIsInviteMemberVisible,
		selectedRoom,
		selectedRoomId,
	} = useContext(AppContext);
	const [value, setValue] = useState([]);
	const [form] = Form.useForm();
	
	const handleOk = () => {
		// reset form value
    form.resetFields();
    setValue([]);

		// update members in current room
		const roomRef = db.collection('rooms').doc(selectedRoomId);

		roomRef.update({
			members: [...selectedRoom.members, ...value.map((val) => val.value)],
		});

		setIsInviteMemberVisible(false);
	};

	const handleCancel = () => {
		form.resetFields();
		setValue([]);
		setIsInviteMemberVisible(false);
	};

	return (
		<div>
			<Modal
				title="Invite member"
				open={isInviteMemberVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout='vertical'>
					<DebounceSelect
						mode='multiple'
						name='search-user'
						label='Users'
						placeholder='Enter username'
						value={value}
						onChange={(newValue) => setValue(newValue)}
						style={{ width: '100%' }}
						fetchOptions={fetchUserList}
						curMembers={selectedRoom.members}
					/>
				</Form>
			</Modal>
		</div>
	)
}
