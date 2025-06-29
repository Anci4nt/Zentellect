"use client"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {auth} from "../../lib/firebase"// Don't forget to import `auth`

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // ❗ FIXED: missing parentheses!
        login(email, password);
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
        type="password" // ❗ FIXED: was "Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
