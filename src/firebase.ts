import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

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
  //    const userrrRef = await firestore.collection('users').doc(userAuth.uid)
  //    .collection('profiles');
  
  //    const profileData ={ userId: userAuth.uid, email: userAuth.email, userName: userAuth.userName }
  //     console.log('profile Data ', profileData);
  
  //     await userrrRef.add(profileData);
    
  const snapShot = await userRef.get()
  
  if (!snapShot.exists) {
    //     const { userName, email } = userAuth;
    const createdAt = new Date();
    //      const { userName, email, pictureUrl } = additionalData.newUser;
    
    try {
      await firestore.collection(`users/${userAuth.uid}/profile`).add({
        userName: additionalData.newUser.userName,
        email: additionalData.newUser.email,
        createdAt: createdAt,
        pictureUrl: additionalData.newUser.pictureUrl
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
    }
    
    return userRef;
  };
  export const createUserProfileDocument2 = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = await firestore.doc(`users/${userAuth.uid}`);
    //    const userrrRef = await firestore.collection('users').doc(userAuth.uid)
    //    .collection('profiles');
    
    //    const profileData ={ userId: userAuth.uid, email: userAuth.email, userName: userAuth.userName }
//     console.log('profile Data ', profileData);

//     await userrrRef.add(profileData);

const snapShot = await userRef.get()

if (!snapShot.exists) {
  //     const { userName, email } = userAuth;
  const createdAt = new Date();
  //      const { userName, email, pictureUrl } = additionalData.newUser;
  
  try {
    await userRef.set({
      userName: additionalData.newUser.userName,
      email: additionalData.newUser.email,
      createdAt: createdAt,
      pictureUrl: additionalData.newUser.pictureUrl,
      isAdmin: additionalData.newUser.isAdmin,
    })
  } catch (error) {
    console.log('error creating user', error.message);
  }
}

return userRef;
};

export function addEventChatComment(eventId, comment, userId, userName) {
  const newComment = {
    displayName: userName,
    uid: userId,
    text: comment,
    date: Date.now()
  }
  // return firebase.database('https://my-moments-8b034-default-rtdb.firebaseio.com/')
  // .ref(`chat/${eventId}`).push(newComment);
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}

export function removeChatComment(commentId, eventId) {
  return firebase.database().ref(`chat/${eventId}`).child(commentId).remove()
}


export function firebaseObjectToArray(snaphot) {
  return Object.entries(snaphot).map(e => Object.assign({}, e[1], {id: e[0]}))
}


export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${eventId}`).orderByKey()
}
/*

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    match /profiles/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}

*/