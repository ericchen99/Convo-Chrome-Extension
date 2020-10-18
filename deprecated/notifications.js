var notificationButton = document.getElementById('notification-button');
notificationButton.addEventListener('click', function() {
  alert('click')

  chrome.notifications.create(
    '',{   
    type: 'basic', 
    iconUrl: 'icons/convo_icon_128.png', 
    title: "Notification Title", 
    message: "Notification Message!" 
    },
  
  function() {} 
  
  );
})