const paymentDetails = document.getElementById("paymentDetails");

const payWithToken = token => {
  console.log("Token :" + token);
  http(
    {
      method: "POST",
      route: "/payWithToken",
      body: { token: token }
    },
    data => {
      console.log("API RESPONSE: ", data);
      let ckoWidget = document.getElementById("cko-widget");
      ckoWidget.innerHTML = `
        <span class="paymentDetails">Payment Successful</span>
        <div class="buttons-container" onclick="Checkout.open()">
          <button class="try-again"> Try Again? </button>
        </div>`;
    }
  );
};

// Utility function to send HTTP calls to our back-end API
const http = ({ method, route, body }, callback) => {
  console.log("Body:+ ");
  console.log(body);
  let requestData = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  if (method.toLocaleLowerCase() === "get") {
    delete requestData.body;
  }

  // Timeout after 10 seconds
  timeout(10000, fetch(`${window.location.origin}${route}`, requestData))
    .then(res => res.json())
    .then(data => callback(data))
    .catch(er => (er.innerHTML = "Connection timed out"));
};

// For connection timeout error handling
const timeout = (ms, promise) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("Connection timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
};

// Socket part so we can handle webhooks:
// var socket = io();
// socket.on("webhook", (webhookBody) => {
//   if (webhookBody.paymentId !== PAYMENT_ID) {
//     return;
//   }
//   let tempWebhook = webhookBody.type.replace("_", " ");

//   let newToast = document.createElement("div");
//   newToast.classList.add("toast_body");

//   // WEBHOOK div
//   let newWHDiv = document.createElement("div");
//   newWHDiv.innerHTML = "WEBHOOK";
//   newWHDiv.classList.add("wh_div");
//   newToast.appendChild(newWHDiv);

//   // Payment type div
//   let newPTDiv = document.createElement("div");
//   newPTDiv.innerHTML = tempWebhook;
//   newPTDiv.classList.add("pt_div");
//   newToast.appendChild(newPTDiv);

//   toastBar.append(newToast);
//   newToast.classList.add("show");
//   setTimeout(function () {
//     newToast.classList.remove("show");
//     newToast.outerHTML = "";
//   }, 5000);
// });

/* Themes */

// // Default theme to user's system preference
// theme = getComputedStyle(document.documentElement).getPropertyValue("content");

// // Apply cached theme on page reload
// theme = localStorage.getItem("theme");

// if (theme) {
//   document.body.classList.add(theme);
//   if (theme == "dark") {
//     switcher.checked = true;
//   }
// }

// // Dark mode switch
// document.getElementById("theme-switch").addEventListener("change", (event) => {
//   themeSwitch(event);
// });

// const themeSwitch = (event) => {
//   if (event.target.checked) {
//     // Dark mode
//     document.body.className = "";
//     document.body.classList.add("dark");
//     setTheme("dark");
//     getTheme();
//     cleanState();
//   } else {
//     // Light mode
//     document.body.className = "";
//     document.body.classList.add("light");
//     setTheme("light");
//     getTheme();
//     cleanState();
//   }
// };

// function getTheme() {
//   theme = localStorage.getItem("theme");
// }

// function setTheme(mode) {
//   localStorage.setItem("theme", mode);
// }

// /* Outcome animations */

// const showCheckmark = () => {
//   outcome.classList.add("checkmark", "draw");
// };
// const hideCheckmark = () => {
//   outcome.classList.remove("checkmark", "draw");
// };

// const showCross = () => {
//   outcome.class = "cross";
//   outcome.innerHTML = crossVisible;
// };
// const hideCross = () => {
//   outcome.classList.remove("cross");
//   outcome.innerHTML = crossHidden;
// };
