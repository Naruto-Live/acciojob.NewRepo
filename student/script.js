let studentData = [...students];

const tbody = document.getElementById("tbody");

displayStudents(studentData);

function displayStudents(data) {

    tbody.innerHTML="";

    data.forEach(student=>{

        let row=document.createElement("tr");

        row.innerHTML=`

        <td>${student.id}</td>

        <td>

            <div class="name-cell">

                <img src="${student.img_src}">

                ${student.first_name} ${student.last_name}

            </div>

        </td>

        <td>${student.gender}</td>

        <td>${student.class}</td>

        <td>${student.marks}</td>

        <td>${student.passing ? "Passing":"Failed"}</td>

        <td>${student.email}</td>

        `;

        tbody.appendChild(row);

    });

}







// for Search button
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

function searchStudents() {

    const text = searchInput.value.toLowerCase();

    const filtered = studentData.filter((student) => {

        return (
            student.first_name.toLowerCase().includes(text) ||
            student.last_name.toLowerCase().includes(text) ||
            student.email.toLowerCase().includes(text)
        );

    });

    displayStudents(filtered);
}

searchBtn.addEventListener("click", searchStudents);

// Search while typing
searchInput.addEventListener("input", searchStudents);




// sorting a - z
document.getElementById("az").addEventListener("click", () => {

    let sorted = [...studentData];

    sorted.sort((a, b) => {

        let nameA = a.first_name + " " + a.last_name;
        let nameB = b.first_name + " " + b.last_name;

        return nameA.localeCompare(nameB);

    });

    displayStudents(sorted);

});


// sort via z - a
document.getElementById("za").addEventListener("click", () => {

    let sorted = [...studentData];

    sorted.sort((a, b) => {

        let nameA = a.first_name + " " + a.last_name;
        let nameB = b.first_name + " " + b.last_name;

        return nameB.localeCompare(nameA);

    });

    displayStudents(sorted);

});


// sort via marks
document.getElementById("marks").addEventListener("click", () => {

    let sorted = [...studentData];

    sorted.sort((a, b) => a.marks - b.marks);

    displayStudents(sorted);

});


// sort via passing
document.getElementById("passing").addEventListener("click", () => {

    let passingStudents = studentData.filter(student => student.passing);

    displayStudents(passingStudents);

});


// sort via class
document.getElementById("class").addEventListener("click", () => {

    let sorted = [...studentData];

    sorted.sort((a, b) => a.class - b.class);

    displayStudents(sorted);

});


// sort via gender
document.getElementById("gender").addEventListener("click", () => {

    document.getElementById("mainTable").style.display = "none";

    const males = studentData.filter(student => student.gender === "Male");
    const females = studentData.filter(student => student.gender === "Female");

    const container = document.getElementById("genderTables");
    container.style.display = "block";

    container.innerHTML = `
        <h2>Female Students</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${createRows(females)}
            </tbody>
        </table>

        <br><br>

        <h2>Male Students</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${createRows(males)}
            </tbody>
        </table>
    `;
});



// sort via helper
function createRows(data) {

    return data.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>
                <div class="name-cell">
                    <img src="${student.img_src}">
                    ${student.first_name} ${student.last_name}
                </div>
            </td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.email}</td>
        </tr>
    `).join("");

} 