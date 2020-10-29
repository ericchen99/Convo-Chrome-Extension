document.addEventListener('DOMContentLoaded', function() {
  // Auto-populate the link with the current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Retrieving current tab info");
    let activeTab = tabs[0];
    document.getElementById("article_link").defaultValue = activeTab.url;
    document.getElementById("article_title").defaultValue = activeTab.title;
  });

  let submitButton = document.getElementById('submitForm');
  submitButton.addEventListener('click', function() {
    let body = retrieve_push_notif_body();
    console.log(body)
    // push_notification_to_server(body);

    document.getElementById("article_link").value = "";
    document.getElementById("article_title").value = "";
    document.getElementById("article_topic").value = "";
    document.getElementById("intent").value = "";
  }, false);
}, false);