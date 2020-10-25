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

var USER_TOKEN = null

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
    console.log('getToken');
    if (currentToken)
    {
        console.log('getToken success');
        console.log(currentToken);
        USER_TOKEN = currentToken
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
        USER_TOKEN = refreshedToken
    }).catch((err) => {
    console.log('onTokenRefresh error: ' + err);
    });
});

/**
 * Ensure we have permissions to send notifications
 */
Notification.requestPermission().then((permission) => {
  if (permission === 'granted')
  {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
  }
  else
  {
      alert('Unable to get permission to notify.');
  }
});


/**
 * Return an object containing the body of the push request
 * Returns null if any values are improper
 */
function retrieve_push_notif_body() {
  // Retrieve info from the form
  let article_link = document.getElementById("article_link").value;
  let article_title = document.getElementById("article_title").value;
  let article_topic = document.getElementById("article_topic").value;
  let intent = document.getElementById("intent").value;
  let device_token = USER_TOKEN;

  if (article_link == "" || article_title == "" || article_topic == "" || intent == "") {
    alert("Please fill in all fields");
    return null;
  }

  // Retrieve info from the config
  // TODO debug this
  let name = "";
  $.getJSON("config.json", function(json) {
    name = json["Name"];
  })

  // Return an object containing retrieved values and updated names for server
  // TODO replace `Eric` with `name`
  return {
    "content_name": article_title,
    "content_url": article_link,
    "topic": article_topic,
    "intent": intent,
    "sender_name": "Eric",
    "request_token": device_token
  };
}


/**
 * Retrieve values from the html and attempt to send a push notification to the server
 * Returns true on success
 * Returns false on failure
 * @param {*} body The result of a retrieve_push_notif_body call
 */
async function push_notification_to_server(body) {
  let SERVER_URL = "https://convo-starter-backend.herokuapp.com/api/sender_request/";

  // Don't send a request if we didn't get an appropriate body
  if (body == null) { return; }
  else { console.log(body); }

  // Attempt to send the request to the server
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
      const response_json = await response.json()

      // Log the response
      console.log(response_json)

      // Open the sender waiting room tab
      chrome.tabs.create({url: response_json["waiting_room_url"]})
    }
  }
  catch(e) {
    alert("Error sending push notification" + "\n" 
          + "Please send a picture of your input to Leo&Eric&Deepak")
    console.log(e)
  }
}

navigator.serviceWorker.addEventListener('message', event => {
  console.log(event)
});