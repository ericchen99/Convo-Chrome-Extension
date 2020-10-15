Notification.requestPermission().then((permission) => {
  if (permission === 'granted')
  {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
  }
  else
  {
      console.log('Unable to get permission to notify.');
  }
});


function format_time_24_to_meridian(time) {
  var date = new Date()
  var month = date.getMonth() + 1, day = date.getDate()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  date = `${month}/${day}/${date.getFullYear()}` 

  var [hours, minutes] = time.split(":")
  if (hours == 0) hours = 12
  if (hours > 12 ){
    return `${date} ${hours - 12}:${minutes} PM`
  }
  else {
    return `${date} ${hours}:${minutes} AM`
  }
}

function ping_server() {
  setTimeout(function () {
    
  }, 5000)
}

function times_good(times) {
  const MINUTES_APART = 15
  const date = new Date()

  const current_time = date.getHours() * 60 + date.getMinutes()

  console.log(times)
  for (var idx = 0; idx < times.length; idx++) {
    var [hours_1, minutes_1] = times[idx].split(":")
    var time_1 = (parseInt(hours_1) * 60 + parseInt(minutes_1)).toString()

    if (time_1 < current_time + 15) {
      alert("Times must be at least 15 minutes after the current time")
      return false;
    }
  }
  return true
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("Working")
  // Auto-populate the link with the current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0];
    document.getElementById("article_link").defaultValue = activeTab.url;
    document.getElementById("article_title").defaultValue = activeTab.title.substr(0, 32);
  });

  // var notificationButton = document.getElementById('notification-button');
  // notificationButton.addEventListener('click', function() {
  //   alert('click')

  //   chrome.notifications.create(
  //     '',{   
  //     type: 'basic', 
  //     iconUrl: 'icons/convo_icon_128.png', 
  //     title: "Notification Title", 
  //     message: "Notification Message!" 
  //     },
    
  //   function() {} 
    
  //   );
  // })

  var checkPageButton = document.getElementById('submitForm');
  checkPageButton.addEventListener('click', function() {

    var article_link = document.getElementById("article_link").value
    var article_title = document.getElementById("article_title").value

    if (article_link == "" || article_title == "") {
      alert("Please fill in all fields")
      return
    }
    article_title += "..."

    var name = ""
    $.getJSON("config.json", function(json) {
      name = json["Name"]
    })

    var message = {
      notification: {
        title: `${name} wants to talk about ${article_title}`,
        body: `${article_link}`
      },
    };
    
    // send_notification(message);

  }, false);
}, false);