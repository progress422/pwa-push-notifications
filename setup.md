# Quick Setup Guide

## Before You Deploy

### 1. Update Firebase Configuration

Replace the placeholder values in these files:

**app.js** (lines 2-9):
```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "your-app-id"
};
```

**firebase-messaging-sw.js** (lines 5-12):
```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "your-app-id"
};
```

**app.js** (line 18):
```javascript
const vapidKey = "YOUR_ACTUAL_VAPID_KEY";
```

**firebase-messaging-sw.js** (needs vapidKey - add after firebaseConfig):
```javascript
const vapidKey = "YOUR_ACTUAL_VAPID_KEY";
```

### 2. Generate Icons

1. Open `icons/create-icons.html` in your browser
2. Click "Generate All Icons"
3. Save all 8 PNG files to the `icons/` folder

### 3. Test Locally

```bash
python -m http.server 8000
# or
npx http-server -p 8000
```

Open `http://localhost:8000`

### 4. Deploy to GitLab

1. Create a new GitLab repository
2. Push all files to the repository
3. GitLab Pages will automatically deploy your PWA
4. Access it at: `https://your-username.gitlab.io/repository-name`

### 5. Test with PWABuilder

1. Go to https://www.pwabuilder.com/
2. Enter your GitLab Pages URL
3. Generate APK for Android

## Firebase Console Steps

1. Go to https://console.firebase.google.com/
2. Create/select project
3. Go to Project Settings → General → Your apps → Add web app
4. Copy the configuration object
5. Go to Project Settings → Cloud Messaging → Web Push certificates
6. Generate key pair and copy the key

That's it! Your PWA is ready for deployment. 🚀 