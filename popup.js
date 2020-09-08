function format_time_24_to_meridian(time) {
  var [hours, minutes] = time.split(":")
  if (hours == 0) hours = 12
  if (hours > 12 ){
    return `${hours - 12}:${minutes} PM`
  }
  else {
    return `${hours}:${minutes} AM`
  }
}

function times_good(times) {
  const MINUTES_APART = 30

  console.log(times)
  for (var idx = 0; idx < times.length; idx++) {
    for (var idx_2 = 1; idx_2 < times.length; idx_2++) {
      if (idx != idx_2) {
        var [hours_1, minutes_1] = times[idx].split(":")
        var [hours_2, minutes_2] = times[idx_2].split(":")

        var time_1 = hours_1 * 60 + minutes_1
        var time_2 = hours_2 * 60 + minutes_2

        if (Math.abs(time_1 - time_2) < MINUTES_APART) {
          console.log(time_1)
          console.log(time_2)
          console.log(Math.abs(time_1 - time_2))
          return false
        }
      }
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
    document.getElementById("article_title").defaultValue = activeTab.title;
  });


  var checkPageButton = document.getElementById('submitForm');
  checkPageButton.addEventListener('click', function() {

    var article_link = document.getElementById("article_link").value
    var article_title = document.getElementById("article_title").value
    var time_1 = document.getElementById("time_1").value
    var time_2 = document.getElementById("time_2").value
    var time_3 = document.getElementById("time_3").value

    $.getJSON("config.json", function(json) {
      var name = json["Name"]
      var phone_number = json["Phone Number"]

      var payload = {
        article_link,
        article_title,
        time_1,
        time_2,
        time_3,
        name,
        phone_number
      }

      var payload_good = true
      for(var key in payload) {
        var val = payload[key]
        if (val === null || val === "") {
          payload_good = false
        }
      }

      if (!payload_good) {
        alert("Please fill all values")
      } else if (!times_good([time_1, time_2, time_3])) {
        alert("Ensure times are at least 30 minute apart")
      }
      else {
        payload.time_1 = format_time_24_to_meridian(time_1)
        payload.time_2 = format_time_24_to_meridian(time_2)
        payload.time_3 = format_time_24_to_meridian(time_3)

        console.log(payload)

        var url = 'https://hooks.zapier.com/hooks/catch/8405523/oawcn9w'
        fetch(url, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        document.getElementById("article_link").value = ""
        document.getElementById("article_title").value = ""
        document.getElementById("time_1").value = ""
        document.getElementById("time_2").value = ""
        document.getElementById("time_3").value = ""
        alert("Submitted!")
      }
    });
  }, false);
}, false);