import { postUser, getUser } from "../services/api";
import * as modal from "../welcomeModal";

const forms = document.querySelectorAll("form");
const formSingIn = forms[1];
const formSingUp = forms[2];
const modalSwitcher = document.querySelector(".cd-signin-modal__switcher");
const signupUserName = document.getElementById("signup-username");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupImg = document.getElementById("signup-img");
const signinEmail = document.getElementById("signin-email");
const signinPassword = document.getElementById("signin-password");
const signinModal = document.getElementById("sign-in-modal");
const signupModal = document.getElementById("sign-up-modal");
const signinForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const accountName = document.getElementById("accountName");

const LogedIn = () => {
  document
    .querySelector(".cd-signin-modal")
    .classList.remove("cd-signin-modal--is-visible");
  document.querySelector(".films-list").style.filter = "blur(0px)";
  document.querySelector(".films-list").style.transition = "1000ms";
  document.querySelector(".cd-main-header__logo").style.opacity = "1";
  document.querySelector(".search-form").style.opacity = "1";
  const buttons = document.querySelectorAll(".cd-main-nav__item");
  buttons[1].style.backgroundColor = "#2f889a";
  buttons[0].style.display = "block";
  buttons[1].style.display = "block";
  buttons[1].addEventListener("click", event => {
    // avatar.src = "../../img/Missing_avatar.svg";
    document.querySelector(".cd-main-header__logo").style.opacity = "0";
    document.querySelector(".search-form").style.opacity = "0";
    sessionStorage.clear();
    localStorage.removeItem("key");
    document
      .querySelector(".cd-signin-modal")
      .classList.add("cd-signin-modal--is-visible");
    document.querySelector(".films-list").style.filter = "blur(15px)";
    buttons[0].style.display = "none";
    buttons[1].style.display = "none";
  });
};

const submitSignUp = event => {
  const user = {
    login: `${signupUserName.value}`,
    email: `${signupEmail.value.toLowerCase()}`,
    password: `${signupPassword.value}`,
    avatar: `${avatar.src}`
  };

  getUser().then(data => {
    const a = data.map(el => el.login).includes(signupUserName.value);
    const b = data
      .map(el => el.email)
      .includes(signupEmail.value.toLowerCase());
    const c = !(signupPassword.value !== "" && signupPassword.value.length > 5);

    signupUserName.classList.toggle("cd-signin-modal__input--has-error", a);
    signupEmail.classList.toggle("cd-signin-modal__input--has-error", b);
    signupPassword.classList.toggle("cd-signin-modal__input--has-error", c);

    if (signupUserName.value === "") {
      signupUserName.classList.add("cd-signin-modal__input--has-error");
      signupUserName
        .closest("p")
        .querySelector("span")
        .classList.add("error");
      signupUserName.closest("p").querySelector("span").textContent =
        "Enter your UserName";
      setTimeout(() => {
        signupUserName.classList.remove("cd-signin-modal__input--has-error");
        signupUserName
          .closest("p")
          .querySelector("span")
          .classList.remove("error");
      }, 1000);
    }
    if (signupEmail.value === "") {
      signupEmail.classList.add("cd-signin-modal__input--has-error");
      signupEmail
        .closest("p")
        .querySelector("span")
        .classList.add("error");
      signupEmail.closest("p").querySelector("span").textContent =
        "Enter valid email";
      setTimeout(() => {
        signupEmail.classList.remove("cd-signin-modal__input--has-error");
        signupEmail
          .closest("p")
          .querySelector("span")
          .classList.remove("error");
      }, 1000);
    }
    if (signupPassword.value === "") {
      signupPassword.classList.add("cd-signin-modal__input--has-error");
      signupPassword
        .closest("p")
        .querySelector("span")
        .classList.add("error");
      signupPassword.closest("p").querySelector("span").textContent =
        "Enter password";
      setTimeout(() => {
        signupPassword.classList.remove("cd-signin-modal__input--has-error");
        signupPassword
          .closest("p")
          .querySelector("span")
          .classList.remove("error");
      }, 1000);
    }
    if (signupUserName.value !== "") {
      if (a) {
        signupUserName
          .closest("p")
          .querySelector("span")
          .classList.add("error");
        signupUserName.closest("p").querySelector("span").textContent =
          "This name is already in use ";
        setTimeout(() => {
          signupUserName
            .closest("p")
            .querySelector("span")
            .classList.remove("error");
        }, 1000);
      }
    }
    if (signupEmail.value !== "") {
      if (b) {
        signupEmail
          .closest("p")
          .querySelector("span")
          .classList.add("error");
        signupEmail.closest("p").querySelector("span").textContent =
          "This email is already in use ";
        setTimeout(() => {
          signupEmail
            .closest("p")
            .querySelector("span")
            .classList.remove("error");
        }, 1000);
      }
    }
    if (signupPassword.value.length < 5) {
      signupPassword
        .closest("p")
        .querySelector("span")
        .classList.add("error");
      signupPassword.closest("p").querySelector("span").textContent =
        "password must be at least 6 characters";
      setTimeout(() => {
        signupPassword
          .closest("p")
          .querySelector("span")
          .classList.remove("error");
      }, 1000);
    }

    if (
      signupPassword.value !== "" &&
      signupEmail.value !== "" &&
      signupUserName.value !== "" &&
      signupPassword.value.length > 5
    ) {
      if (
        data.find(
          el =>
            el.login.toLowerCase() === signupUserName.value.toLowerCase() ||
            el.email === signupEmail.value
        )
      ) {
        console.log("fail");
      } else
        event.target.reset(),
          LogedIn(),
          postUser(user).then(data => {
            sessionStorage.setItem("id", data.id),
              modal.handleModalWelcome(),
              signupModal.classList.remove("cd-selected"),
              signupForm.classList.remove(
                "cd-signin-modal__block--is-selected"
              ),
              (accountName.textContent = data.login),
              (avatar.src = comprasion.avatar);
          });
    }
  });
  event.preventDefault();
};

