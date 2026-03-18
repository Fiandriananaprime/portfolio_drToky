import { showAlert } from "./cart.js";
let confirmTimeout = null;
const messageForm = document.getElementById("message");
const conf = document.getElementById("confirmMessage");

if (messageForm) {
    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = messageForm.querySelector('input[name="name"]').value.trim();
        const email = messageForm.querySelector('input[name="email"]').value.trim();
        const msg = messageForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !msg) {
            showAlert("Please fill in all fields.");
            return;
        }
        if (conf) {
            conf.classList.add("show");
            conf.innerHTML = `
                <span class="text-3xl m-2">🎉</span>
        <div class="text-white">
          <h3 class="font-bold">Thank you so much, ${name}!</h3>
          <p class="text-sm">
            Your message has been received. I'll get back to you as soon as possible.
          </p>
        </div>
        <i id="closeAlert" class="fa-solid text-sm fa-times text-white"></i>
            ` 
            if (confirmTimeout) {
                clearTimeout(confirmTimeout);
                confirmTimeout = null;
            }
            confirmTimeout = setTimeout(() => {
                conf.classList.remove("show");
                confirmTimeout = null;
            }, 5000);
        }
        messageForm.reset();
    });
}