"use client"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleSignUp } from "../../lib/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email Sign-Up
  const signUpWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  // Google Sign-Up (or Sign-In if already exists)
  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleSignUp);
      console.log("Google sign up success:", result.user);
    } catch (error) {
      console.error("Google sign up error:", error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmail(email, password);
          setEmail("");
          setPassword("");
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Sign Up</button>
      </form>

      <hr />

      <button onClick={signUpWithGoogle}>Sign Up with Google</button>
    </div>
  );
}
