const showDivisionModal = () => {
  $("#divisionModal").show();

  const createDivision = document.getElementById("createDivision");

  if (createDivision) {
    createDivision.addEventListener("click", handleCreateDivision);
  }
};

const handleCreateDivision = async (event) => {
  try {
    event.preventDefault();

    const div_name = document.getElementById("div_name").value;

    if (!div_name) {
      document.getElementById("divisionLabel").classList.add("text-danger");
      return;
    }

    const response = await fetch("/api/division", {
      method: "POST",
      body: JSON.stringify({ div_name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const showProjectModal = () => {
  $("#projectModal").show();

  const createProject = document.getElementById("createProject");

  if (createProject) {
    createProject.addEventListener("click", handleCreateProject);
  }
};

const handleCreateProject = async (event) => {
  try {
    event.preventDefault();

    const project_name = document.getElementById("project_name").value;
    const description = document.getElementById("description").value;
    const due_date = document.getElementById("due_date").value;
    const div_id = document.getElementById("div_id").value;

    const projectInfo = [
      { project_name: project_name },
      { description: description },
      { due_date: due_date },
      { div_id: div_id },
    ];

    for (let i = 0; i < projectInfo.length; i++) {
      if (Object.values(projectInfo[i])[0] === "") {
        document
          .getElementById(`${Object.keys(projectInfo[i])}_label`)
          .classList.add("text-danger");
      } else {
        document
          .getElementById(`${Object.keys(projectInfo[i])}_label`)
          .classList.remove("text-danger");
      }
    }

    const response = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify({ project_name, description, div_id, due_date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const showEmployeeModal = () => {
  $("#employeeModal").show();

  const inviteEmployee = document.getElementById("inviteEmployee");

  if (inviteEmployee) {
    inviteEmployee.addEventListener("click", handleInviteEmployee);
  }
};

const handleInviteEmployee = async (event) => {
  try {
    event.preventDefault();

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value.trim();
    const position = document.getElementById("position").value;

    const employeeInfo = [
      { first_name: first_name },
      { last_name: last_name },
      { email: email },
      { position: position },
    ];

    for (let i = 0; i < employeeInfo.length; i++) {
      if (Object.values(employeeInfo[i])[0] === "") {
        document
          .getElementById(`${Object.keys(employeeInfo[i])}_label`)
          .classList.add("text-danger");
      } else {
        document
          .getElementById(`${Object.keys(employeeInfo[i])}_label`)
          .classList.remove("text-danger");
      }
    }

    const response = await fetch("/api/employee", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, position }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const showSettingsModal = () => {
  $("#settingsModal").show();

  const changePassword = document.getElementById("changePassword");

  if (changePassword) {
    changePassword.addEventListener("click", handleChangePassword);
  }
};

const handleChangePassword = async (event) => {
  try {
    event.preventDefault();

    const new_password = document.getElementById("new_password").value.trim();
    const reenter_password = document
      .getElementById("reenter_password")
      .value.trim();

    const settingsInfo = [
      { new_password: new_password },
      { reenter_password: reenter_password },
    ];

    for (let i = 0; i < settingsInfo.length; i++) {
      if (Object.values(settingsInfo[i])[0] === "") {
        document
          .getElementById(`${Object.keys(settingsInfo[i])}_label`)
          .classList.add("text-danger");
      } else {
        document
          .getElementById(`${Object.keys(settingsInfo[i])}_label`)
          .classList.remove("text-danger");
      }
    }

    if (new_password !== reenter_password) {
      alert("Passwords must match!");
      return;
    }

    const response = await fetch("/api/users/changePassword", {
      method: "PUT",
      body: JSON.stringify({ new_password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateProfile = async (event) => {
  try {
    event.preventDefault();

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("user_email").value.trim();

    const response = await fetch("/api/employee/edit", {
      method: "PUT",
      body: JSON.stringify({ first_name, last_name }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const response2 = await fetch("/api/users/updateEmail", {
      method: "PUT",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok && response2.ok) {
      location.reload();
    }

  } catch (error) {
    console.error(error);
  }
}

/* const handleUpdateEmail = async (event) => {
  try {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const response = await fetch("/api/users/updateEmail", {
      method: "PUT",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      location.reload();
    }

  } catch (error) {
    console.error(error);
  }
} */

function showNewPassword() {
  var x = document.getElementById("new_password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showPassword() {
  var x = document.getElementById("reenter_password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

let saveBtn = document.getElementById("saveBtn")
if (saveBtn) {
  saveBtn.addEventListener("click", handleUpdateProfile);
}

let changePasswordBtn = document.getElementById("changePasswordBtn");
if (changePasswordBtn) {
  changePasswordBtn.addEventListener("click", handleChangePassword);
}

let divisionBtn = document.getElementById("divisionBtn");
if (divisionBtn) {
  divisionBtn.addEventListener("click", showDivisionModal);
}

let projectBtn = document.getElementById("projectBtn");
if (projectBtn) {
  projectBtn.addEventListener("click", showProjectModal);
}

let employeeBtn = document.getElementById("employeeBtn");
if (employeeBtn) {
  employeeBtn.addEventListener("click", showEmployeeModal);
}

let settingsBtn = document.getElementById("settingsBtn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", showSettingsModal);
}
