// Get input element
const taskInput =document.getElementById("taskInput");

//Get buttton element 
const addbutton=document.getElementById("addButton");

//Get task list
const tasklist=document.getElementById("tasklist");


//Add click event to button
addbutton.addEventListener("click", () => {
    
    // Get user input value
    const taskText=taskInput.value;
    
    //Prevent empty tasks
    if (taskText=== ""){

        return;
    }

    //Create a new list item
    const li=document.createElement("li");

    //Add text
    li.textContent=taskText;

    //Add to page
    tasklist.appendChild(li);

    //Clear input
    taskInput.value="";

    
});