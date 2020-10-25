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

console.log("bleh")

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BG1vANsGXQth0tSTGuGW_L1aCvQHZtGEN3il3REii_WIeQP8hlBoCwmsaeGoqtAUMbwoSrV2GnEkmF8H34vzAJ8");

let content_url = ""
let receiver_waiting_room = ""


// https://github.com/firebase/quickstart-js/issues/71
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const data = payload["data"]
  const content_name = data["content_name"]
  content_url = data["content_url"]
  const intent = data["intent"]
  const sender_name = data["sender_name"]
  const topic = data["topic"]
  receiver_waiting_room = data["receiver_waiting_room"]

  // Parse out info from the payload
  let notificationTitle = `${sender_name} wants to talk about ${topic}`
  let notificationOptions = {
    icon: 'icons/convo_icon_128.png',
    silent: false,
    body: `${content_name} with the intent of ${intent}`,
    actions: [
      {
        action: 'waiting_room',
        title: 'Join the waiting room'
      },
      {
        action: 'view_article',
        title: 'View the article'
      }
    ],
    requireInteraction: true
  }


  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});


self.addEventListener('notificationclick', function(event) {
  console.log(event)
  event.notification.close();
  if (event.action === 'waiting_room') {
    console.log("waiting room tab create")
    clients.openWindow(content_url)
  }
  if (event.action ==='view_article') {
    console.log("article create")
    clients.openWindow(content_url)
    clients.openWindow(receiver_waiting_room)
  }
}, false);