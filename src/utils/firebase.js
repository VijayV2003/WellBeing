import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/messaging";
import "firebase/compat/storage";
import "firebase/compat/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCkUXuxXFaWMI8sz0rol088ZWKCCr0dndA",
  authDomain: "mindfulme-5cdff.firebaseapp.com",
  projectId: "mindfulme-5cdff",
  storageBucket: "mindfulme-5cdff.firebasestorage.app",
  messagingSenderId: "424387163203",
  appId: "1:424387163203:web:27a33b3a3d70d51cda90f6",
  measurementId: "G-V2NJG8SYF3"
});

// Initialize Firebase
const analytics = firebase.analytics();
const messaging = firebase.messaging();
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// Enable Firestore persistence
app.firestore().enablePersistence().catch((err) => {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('Firestore persistence failed: multiple tabs open');
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Firestore persistence is not supported by this browser');
    }
});
export default app;
export { messaging, analytics };
