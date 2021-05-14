import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDR_ID,
    appId: process.env.REACT_APP_APP_ID
    };

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
   const userRef = await firestore.doc(`profiles/${userAuth.uid}`);
  
    const snapShot = await userRef.get()
    console.log('snapshot ', snapShot)
    if (!snapShot.exists) {
      const { userName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          userName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };