import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFMcYIfiuECGTvLdEEGd9KqEwtJ8wg3Vk",
  authDomain: "jott-bc1d2.firebaseapp.com",
  projectId: "jott-bc1d2",
  storageBucket: "jott-bc1d2.appspot.com",
  messagingSenderId: "978026800615",
  appId: "1:978026800615:web:62f72062d681af76c28942",
  measurementId: "G-6YMMW93KQ2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);