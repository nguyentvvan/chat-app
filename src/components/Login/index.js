import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
	const handleLogin = async (provider) => {
    const data = await auth.signInWithPopup(provider);

		const {
			additionalUserInfo,
			user,
		} = data;

		if (additionalUserInfo.isNewUser) {
			addDocument('users', {
				displayName: user.displayName,
				email: additionalUserInfo.profile.email,
				photoURL: user.photoURL,
				uid: user.uid,
				providerId: additionalUserInfo.providerId,
				keywords: generateKeywords(user.displayName?.toLowerCase()),
			});
		}
  };

	return (
		<div>
			<Row justify='center' style={{ height: 800 }}>
				<Col span={8}>
					<Typography.Title style={{ textAlign: 'center' }} level={3}>Fun chat</Typography.Title>
					<Button 
						style={{ width: '100%', marginBottom: 5 }}
						onClick={() => handleLogin(ggProvider)}
					>
						Login with Google
					</Button>
					<Button
						style={{ width: '100%' }}
						onClick={() => handleLogin(fbProvider)}
					>
						Login with Facebook
					</Button>
				</Col>
			</Row>
		</div>
	)
}
