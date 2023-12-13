function sendToWhatsapp() {
  let number = "+62895618748150";

  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  var url =
    "https://wa.me/" +
    number +
    "?text=" +
    "Email : " +
    email +
    "%0a" +
    "Subject : " +
    subject +
    "%0a" +
    "Message : " +
    message +
    "%0a%0a";

  window.open(url, "_blank").focus();
  console.log("Function called");
}