const submitSignIn = event => {
  getUser().then(data => {
    const comprasion = data.find(
      el =>
        el.password === signinPassword.value &&
        el.email === signinEmail.value.toLowerCase()
    );
    const a = !data
      .map(el => el.email)
      .includes(signinEmail.value.toLowerCase());
    const b = !data.map(el => el.password).includes(signinPassword.value);
    signinEmail.classList.toggle(
      "cd-signin-modal__input--has-error",
      !data.map(el => el.email).includes(signinEmail.value.toLowerCase())
    );
    signinPassword.classList.toggle(
      "cd-signin-modal__input--has-error",
      !data.map(el => el.password).includes(signinPassword.value)
    );
    if (signinEmail.value === "") {
      signinEmail.classList.add("cd-signin-modal__input--has-error");
      signinEmail
        .closest("p")
        .querySelector("span")
        .classList.add("error");
      signinEmail.closest("p").querySelector("span").textContent =
        "Enter your email";
      setTimeout(() => {
        signinEmail.classList.remove("cd-signin-modal__input--has-error");
        signinEmail
          .closest("p")
          .querySelector("span")
          .classList.remove("error");
      }, 1000);
    }
    if (signinPassword.value === "") {
      signinPassword.classList.add("cd-signin-modal__input--has-error");
      signinPassword
        .closest("p")
        .querySelector("span")
        .classList.add("error");
      signinPassword.closest("p").querySelector("span").textContent =
        "Enter your password";
      setTimeout(() => {
        signinPassword.classList.remove("cd-signin-modal__input--has-error");
        signinPassword
          .closest("p")
          .querySelector("span")
          .classList.remove("error");
      }, 1000);
    }
    if (signinEmail.value !== "" || signinPassword.value !== "") {
      if (a) {
        signinEmail
          .closest("p")
          .querySelector("span")
          .classList.add("error");
        signinEmail.closest("p").querySelector("span").textContent =
          "Can't find :(";
        setTimeout(() => {
          signinEmail
            .closest("p")
            .querySelector("span")
            .classList.remove("error");
        }, 1000);
      }
      if (b) {
        signinPassword
          .closest("p")
          .querySelector("span")
          .classList.add("error");
        signinPassword.closest("p").querySelector("span").textContent =
          "Wrong password";
        signinPassword.value = "";
        setTimeout(() => {
          signinPassword
            .closest("p")
            .querySelector("span")
            .classList.remove("error");
        }, 1000);
      }
    }
    if (signinEmail.value !== "" && signinPassword.value !== "") {
      if (!a && !b) {
        if (document.getElementById("remember-me").checked) {
          localStorage.setItem("key", comprasion.id);
        }
        LogedIn();
        sessionStorage.setItem("id", comprasion.id);
        document
          .getElementById("sign-in-modal")
          .classList.remove("cd-selected");
        document
          .getElementById("login-form")
          .classList.remove("cd-signin-modal__block--is-selected");
        accountName.textContent = comprasion.login;
        avatar.src = comprasion.avatar;
        event.target.reset();
        sessionStorage.setItem("id", comprasion.id);
        modal.handleModalWelcome();
      }
    }
  });
};

const switcher = event => {
  signupModal.classList.toggle("cd-selected", event.target === signupModal);
  signupForm.classList.toggle(
    "cd-signin-modal__block--is-selected",
    event.target === signupModal
  );
  signinModal.classList.toggle("cd-selected", event.target === signinModal);
  signinForm.classList.toggle(
    "cd-signin-modal__block--is-selected",
    event.target === signinModal
  );
};

signupImg.onchange = function(event) {
  const target = event.target || window.event.srcElement,
    files = target.files;
  if (FileReader && files && files.length) {
    const reader = new FileReader();
    reader.onload = function() {
      avatar.src = reader.result;
      // dataform.setItem()
      return reader.result;
    };
    reader.readAsDataURL(files[0]);
  } else {
  }
};

modalSwitcher.addEventListener("click", switcher);
formSingUp.addEventListener("submit", submitSignUp);
formSingIn.addEventListener("submit", submitSignIn);

// ______________________Cheking local storage after init on page__________________________________
getUser().then(data => {
  // sessionStorage.clear()
  if (data.find(el => el.id === localStorage.getItem("key"))) {
    accountName.textContent = data.find(
      el => el.id === localStorage.getItem("key")
    ).login;
    if (data.find(el => el.id === localStorage.getItem("key")).avatar) {
      avatar.src = data.find(
        el => el.id === localStorage.getItem("key")
      ).avatar;
    }
    LogedIn();
    modal.handleModalWelcome();
  }
});
