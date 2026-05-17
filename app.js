// Store tasks
let tasks = [];

// Get input element
const taskInput = document.getElementById("taskInput");

// Get add button
const addButton = document.getElementById("addButton");

// Get task list
const taskList = document.getElementById("taskList");

//Get task counter 
const taskCount =document.getElementById("taskCount");

//filter buttons
const allBtn=document.getElementById("allBtn");

const completeBtn=document.getElementById("completeBtn");

const pendingBtn= document.getElementById("pendingBtn");

//Save tasks to local storage 
const saveTasks =() => {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
};

//Update task counter 

const updateTaskCount= () => {
    
    taskCount.textContent =
    `Tasks ; ${tasks.length}`;
};


// Function to create task
const createTask = (taskObject) => {

    // Create list item
    const li = document.createElement("li");

    // Create span for task text
    const span = document.createElement("span");

    // Add text into span
    span.textContent = taskObject.text;

    // Create delete button
    const deleteButton = document.createElement("button");

    // Button text
    deleteButton.textContent = "Delete";

    // Add CSS class
    deleteButton.classList.add("delete-btn");

    //Check completed state
    if (taskObject.completed){

        li.classList.add("completed");
    }

    // Add span into list item
    li.appendChild(span);

    // Add button into list item
    li.appendChild(deleteButton);

    // Add task into page
    taskList.appendChild(li);


    // Toggle completed task
    span.addEventListener("click", () => {

        //Toggle CSS class 
        li.classList.toggle("completed");

        //Update object value 
        taskObject.completed=!taskObject.completed;

        //Save updated tasks
        saveTasks();
    });


    // Delete task
    deleteButton.addEventListener("click", () => {

    
        //Remove from tasks array
        tasks = tasks.filter((task) => {

            return task.id !== taskObject.id;

        });

        //Update counter
        updateTaskCount();

        //Re-render tasks
        renderTasks();


        //Save updated tasks
        saveTasks();
    });


};

//Render tasks
const renderTasks= (filteredTasks) => {
    
    //Clear existing tasks
    taskList.innerHTML ="";

    //Loop through filtered tasks
    filteredTasks.forEach((task) =>{

        createTask(task);
    });
};
// Function to add task
const addTask = () => {

    // Get input text
    const taskText = taskInput.value;

    // Prevent empty tasks
    if (taskText === "") {

        return;
    };

    //Create task object 
    const taskObject={

        id: Date.now(),

        text:taskText,

        completed :false

    };

    //Create task on page
    renderTasks(tasks);

    //Ad object into tasks array
    tasks.push(taskObject);

    //rendertasks
    renderTasks(tasks);

    //Update counter
    updateTaskCount();

    //Save tasks
    saveTasks();

    //clear input
    taskInput.value="";

};  



// Add button click event
addButton.addEventListener("click",() =>{

    addTask();

});


//Enter key support
taskInput.addEventListener("keydown",(event) => {
    
    // Check if enter key pressed 
    if (event.key=== "Enter") {

        addTask();
    }
});
// show all tasks
allBtn.addEventListener("click", () => {

    const completedTasks = 
        tasks.filter((task)=> {
            
            return task.commpleted;
        });

    renderTasks(completedTasks);    
});

//show pending tasks
pendingBtn.addEventListener("click", () =>{

    const pendingTasks = 
        tasks.filter((task) => {
           
            return !task.completed;
        });

    renderTasks(pendingTasks);

});


   

//Get saved tasks
const savedTasks=JSON.parse(
    localStorage.getItem("tasks")
);

//If tasks exist 
if (savedTasks){

    //Save into tasks array 
    tasks=savedTasks;

    //Loop through tasks
    tasks.forEach((task) =>{
        
        createTask(task);
    });
    // Update counter
    updateTaskCount();

}
