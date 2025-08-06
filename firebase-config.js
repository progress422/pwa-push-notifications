// Firebase Configuration
// Replace these values with your actual Firebase project configuration
// You can find these in your Firebase Console -> Project Settings -> General tab

export const firebaseConfig = {
    apiKey: "AIzaSyB0iuZzabjCGefy9OokK6UFxOvF6jJaTAU",
    authDomain: "push-notifications-test-4bdb0.firebaseapp.com",
    projectId: "push-notifications-test-4bdb0",
    storageBucket: "push-notifications-test-4bdb0.firebasestorage.app",
    messagingSenderId: "158709240339",
    appId: "1:158709240339:web:e5b363e9773e5abed1e5e6"
};

// VAPID Key for Web Push
// You can generate this in Firebase Console -> Project Settings -> Cloud Messaging tab
export const vapidKey = "BMuqicDEKYewQecSiObnuJ8cV2Gd3E8lOSzE8wrTaBtTMuR6-66N4z3abqmxJZQ84U7VcXT08PaRHjp3Gk4f00o";

// Instructions for getting your Firebase configuration:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project (or create a new one)
// 3. Click on the gear icon (Settings) -> Project settings
// 4. Scroll down to "Your apps" section
// 5. Click on the web app icon or "Add app" if you haven't created a web app
// 6. Copy the configuration object
// 7. For VAPID key: Go to Cloud Messaging tab and generate/copy the Web Push certificates key

// Example of what your config should look like:
/*
export const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "my-pwa-project.firebaseapp.com",
  projectId: "my-pwa-project",
  storageBucket: "my-pwa-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

export const vapidKey = "BFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
*/ 