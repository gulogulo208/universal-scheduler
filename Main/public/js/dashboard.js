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

let divisionBtn = document.getElementById("divisionBtn");
if (divisionBtn) {
  divisionBtn.addEventListener("click", showDivisionModal);
}