import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import firebase, { auth } from '../../firebase/config';

const fbProvider = new firebase.auth.FacebookAuthProvider();
// const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
	const handleGoogleLogin = () => {
    // auth.signInWithPopup(ggProvider);
  };

	const handleFacebookLogin = async () => {
    const data = await auth.signInWithPopup(fbProvider);
		console.log({data});
  };

	return (
		<div>
			<Row justify='center' style={{ height: 800 }}>
				<Col span={8}>
					<Typography.Title style={{ textAlign: 'center' }} level={3}>Fun chat</Typography.Title>
					<Button 
						style={{ width: '100%', marginBottom: 5 }}
						onClick={handleGoogleLogin}
					>
						Login with Google
					</Button>
					<Button
						style={{ width: '100%' }}
						onClick={handleFacebookLogin}
					>
						Login with Facebook
					</Button>
				</Col>
			</Row>
		</div>
	)
}
