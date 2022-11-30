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
    createProject.addEventListener("click", handleCreateProject)
  }
};

const handleCreateProject = async (event) => {
  try {
    event.preventDefault();

    const project_name = document.getElementById("project_name").value;
    const description = document.getElementById("description").value;
    const due_date = document.getElementById("due_date").value;
    const div_id = document.getElementById("div_id").value;

    const response = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify({ project_name, description, div_id, due_date }),
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (response.ok) {
      location.reload();
    }

  } catch (error) {
    console.error(error);
  }
}

let divisionBtn = document.getElementById("divisionBtn");
if (divisionBtn) {
  divisionBtn.addEventListener("click", showDivisionModal);
}

let projectBtn = document.getElementById("projectBtn");
if (projectBtn) {
  projectBtn.addEventListener("click", showProjectModal);
}
