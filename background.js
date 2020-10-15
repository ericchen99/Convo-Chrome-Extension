// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
console.log('messaging created');
messaging.usePublicVapidKey("BG1vANsGXQth0tSTGuGW_L1aCvQHZtGEN3il3REii_WIeQP8hlBoCwmsaeGoqtAUMbwoSrV2GnEkmF8H34vzAJ8");
console.log('key defined');

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
    console.log('getToken');
    if (currentToken)
    {
        console.log('getToken success');
        console.log(currentToken);
    }
    else
    {
        console.log('getToken failure');
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('getToken error: ' + err);
});


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
    console.log('onTokenRefresh');
    messaging.getToken().then((refreshedToken) => {
        console.log(currentToken);
    }).catch((err) => {
    console.log('onTokenRefresh error: ' + err);
    });
});