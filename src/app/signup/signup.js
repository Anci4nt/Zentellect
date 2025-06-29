"use client"

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleSignUp } from "../../lib/firebase";
import { useTheme } from '@/contexts/ThemeContext'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme()
  // Email Sign-Up
  const signUpWithEmail = async (email, password) => {
    
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up (or Sign-In if already exists)
  const signUpWithGoogle = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleSignUp);
      console.log("Google sign up success:", result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-5 bg-white dark:bg-gray-900 rounded-xl shadow-md space-y-5">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmail(email, password);
          setEmail("");
          setPassword("");
        }}
        className="space-y-4"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="flex items-center justify-center">
        <hr className="w-1/3 border-gray-300 dark:border-gray-600" />
        <span className="mx-3 text-gray-400">or</span>
        <hr className="w-1/3 border-gray-300 dark:border-gray-600" />
      </div>

      <button
        onClick={signUpWithGoogle}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition"
      >
        Sign Up with Google
      </button>
    </div>
  );
}
