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
  let content_header = document.getElementById("content_header").value;
  let intent = document.getElementById("intent").value;
  let device_token = USER_TOKEN;

  if (article_link == "" || article_title == "" || content_header == "" || intent == "") {
    alert("Please fill in all fields");
    return null;
  }
  article_title += "...";

  // Retrieve info from the config
  let name = "";
  $.getJSON("config.json", function(json) {
    name = json["Name"];
  })

  // Return an object containing retrieved values
  return {
    article_link,
    article_title,
    content_header,
    intent,
    name,
    device_token
  }
}


/**
 * Retrieve values from the html and attempt to send a push notification to the server
 * Returns true on success
 * Returns false on failure
 * @param {*} body The result of a retrieve_push_notif_body call
 */
async function try_push_notification_to_server(body) {
  const SERVER_URL = "https://convo-starter-backend.herokuapp.com/api/sender_request/";

  if (body == null) { return; }
  else {console.log(body); }

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
      let response = await response.json()

      // Do something with response
      console.log(response)
    }
  }
  catch(e) {
    alert("Error sending push notification" + "\n" 
          + "Please send a picture of your input to Leo&Eric&Deepak")
    console.log(e)
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // Auto-populate the link with the current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Retrieving current tab info");
    let activeTab = tabs[0];
    document.getElementById("article_link").defaultValue = activeTab.url;
    document.getElementById("article_title").defaultValue = activeTab.title.substr(0, 32);
  });

  let submitButton = document.getElementById('submitForm');
  submitButton.addEventListener('click', function() {
    let body = retrieve_push_notif_body();
    try_push_notification_to_server(body);
  }, false);
}, false);