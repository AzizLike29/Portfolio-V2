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
          // icon kembali normal selama 1 detik
          setTimeout(function () {
            iconElement.classList.remove("bi-clipboard-check");
            iconElement.classList.add("bi-copy");
          }, 1000);
        }

        // notif copy berhasil
        showNotification("Success", copyType + " copied: " + textCopy);
      })
      .catch(function (err) {
        console.error("Error Copy: ", err);

        // tambah notif apabila error
        showNotification("Error", "Failed to copy " + copyType);
      });
  } catch (err) {
    console.error("Error Copy Text: ", err);

    // tambah notifikasi saat terjadi kesalahan
    showNotification("Error", "An unexpected error occurred");
  }
}
