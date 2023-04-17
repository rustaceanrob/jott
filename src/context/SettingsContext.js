// import React, { createContext, useEffect, useState } from 'react';

// export const UserSettingsContext = createContext();

// export const UserSettingsProvider = ({ children }) => {
//   const [userSettings, setUserSettings] = useState(null);

//   useEffect(() => {
//     // Get the current user's UID
//     const uid = firebase.auth().currentUser.uid;

//     // Create a reference to the user's settings document
//     const userSettingsRef = db.collection('users').doc(uid).collection('settings').doc('userSettings');

//     // Subscribe to changes in the user's settings document
//     const unsubscribe = userSettingsRef.onSnapshot((doc) => {
//       if (doc.exists) {
//         // Update the user's settings state
//         setUserSettings(doc.data());
//       } else {
//         // If the user's settings document doesn't exist, create it with default values
//         userSettingsRef.set({
//           // Default settings here
//         });
//       }
//     });

//     // Unsubscribe from changes when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserSettingsContext.Provider value={userSettings}>
//       {children}
//     </UserSettingsContext.Provider>
//   );
// };