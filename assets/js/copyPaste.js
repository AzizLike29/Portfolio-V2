// setting copy phone and email
function copyText(getId, copyType) {
  try {
    var textElement = document.getElementById(getId);
    var textCopy = textElement.innerText;

    navigator.clipboard
      .writeText(textCopy)
      .then(function () {
        console.log("Success Copy " + copyType + ": " + textCopy);

        // ubah icon ke icon paste check
        var iconElement = document.querySelector("#" + getId + " + .bi-copy");
        if (iconElement) {
          iconElement.classList.remove("bi-copy");
          iconElement.classList.add("bi-clipboard-check");
          setTimeout(function () {
            iconElement.classList.remove("bi-clipboard-check");
            iconElement.classList.add("bi-copy");
          }, 1000);
        }

        showNotification("success", copyType + " copied: " + textCopy);
      })
      .catch(function (err) {
        console.error("Error Copy: ", err);
        showNotification("error", "Failed to copy " + copyType);
      });
  } catch (err) {
    console.error("Error Copy Text: ", err);
    showNotification("error", "An unexpected error occurred");
  }
}

// custom in-page notification
function showNotification(type, message) {
  var notif = document.getElementById('customNotification');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'customNotification';
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.right = '20px';
    notif.style.padding = '10px 16px';
    notif.style.borderRadius = '4px';
    notif.style.zIndex = '9999';
    notif.style.fontSize = '14px';
    notif.style.color = '#fff';
    notif.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    notif.style.display = 'none';
    document.body.appendChild(notif);
  }

  notif.textContent = message;
  notif.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
  notif.style.display = 'block';

  clearTimeout(notif.hideTimeout);
  notif.hideTimeout = setTimeout(function () {
    notif.style.display = 'none';
  }, 1500);
}