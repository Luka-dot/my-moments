import React, { useEffect, useContext, useState } from 'react';
import { auth as firebaseAuth } from './firebase';

interface Auth {
    loggedIn: Boolean;
    userId?: String;
}
interface AuthInit {
    auth?: Auth;
    loading: Boolean;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

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