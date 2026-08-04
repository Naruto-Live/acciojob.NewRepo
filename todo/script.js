let today = []; 
let future = [];
let complete = [];

let task_detail = document.querySelector('.task_detail');
let date = document.querySelector('.date');
let priority = document.getElementById('priority');
    
    
    // This is the function to sort task according to their priority
    function toSortByPriority(task){
        return [...task].sort((a,b) => {
            const priority_order = { high: 3, medium: 2, low: 1};
            return priority_order[b.priority] - priority_order[a.priority];
        })
    }

    // This is Function use to capitalize the first letter of a priority while it is render
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // This function store all the array of object into one array 'todoList' which is stored into browser local storage.
    function updateLocalStorage() {
        const todoList = today.concat(future).concat(complete); 
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    //This Function is use to retrive data from local storage.
    function retrieveFromLocalStorage() {
        const storedData = localStorage.getItem('todoList');
        if (storedData) {
            const storedTodoList = JSON.parse(storedData); 
    
            const todayDate = new Date(); 
            todayDate.setHours(0, 0, 0, 0); 
            today = [];
            future = [];
            complete = [];
    
            storedTodoList.forEach(item => {
                const itemDate = new Date(item.date); 
                itemDate.setHours(0, 0, 0, 0);
                if (!item.complete && itemDate.getTime() === todayDate.getTime()) {
                    today.push(item);
                } else if (!item.complete && itemDate.getTime() > todayDate.getTime()) {
                    future.push(item);
                } else if (item.complete) {
                    complete.push(item);
                }
            });
        }
    }
    
    // This EventListener call the data store in localstorage and again render it.
    window.addEventListener('load', function(){
        retrieveFromLocalStorage();
        renderTodo(); 
    });

    //This EventListner triger's when main_btn is clicked in frontend and it push data to array above according to date.
    let main_btn = document.getElementById('main_btn');

    main_btn.addEventListener('click', function() {
        var selectedDate = new Date(date.value);
        var todayDate = new Date(); 

        selectedDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);


        if (task_detail.value === '' || date.value === '' || priority.value === '') { 
            //This alert comes when one of the field is empty.

            alert('Please Enter all detail');

        } else if (selectedDate.getTime() > todayDate.getTime()) {
            //Here, obtained data from input field are pushed into 'future' array.

            let NewEntry2 = {name: task_detail.value, date: selectedDate, priority: priority.value, complete: false};
            future.push(NewEntry2);
            renderTodo();

        } else if(selectedDate.getTime() === todayDate.getTime()){
            //Here, obtained data from input field are pushed into 'today' array.

            let NewEntry = {name: task_detail.value, date: selectedDate, priority: priority.value, complete: false};
            today.push(NewEntry);
            renderTodo();

        }else{
            alert('You Can not Enter past Date');
        }

        updateLocalStorage();
    })
   
    //This function is use to render tasks.
    function renderTodo(){
        let Today_box_container1 = document.querySelector('.Today_box_container1');
        let Today_box_container2 = document.querySelector('.Today_box_container2');
        let Today_box_container3 = document.querySelector('.Today_box_container3');
    
        Today_box_container1.innerHTML = '';
        Today_box_container2.innerHTML = '';
        Today_box_container3.innerHTML = '';

        // Sort tasks by priority before rendering
        const sortedToday = toSortByPriority(today);
        const sortedFuture = toSortByPriority(future);
        const sortedComplete = toSortByPriority(complete);

        let todayid = 0;
        let futureid = 0;
        let completeid = 0;
    
        sortedToday.forEach(item => {
            //this id is the s.no of each element
            todayid++;

            Today_box_container1.innerHTML += `
            <div class="box_body1">
                <div class="body_item1">
                    <p class="normal_text1">
                        ${todayid}. ${item.name}
                    </p>
                </div>
                <div class="body_item2">
                    <p class="normal_text1">
                        ${formatDate(item.date)}
                    </p>
                </div>
                <div class="body_item3">
                    <p class="normal_text1">
                    ${capitalizeFirstLetter(item.priority)}
                    </p>
                </div>
                <div class="body_item4">
                    <img src="img/check-circle 1.png" alt="" class="complete" data-task-type="today" data-task-index-today="${todayid - 1}"data-task-type="today" data-task-index-today="${todayid - 1}">
                    <img src="img/trash 1.png" alt="" class="delete" class="delete" data-task-type="today" data-task-index-today="${todayid - 1}">
                </div>
            </div>
            `;
        });
    
        sortedFuture.forEach(item => {
            //this id is the s.no of each element
            futureid++;

            Today_box_container2.innerHTML += `
            <div class="box_body1">
                <div class="body_item1">
                    <p class="normal_text1">
                        ${futureid}.${item.name}
                    </p>
                </div>
                <div class="body_item2">
                    <p class="normal_text1">
                        ${formatDate(item.date)}
                    </p>
                </div>
                <div class="body_item3">
                    <p class="normal_text1">
                        ${capitalizeFirstLetter(item.priority)}
                    </p>
                </div>
                <div class="body_item4">
                    <img src="img/check-circle 1.png" alt="" class="complete" data-task-type="future" data-task-index-future="${futureid - 1}">
                    <img src="img/trash 1.png" alt="" class="delete" data-task-type="future" data-task-index-future="${futureid - 1}">
                </div>
            </div>
            `;
        });
    
        sortedComplete.forEach(item => {
            //this id is the s.no of each element
            completeid++;

            Today_box_container3.innerHTML += `
            <div class="box_body2">
                <div class="body_item1">
                    <p class="normal_text2">
                        ${completeid}.${item.name}
                    </p>
                </div>
                <div class="body_item2">
                    <p class="normal_text2">
                        ${formatDate(item.date)}
                    </p>
                </div>
                <div class="body_item3">
                    <p class="normal_text2">
                        ${capitalizeFirstLetter(item.priority)}
                    </p>
                </div>
                <div class="body_item4">
                    <img src="img/2.png" alt="" class="colored-image delete" data-task-type="complete" data-task-index-complete="${completeid - 1}">
                </div>
            </div>
            `;
        });


        //complete functionality using EventListener
        let complete_btn = document.querySelectorAll('.complete');

        complete_btn.forEach(button => {
            button.addEventListener('click', function(){
                let task_type = this.getAttribute('data-task-type');
                let task_index_today = parseInt(this.getAttribute('data-task-index-today'));
                let task_index_future = parseInt(this.getAttribute('data-task-index-future'));

                if(task_type === 'today'){
                    // Remove the task from 'today' and push it to complete with complete status equal to true.

                    let data_to_be_pushed = today.splice(task_index_today, 1)[0]; 
                    data_to_be_pushed.complete = true;
                    complete.push(data_to_be_pushed);
                }
                else if(task_type === 'future'){
                    // Remove the task from 'future' and push it to complete with complete status equal to true.

                    let data_to_be_pushed = future.splice(task_index_future, 1)[0];
                    data_to_be_pushed.complete = true;
                    complete.push(data_to_be_pushed);
                }
                renderTodo();
                updateLocalStorage();
            })
        })


        //delete functionality using EventListener
        let delete_btn = document.querySelectorAll('.delete');

        delete_btn.forEach(button => {
            button.addEventListener('click', function(){
                let task_type = this.getAttribute('data-task-type');
                let task_index_today = parseInt(this.getAttribute('data-task-index-today'));
                let task_index_future = parseInt(this.getAttribute('data-task-index-future'));
                let task_index_complete = parseInt(this.getAttribute('data-task-index-complete'));

                if(task_type === 'today'){
                    today.splice(task_index_today, 1);
                }
                else if(task_type === 'future'){
                    future.splice(task_index_future, 1);
                }
                else if(task_type === 'complete'){
                    complete.splice(task_index_complete, 1);
                }
                renderTodo();
                updateLocalStorage();
            })
        })

    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return ''; // Return empty string if date is invalid
        }
        return date.toLocaleDateString('en-GB');
    }
    

