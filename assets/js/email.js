function sendMessage() {
  (function () {
    emailjs.init("2G0rRaz7fr-5SKSgQ"); // Account Public Key
  })();

  var serviceID = "service_dlu2zjg"; // Email Service ID
  var templateID = "template_3wsxnll"; // Email Template ID

  var params = {
    sendername: document.querySelector("#name").value,
    senderemail: document.querySelector("#email").value,
    subject: document.querySelector("#subject").value,
    message: document.querySelector("#message").value,
  };

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      alert(
        "Thank you, " + params["sendername"] + "! Your message has been sent."
      );
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}
