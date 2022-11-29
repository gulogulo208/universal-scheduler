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

    const response = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify({ project_name, description }),
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
};

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
