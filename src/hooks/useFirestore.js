import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFirestore = (collection, condition) => {
	const [documents, setDocuments] = useState([]);
	
	useEffect(() => {
		let collectionRef = db.collection(collection).orderBy('createdAt');
		
		if (condition && condition.compareValue && condition.compareValue.length) {
			// collectionRef.where(
			// 	"name", // field name
			// 	"==", // condition operator: == / in
			// 	"Van", // compare value => where name='Van'
			// );

			collectionRef = collectionRef.where(
				condition.fieldName,
				condition.operator,
				condition.compareValue,
			);
		}

		// every time collection users 's changed
		const unsubscribe = collectionRef.onSnapshot((snapshot) => {
			const data = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));

			setDocuments(data);

			return unsubscribe;
		});
	
	}, [collection, condition]);
	
	return documents;
};