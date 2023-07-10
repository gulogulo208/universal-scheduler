const requestAssignEmployee = async (event) => {
    try {
        event.preventDefault();

        const empId = document.getElementById("employee_id").value.trim();
        console.log("empId", empId)

        const projId = document.getElementById("project_id").value.trim();
        console.log("projId", projId)

        if (empId && projId) {
            const assignUser = await fetch("/api/project/assign", {
                method: "PUT", 
                body: JSON.stringify({ empId, projId })
            })
            if (assignUser.ok){
                location.reload();
        }
        }
    } catch (err){
        console.log(err)
    }
};

let addEmployee = document.getElementById("addEmployee");

if (addEmployee) {
    addEmployee.addEventListener('click', requestAssignEmployee)
};