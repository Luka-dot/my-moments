import React, { useEffect, useContext, useState } from 'react';
import { auth as firebaseAuth } from './firebase';
import { firestore } from "./firebase";
import { toAccount, Account } from './Models';

interface Auth {
    loggedIn: Boolean;
    userId?: String;
    userName?: string;
    pictureUrl?: string;
}
interface AuthInit {
    auth?: Auth;
    loading: Boolean;
    userName?: string;
    pictureUrl?: string;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false, userName: '' });

export function useAuth(): Auth {
    return useContext(AuthContext)
};

export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({
        loading: true,
      });
    
      useEffect(() => {
        // firebase.auth().onAuthStateChanged((user) => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            const auth = firebaseUser ? { loggedIn: true, userId: firebaseUser.uid } : { loggedIn: false };
            setAuthInit({ loading: false, auth });
        });
      }, []);

      return authInit
};

export function useDeatilsInit(id): Auth {
    const [userDetails, setuserDetails] = useState<Auth>({
        loggedIn: false,
    });
    
      useEffect(() => {
        const entryRef = firestore
      .collection("users")
      .doc(id)
    entryRef.get().then((doc) => {
      setuserDetails(toAccount(doc) as any);
    });

        // firebase.auth().onAuthStateChanged((user) => {
        // return firebaseAuth.onAuthStateChanged((firebaseUser) => {
        //     const auth = firebaseUser ? { loggedIn: true, userId: firebaseUser.uid } : { loggedIn: false };
        //     setuserDetails({ loggedIn: true });
        // });
      }, []);

      return userDetails
};