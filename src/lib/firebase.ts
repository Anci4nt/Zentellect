import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDV-XuGEVXfHZBBz6MSRIxpV2ZG6Pv0Wgs",
  authDomain: "edu-mind-d8827.firebaseapp.com",
  projectId: "edu-mind-d8827",
  storageBucket: "edu-mind-d8827.firebasestorage.app",
  messagingSenderId: "189808259320",
  appId: "1:189808259320:web:3d832fac2d8d6fb1f64b0d",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
