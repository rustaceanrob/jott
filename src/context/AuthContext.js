import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider, githubProvider } from '../config/firebase'
import { signInWithPopup, signOut, 
    signInWithEmailAndPassword, createUserWithEmailAndPassword , sendEmailVerification,
    onAuthStateChanged, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const signInEmail = (email, pw) => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, pw)
        }).catch(() => {
            throw new Error('Invalid sign-in credentials');
        })
    }

    const createEmail = (email, pw) => {
        createUserWithEmailAndPassword(auth, email, pw).then((userCredential) => {
            sendEmailVerification(userCredential.user).then(()=> {
                console.log('sent email')
            })
        }).catch(() => {
            throw new Error('Invalid sign-in credentials');
        })
    }

    const signInWithGooglePopUp = () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithPopup(auth, googleProvider)
        }).catch(() => {
            throw new Error('Invalid sign-in credentials');
        })
    }

    const signInWithGithubPopUp = () => {
        setPersistence(auth, browserLocalPersistence).then(() => {
            return signInWithPopup(auth, githubProvider)
        }).catch(() => {
            throw new Error('Invalid sign-in credentials');
        })
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
      }, [])

    return (
        <UserContext.Provider value={{user, signInWithGooglePopUp, signInWithGithubPopUp, signInEmail, createEmail, logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}