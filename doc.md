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

=======================
# environment variables
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