// Store tasks
let tasks = [];

// Get input element
const taskInput = document.getElementById("taskInput");

// Get add button
const addButton = document.getElementById("addButton");

// Get task list
const taskList = document.getElementById("taskList");

//Save tasks to local storage 
const saveTasks =() => {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
};


// Function to create task
const createTask = (taskText) => {

    // Create list item
    const li = document.createElement("li");

    // Create span for task text
    const span = document.createElement("span");

    // Add text into span
    span.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement("button");

    // Button text
    deleteButton.textContent = "Delete";

    // Add CSS class
    deleteButton.classList.add("delete-btn");

    // Add span into list item
    li.appendChild(span);

    // Add button into list item
    li.appendChild(deleteButton);

    // Add task into page
    taskList.appendChild(li);


    // Toggle completed task
    span.addEventListener("click", () => {

        li.classList.toggle("completed");
    });


    // Delete task
    deleteButton.addEventListener("click", () => {

        li.remove();
    });

};


// Add button click event
addButton.addEventListener("click", () => {

    // Get input text
    const taskText = taskInput.value;

    // Prevent empty tasks
    if (taskText === "") {

        return;
    }

    // Create task
    createTask(taskText);

    // Add task to array 
    tasks.push(taskText);

    //Save tasks
    saveTasks();


    // Clear input
    taskInput.value = "";
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
}