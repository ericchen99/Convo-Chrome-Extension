// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC-vgalyLYfif4sNlvZ5ADtgfiyCkv7bgM",
  authDomain: "push-extenstion-tests.firebaseapp.com",
  databaseURL: "https://push-extenstion-tests.firebaseio.com",
  projectId: "push-extenstion-tests",
  storageBucket: "push-extenstion-tests.appspot.com",
  messagingSenderId: "423654782621",
  appId: "1:423654782621:web:719214cc7abaafd1d7c674",
  measurementId: "G-J0PLHZ5PZ2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BG1vANsGXQth0tSTGuGW_L1aCvQHZtGEN3il3REii_WIeQP8hlBoCwmsaeGoqtAUMbwoSrV2GnEkmF8H34vzAJ8");

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  alert(payload)
  // Customize notification here
  chrome.notifications.create(
    '',{   
    type: 'basic', 
    iconUrl: 'icons/convo_icon_128.png', 
    title: "Notification Title", 
    message: "Notification Message!" 
    },
  
  function() {} 
  
  );

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});