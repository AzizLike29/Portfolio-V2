const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function generateEmailBody() {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background-color: #ffffff;">
      
      <!-- Header -->
      <div style="background-color: #111827; padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 20px; font-weight: 600;">
          New Contact Form Submission
        </h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 32px 24px; background-color: #ffffff; border: 1px solid #e5e7eb;">
        
        <!-- Contact Details -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Contact Details
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; font-weight: 600; color: #6b7280; width: 100px;">
                Name
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; color: #111827;">
                ${fullName.value}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; font-weight: 600; color: #6b7280;">
                Email
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; color: #111827;">
                <a href="mailto:${
                  email.value
                }" style="color: #10b981; text-decoration: none;">
                  ${email.value}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">
                Subject
              </td>
              <td style="padding: 12px 0; color: #111827; font-weight: 500;">
                ${subject.value}
              </td>
            </tr>
          </table>
        </div>
        
        <!-- Message -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Message
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; color: #111827; line-height: 1.7;">
            ${message.value.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <!-- Reply Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="mailto:${
            email.value
          }" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 4px;">
            Reply to ${fullName.value}
          </a>
        </div>
        
        <!-- Timestamp -->
        <div style="text-align: center; padding: 16px; background-color: #f9fafb; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            Received on ${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f9fafb;">
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    </div>
  `;
}

function sendEmail() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.classList.remove("d-none");

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "abdulfirdaus590@gmail.com",
    Password: "27FF159C670ECB4712C04546EC82B3F50260",
    To: "abdulfirdaus590@gmail.com",
    From: "abdulfirdaus590@gmail.com",
    Subject: subject.value,
    Body: generateEmailBody(),
  }).then((message) => {
    loadingIndicator.classList.add("d-none");
    if (message == "OK") {
      // Audio Success Play
      const successAudio = new Audio("assets/audio/success-tone.mp3");
      successAudio.volume = 1.0;
      successAudio.play();
      Swal.fire({
        title: "Success!",
        text: "Congrats, Sent message succesfully!",
        icon: "success",
      });
    } else {
      // Audio Error Play
      const errorAudio = new Audio("assets/audio/error-tone.mp3");
      errorAudio.volume = 1.0;
      errorAudio.play();
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
