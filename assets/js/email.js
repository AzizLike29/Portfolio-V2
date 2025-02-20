const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.classList.remove("d-none");

  const bodyMessage = `name: ${fullName.value}<br> email: ${email.value}<br> subject: ${subject.value}<br> message: ${message.value}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "abdulfirdaus590@gmail.com",
    Password: "27FF159C670ECB4712C04546EC82B3F50260",
    To: "abdulfirdaus590@gmail.com",
    From: "abdulfirdaus590@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    loadingIndicator.classList.add("d-none");
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Congrats, Sent message succesfully!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to send the email. Please try again later.",
        icon: "error",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});
