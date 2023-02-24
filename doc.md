npx create-react-app chat-app-holetex
npm i --save antd @ant-design/icons date-fns lodash firebase style-components react-router-dom

grid in antd: flex
<Row justify='center'>
<Col> in 'antd' is separated into 24 cols
<Col span={8}> => 8/24

<Title level={3}> => <h3></h3>

Design layout and config firebase, fb app

push code into github

Config firestore in firebase (create db in firestore)
firebase uses collections


=======================
# environment variables (have to add these in the vercel)
1. Add prefix `REACT_APP_` on React environment variables.
apiKey: process.env.REACT_APP_API_KEY

2. Make sure .env file is in the root directory.
src/
.env
.gitignore
package.json
package-lock.json

3. Restart the development server after making changes in .env file.

4. Copy only the value inside the quotation marks and don't forget to remove trailing commas(It haunted me for several hours). These examples will give you an error.
REACT_APP_API_KEY=Ach2o1invVocSn25FcQhash209,
REACT_APP_API_KEY="Ach2o1invVocSn25FcQhash209",
REACT_APP_API_KEY="Ach2o1invVocSn25FcQhash209"
=======================
# using vercel
- add env
- add firebase Authorized domains

==================

user.additionalUserInfo.isNewUser : user is already existing in db?

useEffect(() => {
		// every time collection users 's changed
		db.collection('users').onSnapshot((snapshot) => {
			const data = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));

			console.log({data, snapshot, docs: snapshot.docs});
		});
	}, [])

===================
# set up firebase emulator
npm i -g firebase-tools
create folder ./emulators
cd emulators
firebase login
firebase init
<select features emulator, firestore> enter
<select use an existing project> enter
<select our app> enter
<enter file to store rule> enter (use default)
<select firestore rules: Authentication, Firestore> enter
<enter port for authentication> enter (use default 9099)
<enter port for firestore> enter (use default 8080)
<enable emulator UI> Y
<enter port for  UI> enter (use default any)
<download emulator> Y

firebase emulators:start
(install java)

fix config file
```javascript
const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://127.0.0.1:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator('127.0.0.1', 8080);
}
```
