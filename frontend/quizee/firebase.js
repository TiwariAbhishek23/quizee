"use client";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter for Next.js navigation

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Create Authentication Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter(); // Next.js Router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Google Login
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
      });
      router.push("/"); // Redirect to Home after login
    } catch (error) {
      alert(error.message);
    }
  };

  // Email/Password Sign-Up
  const signUpWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName || email.split("@")[0],
        email: result.user.email,
      });
      router.push("/"); // Redirect to Home after signup
    } catch (error) {
      alert(error.message);
    }
  };

  // Email/Password Sign-In
  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        uid: result.user.uid,
        name: result.user.displayName || email.split("@")[0],
        email: result.user.email,
      });
      alert("Welcome back " + result.user.email);
      router.push("/"); // Redirect to Home after login
    } catch (error) {
      alert("Invalid email or password: " + error.message);
    }
  };

  // Sign Out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null); // Ensure UI updates
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleLogin, signUpWithEmail, signInWithEmail, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { auth, provider };
