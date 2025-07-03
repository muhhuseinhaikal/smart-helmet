import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { firebaseConfig } from "@/config/firebase_config"

// Initialize Firebase with your configuration
const app = initializeApp(firebaseConfig)

// Initialize services
export const db = getFirestore(app)
export const auth = getAuth(app)

// Development emulator setup (optional)
if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
  try {
    connectFirestoreEmulator(db, "localhost", 8080)
    connectAuthEmulator(auth, "http://localhost:9099")
  } catch (error) {
    console.log("Emulator connection failed:", error)
  }
}

export default app
