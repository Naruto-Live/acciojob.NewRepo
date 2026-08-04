const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const heading = document.getElementById("heading");

// ----------------------------
// Function to clear old table
// ----------------------------

function clearTable(){

    tableHead.innerHTML="";
    tableBody.innerHTML="";

}

// ----------------------------
// Display Posts
// ----------------------------

function displayPosts(data){

    clearTable();

    heading.innerText="Posts";

    tableHead.innerHTML=`
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
        </tr>
    `;

    data.posts.forEach(post=>{

        tableBody.innerHTML+=`
            <tr>

                <td>${post.id}</td>

                <td>${post.title}</td>

                <td>${post.body}</td>

            </tr>
        `;

    });

}

// ----------------------------
// Display Products
// ----------------------------

function displayProducts(data){

    clearTable();

    heading.innerText="Products";

    tableHead.innerHTML=`
        <tr>

            <th>ID</th>

            <th>Title</th>

            <th>Price</th>

            <th>Category</th>

        </tr>
    `;

    data.products.forEach(product=>{

        tableBody.innerHTML+=`

            <tr>

                <td>${product.id}</td>

                <td>${product.title}</td>

                <td>$${product.price}</td>

                <td>${product.category}</td>

            </tr>

        `;

    });

}

// ----------------------------
// Display Todos
// ----------------------------

function displayTodos(data){

    clearTable();

    heading.innerText="Todos";

    tableHead.innerHTML=`

        <tr>

            <th>ID</th>

            <th>Todo</th>

            <th>Completed</th>

        </tr>

    `;

    data.todos.forEach(todo=>{

        tableBody.innerHTML+=`

            <tr>

                <td>${todo.id}</td>

                <td>${todo.todo}</td>

                <td>${todo.completed}</td>

            </tr>

        `;

    });

}

// ----------------------------
// Promise API 1
// ----------------------------

function PromiseAPI1(){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            fetch("https://dummyjson.com/posts")

            .then(response=>response.json())

            .then(data=>{

                displayPosts(data);

                resolve(true);

            })

            .catch(error=>{

                console.log(error);

                reject(false);

            });

        },1000);

    });

}

// ----------------------------
// Promise API 2
// ----------------------------

function PromiseAPI2(){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            fetch("https://dummyjson.com/products")

            .then(response=>response.json())

            .then(data=>{

                displayProducts(data);

                resolve(true);

            })

            .catch(error=>{

                console.log(error);

                reject(false);

            });

        },2000);

    });

}

// ----------------------------
// Promise API 3
// ----------------------------

function PromiseAPI3(){

    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            fetch("https://dummyjson.com/todos")

            .then(response=>response.json())

            .then(data=>{

                displayTodos(data);

                resolve(true);

            })

            .catch(error=>{

                console.log(error);

                reject(false);

            });

        },3000);

    });

}

// ----------------------------
// Start Promise Chain
// ----------------------------

function startPromises(){

    PromiseAPI1()

    .then(result=>{

        if(result){

            return PromiseAPI2();

        }

    })

    .then(result=>{

        if(result){

            return PromiseAPI3();

        }

    })

    .then(result=>{

        if(result){

            console.log("All APIs Completed");

        }

    })

    .catch(error=>{

        console.log(error);

    });

}