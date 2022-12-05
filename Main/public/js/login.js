if (localStorage.getItem("email")) {
  document.getElementById("email").value = localStorage.getItem("email");
}

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

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", requestLogin);
