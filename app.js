// Firebase configuration - Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB0iuZzabjCGefy9OokK6UFxOvF6jJaTAU",
    authDomain: "push-notifications-test-4bdb0.firebaseapp.com",
    projectId: "push-notifications-test-4bdb0",
    storageBucket: "push-notifications-test-4bdb0.firebasestorage.app",
    messagingSenderId: "158709240339",
    appId: "1:158709240339:web:e5b363e9773e5abed1e5e6"
};

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// VAPID key - Replace with your actual VAPID key
const vapidKey = "BMuqicDEKYewQecSiObnuJ8cV2Gd3E8lOSzE8wrTaBtTMuR6-66N4z3abqmxJZQ84U7VcXT08PaRHjp3Gk4f00o";

// DOM elements
const subscribeBtn = document.getElementById('subscribe-btn');
const unsubscribeBtn = document.getElementById('unsubscribe-btn');
const testNotificationBtn = document.getElementById('test-notification-btn');
const notificationStatus = document.getElementById('notification-status');
const subscriptionDetails = document.getElementById('subscription-details');
const notificationLog = document.getElementById('notification-log');

// State
let currentToken = null;
let isSubscribed = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initializePWAApp();
});

async function initializePWAApp() {
  try {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      updateStatus('Notifications are not supported in this browser.', 'error');
      return;
    }

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      updateStatus('Service Workers are not supported in this browser.', 'error');
      return;
    }

    // Register service worker
    await registerServiceWorker();
    
    // Check current notification permission
    await checkNotificationPermission();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for existing token
    await checkExistingToken();
    
  } catch (error) {
    console.error('Error initializing app:', error);
    updateStatus('Error initializing application: ' + error.message, 'error');
  }
}

async function registerServiceWorker() {
  try {
    // Use relative path for better compatibility with different hosting environments
    const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js');
    console.log('Service Worker registered successfully:', registration);
    updateStatus('Service Worker registered successfully', 'success');
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    updateStatus('Service Worker registration failed: ' + error.message, 'error');
    throw error;
  }
}

async function checkNotificationPermission() {
  const permission = Notification.permission;
  console.log('Notification permission:', permission);
  
  switch (permission) {
    case 'granted':
      updateStatus('Notification permission granted', 'success');
      subscribeBtn.disabled = false;
      break;
    case 'denied':
      updateStatus('Notification permission denied', 'error');
      subscribeBtn.disabled = true;
      break;
    case 'default':
      updateStatus('Notification permission not requested yet', 'warning');
      subscribeBtn.disabled = false;
      break;
  }
}

async function checkExistingToken() {
  try {
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      console.log('Existing FCM token:', token);
      currentToken = token;
      isSubscribed = true;
      updateSubscriptionUI();
      updateSubscriptionDetails(token);
    } else {
      console.log('No existing FCM token');
      updateSubscriptionDetails('No subscription active');
    }
  } catch (error) {
    console.error('Error checking existing token:', error);
  }
}

function setupEventListeners() {
  subscribeBtn.addEventListener('click', subscribeToNotifications);
  unsubscribeBtn.addEventListener('click', unsubscribeFromNotifications);
  testNotificationBtn.addEventListener('click', testLocalNotification);
  
  // Handle foreground messages
  onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    logNotification('Foreground message received', payload);
    
    // Show notification even when app is in foreground
    if (payload.notification) {
      showLocalNotification(
        payload.notification.title || 'New Message',
        payload.notification.body || 'You have a new message',
        payload.notification.icon
      );
    }
  });
}

async function subscribeToNotifications() {
  try {
    subscribeBtn.disabled = true;
    subscribeBtn.innerHTML = '<div class="loading"></div> Subscribing...';
    
    // Request notification permission
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      throw new Error('Notification permission denied');
    }
    
    // Get FCM token
    const token = await getToken(messaging, { vapidKey });
    
    if (token) {
      console.log('FCM token:', token);
      currentToken = token;
      isSubscribed = true;
      
      updateStatus('Successfully subscribed to notifications!', 'success');
      updateSubscriptionUI();
      updateSubscriptionDetails(token);
      logNotification('Subscribed successfully', { token });
      
      // Here you would typically send the token to your server
      // await sendTokenToServer(token);
      
    } else {
      throw new Error('No registration token available');
    }
    
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    updateStatus('Failed to subscribe: ' + error.message, 'error');
    logNotification('Subscription failed', { error: error.message });
  } finally {
    subscribeBtn.disabled = false;
    subscribeBtn.textContent = 'Subscribe to Notifications';
  }
}

