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

  // const inputs = document.querySelectorAll(".needs-validation");

  // Array.from(inputs).forEach((form) => {
  //   form.addEventListener(
  //     "submit",
  //     (event) => {
  //       if (!form.checkValidity()) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //       }

  //       form.classList.add("was-validated");
  //     },
  //     false
  //   );
  // });
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", requestLogin);
};

const requestLogin = async (event) => {
  try {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

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
