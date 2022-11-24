const login = async (event) => {
  event.preventDefault();

  const userName = document
    .querySelector(/* -- Query name for login username -- */)
    .value.trim();
  const password = document
    .querySelector(/* -- Query name for login password -- */)
    .value.trim();

  if (userName && password) {
    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        userName,
        password,
      }),

      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(/* -- homepage route -- */);
    } else {
      alert("ERROR");
    }
  }
};

let loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  document.querySelector("#loginBtn").addEventListener("click", login);
}
