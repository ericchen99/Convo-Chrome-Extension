var allowed_times = [
  "12:00AM - 12:30AM",
  "12:30AM - 1:00AM",
  "1:00AM - 1:30AM",
  "1:30AM - 2:00AM",
  "2:00AM - 2:30AM",
  "2:30AM - 3:00AM",
  "3:00AM - 3:30AM",
  "3:30AM - 4:00AM",
  "4:00AM - 4:30AM",
  "4:30AM - 5:00AM",
  "5:00AM - 5:30AM",
  "5:30AM - 6:00AM",
  "6:00AM - 6:30AM",
  "6:30AM - 7:00AM",
  "7:00AM - 7:30AM",
  "7:30AM - 8:00AM",
  "8:00AM - 8:30AM",
  "8:30AM - 9:00AM",
  "9:00AM - 9:30AM",
  "9:30AM - 10:00AM",
  "10:00AM - 10:30AM",
  "10:30AM - 11:00AM",
  "11:00AM - 11:30AM",
  "11:30AM - 12:00AM",
  "12:00PM - 12:30PM",
  "12:30PM - 1:00PM",
  "1:00PM - 1:30PM",
  "1:30PM - 2:00PM",
  "2:00PM - 2:30PM",
  "2:30PM - 3:00PM",
  "3:00PM - 3:30PM",
  "3:30PM - 4:00PM",
  "4:00PM - 4:30PM",
  "4:30PM - 5:00PM",
  "5:00PM - 5:30PM",
  "5:30PM - 6:00PM",
  "6:00PM - 6:30PM",
  "6:30PM - 7:00PM",
  "7:00PM - 7:30PM",
  "7:30PM - 8:00PM",
  "8:00PM - 8:30PM",
  "8:30PM - 9:00PM",
  "9:00PM - 9:30PM",
  "9:30PM - 10:00PM",
  "10:00PM - 10:30PM",
  "10:30PM - 11:00PM",
  "11:00PM - 11:30PM",
  "11:30PM - 12:00AM",
]

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
      } else {
        console.log(payload)

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