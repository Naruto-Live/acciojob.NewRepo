let arr = [
    { id: 1, name: "john", age: "18", profession: "developer" },
    { id: 2, name: "jack", age: "20", profession: "developer" },
    { id: 3, name: "karen", age: "19", profession: "admin" },
  ];
  
  function PrintDeveloperbyMap() {
    arr.map((i) => {
      if (i.profession === "developer") {
        console.log(
          `id : ${i.id}, Name : ${i.name}, Age : ${i.age}, Profession : ${i.profession}`
        );
      }
    });
  }
  
  function PrintDeveloperbyForEach() {
    arr.forEach((i) => {
      if (i.profession === "developer") {
        console.log(
          `id : ${i.id}, Name : ${i.name}, Age : ${i.age}, Profession : ${i.profession}`
        );
      }
    });
  }
  
  function addData() {
    let temp = { id: 4, name: "Neel", age: "27", profession: "Engineer" };
    arr.push(temp);
    arr.map((i) =>
      console.log(
        `id : ${i.id}, Name : ${i.name}, Age : ${i.age}, Profession : ${i.profession}`
      )
    );
  }
  
  function removeAdmin() {
    arr = arr.filter((i) => i.profession !== "admin");
    arr.map((i) =>
      console.log(
        `id : ${i.id}, Name : ${i.name}, Age : ${i.age}, Profession : ${i.profession}`
      )
    );
  }
  
  function concatenateArray() {
    let arr1 = [
      { id: 7, name: "Ravi", age: "28", profession: "developer" },
      { id: 5, name: "Kumar", age: "24", profession: "admin" },
      { id: 6, name: "Lokesh", age: "28", profession: "manager" },
    ];
    arr = arr.concat(arr1);
    arr.map((i) =>
      console.log(
        `id : ${i.id}, Name : ${i.name}, Age : ${i.age}, Profession : ${i.profession}`
      )
    );
  }