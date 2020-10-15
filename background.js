// TODO(DEVELOPER): Change the values below using values from the initialization snippet: Firebase Console > Overview > Add Firebase to your web app.
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyC-vgalyLYfif4sNlvZ5ADtgfiyCkv7bgM",
  authDomain: "push-extenstion-tests.firebaseapp.com",
  databaseURL: "https://push-extenstion-tests.firebaseio.com",
  projectId: "push-extenstion-tests",
  storageBucket: "push-extenstion-tests.appspot.com",
  messagingSenderId: "423654782621",
  appId: "1:423654782621:web:7fc5b42674fe4a26d7c674"
};
firebase.initializeApp(firebaseConfig);

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
};
