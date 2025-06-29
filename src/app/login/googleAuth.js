'use client'

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase"; // make sure this path matches your project structure

const provider = new GoogleAuthProvider();

export default function GoogleButton() {
 const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google login success:", result.user);
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      // Optional: show a toast or silently ignore
      console.info("Popup closed by user.");
    } else {
      console.error("Google login error:", error.message);
    }
  }
};

  return (
    <button
      onClick={signInWithGoogle}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Sign In With Google
    </button>
  );
}
