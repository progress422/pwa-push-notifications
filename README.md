# PWA Push Notifications App

A Progressive Web App (PWA) that receives push notifications from Firebase Cloud Messaging (FCM) and displays native notifications on devices.

## Features

- 📱 **Progressive Web App** - Installable on mobile and desktop devices
- 🔔 **Push Notifications** - Receive notifications via Firebase Cloud Messaging
- 🎨 **Modern UI** - Clean, responsive design with gradient backgrounds
- 📱 **Native-like Experience** - Works offline and can be installed like a native app
- 🔧 **Easy Configuration** - Simple setup with Firebase
- 📊 **Notification Logging** - View notification history and debug information

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd pwa-push-notifications
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Cloud Messaging** in your project
4. Go to **Project Settings** → **General** tab
5. Scroll down to "Your apps" and add a web app
6. Copy the Firebase configuration

### 3. Configure the App

Edit the following files with your Firebase configuration:

**firebase-config.js:**
```javascript
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "your-app-id"
};

export const vapidKey = "your-vapid-key";
```

**firebase-messaging-sw.js:**
Update the `firebaseConfig` object with the same values.

**app.js:**
Update the `firebaseConfig` and `vapidKey` variables.

### 4. Get VAPID Key

1. In Firebase Console, go to **Project Settings** → **Cloud Messaging** tab
2. Scroll down to **Web Push certificates**
3. Generate a new key pair or use existing one
4. Copy the **Key pair** value (starts with "B...")

### 5. Generate Icons

1. Open `icons/create-icons.html` in your browser
2. Click "Generate All Icons"
3. Save the downloaded PNG files to the `icons/` directory
4. Make sure all required icon sizes are present:
   - icon-72x72.png
   - icon-96x96.png
   - icon-128x128.png
   - icon-144x144.png
   - icon-152x152.png
   - icon-192x192.png
   - icon-384x384.png
   - icon-512x512.png

## Local Development

### Using Python (Recommended)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -SimpleHTTPServer 8000
```

### Using Node.js

```bash
npx http-server -p 8000
```

### Using PHP

```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

**Important:** PWAs require HTTPS in production. For local development, `localhost` is treated as secure.

## Deployment

### GitLab Pages (Automatic)

1. Push your code to GitLab
2. The `.gitlab-ci.yml` file will automatically deploy to GitLab Pages
3. Your app will be available at `https://username.gitlab.io/repository-name`

### Manual Deployment

1. Upload all files to your web server
2. Ensure HTTPS is enabled (required for PWAs)
3. Configure your server to serve the correct MIME types:
   - `.webmanifest` → `application/manifest+json`
   - `.json` → `application/json`

## Testing Push Notifications

### 1. Subscribe to Notifications

1. Open your PWA
2. Click "Subscribe to Notifications"
3. Grant notification permission when prompted
4. Copy the FCM token from the "Subscription Details" section

### 2. Send Test Notifications

#### Using Firebase Console

1. Go to Firebase Console → **Cloud Messaging**
2. Click **Send your first message**
3. Enter title and body
4. Click **Send test message**
5. Paste your FCM token
6. Click **Test**

#### Using curl

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "YOUR_FCM_TOKEN",
    "notification": {
      "title": "Test Notification",
      "body": "This is a test message",
      "icon": "/icons/icon-192x192.png"
    }
  }'
```

#### Using Postman

1. **Method:** POST
2. **URL:** `https://fcm.googleapis.com/fcm/send`
3. **Headers:**
   - `Authorization: key=YOUR_SERVER_KEY`
   - `Content-Type: application/json`
4. **Body (JSON):**
```json
{
  "to": "YOUR_FCM_TOKEN",
  "notification": {
    "title": "Test Notification",
    "body": "This is a test message",
    "icon": "/icons/icon-192x192.png"
  }
}
```

## PWABuilder Integration

To convert your PWA to an Android APK:

1. Deploy your PWA to a public HTTPS URL
2. Go to [PWABuilder](https://www.pwabuilder.com/)
3. Enter your PWA URL
4. Click "Start" and follow the wizard
5. Download the generated APK
6. Install on your Android device

### PWA Requirements for PWABuilder

✅ **HTTPS** - Required for PWAs  
✅ **Web App Manifest** - `manifest.json` with required fields  
✅ **Service Worker** - `firebase-messaging-sw.js`  
✅ **Icons** - Multiple sizes for different devices  
✅ **Responsive Design** - Works on mobile and desktop  

## File Structure

```
pwa-push-notifications/
├── index.html              # Main HTML file
├── app.js                 # Main application logic
├── firebase-messaging-sw.js # Service worker for push notifications
├── firebase-config.js     # Firebase configuration
├── manifest.json          # PWA manifest
├── styles.css            # Application styles
├── .gitlab-ci.yml        # GitLab CI/CD configuration
├── README.md             # This file
├── generate-icons.html   # Icon generator (for development)
└── icons/                # PWA icons directory
    ├── create-icons.html # Icon generator tool
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## Troubleshooting

### Notifications Not Working

1. **Check HTTPS**: PWAs require HTTPS in production
2. **Verify Configuration**: Ensure Firebase config is correct
3. **Check Permissions**: Verify notification permission is granted
4. **Console Errors**: Check browser developer console for errors
5. **Service Worker**: Ensure service worker is registered correctly

### PWA Not Installing

1. **Manifest Issues**: Validate your `manifest.json`
2. **HTTPS Required**: Ensure site is served over HTTPS
3. **Icons Missing**: Check that all required icons exist
4. **Service Worker**: Must be registered and working

### Push Notifications Not Received

1. **Background Sync**: Test both foreground and background scenarios
2. **Token Issues**: Ensure FCM token is valid and current
3. **Server Key**: Verify Firebase server key is correct
4. **Payload Format**: Check notification payload structure

## Browser Support

- ✅ Chrome 42+
- ✅ Firefox 44+
- ✅ Safari 11.1+
- ✅ Edge 17+
- ✅ Opera 29+
- ✅ Samsung Internet 4.0+

## Security Considerations

- Always use HTTPS in production
- Keep Firebase server keys secure
- Validate notification payloads
- Implement proper error handling
- Consider rate limiting for notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify Firebase configuration
4. Test with different browsers/devices

---

**Happy coding! 🚀** 