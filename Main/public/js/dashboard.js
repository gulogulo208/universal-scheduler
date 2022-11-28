const showDivisionModal = () => {
  $("#divisionModal").show();

  const createDivision = document.getElementById("createDivision");
  const div_name = document.getElementById("div_name").value;

  if (createDivision) {
    createDivision.addEventListener("click", async (event) => {
      try {
        event.preventDefault();
        const response = await fetch("/api/division", {
          method: "POST",
          body: JSON.stringify(div_name),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          document.location.replace("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
};

let divisionBtn = document.getElementById("divisionBtn");
if (divisionBtn) {
  divisionBtn.addEventListener("click", showDivisionModal);
}
