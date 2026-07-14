const container = document.getElementById("container");

function handleSubmit() {
  let msg = document.getElementById("msg_ref");
  let name = document.getElementById("name").value;
  let profession = document.getElementById("profession").value;
  let age = document.getElementById("age").value;
  let result = [];
  var id = "id" + Math.random().toString(16).slice(2);

  if (name === "" || profession === "" || age === "") {
    msg.innerHTML = `<span class="msg_error" >Error :Please Make sure All the field before adding in an emplyee</span> `;
    return;
  } else {
    msg.innerHTML = `<span class="nsg_success">Success : Message Added</span> `;
  }
  let localData = JSON.parse(localStorage.getItem("data"));
  result.push({ _id: id, name: name, profession: profession, age: age });

  if (localData) {
    localStorage.setItem("data", JSON.stringify([...localData, ...result]));
  } else {
    localStorage.setItem("data", JSON.stringify([...result]));
  }

  createElement();
  document.getElementById("name").value = "";
  document.getElementById("profession").value = "";
  document.getElementById("age").value = "";
}

function handleDelete(id) {
  let resultData = JSON.parse(localStorage.getItem("data"));
  let res = resultData.filter((val) => val._id !== id);
  localStorage.setItem("data", JSON.stringify(res));
  createElement();
}

function createElement() {
  let resultData = JSON.parse(localStorage.getItem("data"));

  if (resultData.length > 0) {
    container.innerHTML = resultData.map((val, i) => {
      return ` <div class="list_box">
<div class="paraContainer">
    <p>${val.name}</p>
    <p>${val.profession}</p>
    <p>${val.age}</p>
</div>

<button onclick="handleDelete('${val._id}')" >Delete</button>
</div> 
`;
    });
  } else {
    container.innerHTML = `<div class="data_not_found" >Data not found</div>`;
  }
}
createElement();
