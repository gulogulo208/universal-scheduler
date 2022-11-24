const requestSignup = async () => {
  try {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const position = document.getElementById("position").value;

    if (first_name && last_name && email && password && position) {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          position,
        }),
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

const validateInput = (event) => {
  event.preventDefault();
  const inputs = document.querySelectorAll(".needs-validation");

  Array.from(inputs).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
  requestSignup();
};

document.getElementById("signupForm").addEventListener("submit", validateInput);
