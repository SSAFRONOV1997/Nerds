const contactLink = document.querySelector(".contacts__link");
const modal = document.querySelector(".modal-feedback");
const modalClose = modal.querySelector(".modal-feedback__close");
const modalForm = modal.querySelector(".modal-feedback__form");
const userLog = modal.querySelector("[type=text]");
const userEmail = modal.querySelector("[type=email");
const userText = modal.querySelector(".modal-feedback__item--textarea");
const warnings = modal.querySelectorAll(".modal-feedback__item");

let isStorageSupport = true;
let storageLogin = "";
let storageEmail = "";

try {
  storageLogin = localStorage.getItem("login");
  storageEmail = localStorage.getItem("mail");
} catch (err) {
    isStorageSupport = false;
}

contactLink.addEventListener("click", function (evt){
  evt.preventDefault();
  modal.classList.remove("modal-hidden");
  if (storageLogin) {
    userLog.value = storageLogin;
    userEmail.focus();
  } if (storageEmail) {
      userEmail.value = storageEmail;
      userText.focus();
  } else {
      userLog.focus();
  }
});

modalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modal.classList.add("modal-hidden");
  modal.classList.remove("modal-error");
});

modalForm.addEventListener("submit", function (evt) {
  if (!userLog.value || !userEmail.value || !userText.value) {
    evt.preventDefault();
    modal.classList.remove("modal-error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal-error");
    for (let i = 0; i < warnings.length; i++) {
      let warn = warnings[i];
      if (warn.value <= 0) {
        warn.classList.add("error-form");
      } else {
        warn.classList.remove("error-form");
      }
    }
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", userLog.value);
      localStorage.setItem("mail", userEmail.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    modal.classList.add("modal-hidden");
    modal.classList.remove("modal-error");
  }
});
