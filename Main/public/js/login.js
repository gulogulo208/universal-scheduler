// const login = async (event) => {
//   event.preventDefault();

//   const userName = document
//     .querySelector(/* -- Query name for login username -- */)
//     .value.trim();
//   const password = document
//     .querySelector(/* -- Query name for login password -- */)
//     .value.trim();

//   if (userName && password) {
//     const response = await fetch("/api/user/login", {
//       method: "post",
//       body: JSON.stringify({
//         userName,
//         password,
//       }),

//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace(/* -- homepage route -- */);
//     } else {
//       alert("ERROR");
//     }
//   }
// };

const showLoginModal = () => {
  $("#loginModal").show();

  if (localStorage.getItem("email")) {
    document.getElementById("email").value = localStorage.getItem("email");
  }

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", requestLogin);
};

const requestLogin = async (event) => {
  try {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rememberMe = document.getElementById("rememberMe").checked;

    if (rememberMe && localStorage.getItem("email")) {
      localStorage.removeItem("email");
      localStorage.setItem("email", email);
    } else if (rememberMe) {
      localStorage.setItem("email", email);
    } else if (!rememberMe && localStorage.getItem("email")) {
      localStorage.removeItem("email");
    }

    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
        return;
      } else {
        alert("Incorrect email or password");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

let loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  document.querySelector("#loginBtn").addEventListener("click", showLoginModal);
}