async function unsubscribeFromNotifications() {
  try {
    unsubscribeBtn.disabled = true;
    unsubscribeBtn.innerHTML = '<div class="loading"></div> Unsubscribing...';
    
    // Here you would typically remove the token from your server
    // await removeTokenFromServer(currentToken);
    
    currentToken = null;
    isSubscribed = false;
    
    updateStatus('Successfully unsubscribed from notifications', 'success');
    updateSubscriptionUI();
    updateSubscriptionDetails('No subscription active');
    logNotification('Unsubscribed successfully', {});
    
  } catch (error) {
    console.error('Error unsubscribing:', error);
    updateStatus('Failed to unsubscribe: ' + error.message, 'error');
  } finally {
    unsubscribeBtn.disabled = false;
    unsubscribeBtn.textContent = 'Unsubscribe';
  }
}

function testLocalNotification() {
  if (Notification.permission === 'granted') {
    showLocalNotification(
      'Test Notification',
      'This is a test notification from your PWA!',
      './icons/icon-192x192.png'
    );
    logNotification('Test notification sent', {});
  } else {
    updateStatus('Please grant notification permission first', 'warning');
  }
}

function showLocalNotification(title, body, icon) {
  const options = {
    body: body,
    icon: icon || './icons/icon-192x192.png',
    badge: './icons/icon-72x72.png',
    tag: 'local-notification',
    requireInteraction: false,
    timestamp: Date.now()
  };
  
  const notification = new Notification(title, options);
  
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
  
  // Auto close after 5 seconds
  setTimeout(() => {
    notification.close();
  }, 5000);
}

function updateStatus(message, type = 'info') {
  notificationStatus.innerHTML = `<p>${message}</p>`;
  notificationStatus.className = `status ${type}`;
}

function updateSubscriptionUI() {
  if (isSubscribed) {
    subscribeBtn.disabled = true;
    subscribeBtn.textContent = 'Already Subscribed';
    unsubscribeBtn.disabled = false;
  } else {
    subscribeBtn.disabled = false;
    subscribeBtn.textContent = 'Subscribe to Notifications';
    unsubscribeBtn.disabled = true;
  }
}

function updateSubscriptionDetails(details) {
  if (typeof details === 'string') {
    subscriptionDetails.innerHTML = `<p>${details}</p>`;
  } else {
    subscriptionDetails.innerHTML = `
      <div>
        <strong>FCM Token:</strong><br>
        <span style="word-break: break-all; font-size: 12px;">${details}</span>
      </div>
    `;
  }
}

function logNotification(type, data) {
  const timestamp = new Date().toLocaleString();
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.innerHTML = `
    <div class="timestamp">${timestamp}</div>
    <div class="message">
      <strong>${type}</strong><br>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    </div>
  `;
  
  notificationLog.insertBefore(logEntry, notificationLog.firstChild);
  
  // Keep only last 10 entries
  while (notificationLog.children.length > 10) {
    notificationLog.removeChild(notificationLog.lastChild);
  }
}

// Service Worker update handling
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker updated');
    updateStatus('App updated! Please refresh the page.', 'warning');
  });
}

// Handle app install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt fired');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button or banner
  updateStatus('This app can be installed on your device!', 'success');
});

window.addEventListener('appinstalled', (evt) => {
  console.log('App installed');
  logNotification('App installed', {});
});

// Export functions for debugging
window.PWAApp = {
  subscribeToNotifications,
  unsubscribeFromNotifications,
  testLocalNotification,
  getCurrentToken: () => currentToken,
  isSubscribed: () => isSubscribed
}; 