function Task(description, completed){
    this.description = description;
    this.completed = completed;
}

let tasks = [];

function createTask(){
    const taskDescription = prompt("Enter what the task is about:");
    if (taskDescription.length > 0) {
        const newTask = new Task(taskDescription, false);
        tasks.push(newTask);
    }
    displayTasks();
}

function displayTasks(){
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskDesc = document.createElement("span");
        taskDesc.textContent = task.description;

        // taskDesc.addEventListener("dblclick", () => {
        //     enterEditMode(taskDesc);
        // });

        taskElement.appendChild(taskDesc);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-task");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", (event) => {
            deleteTask(index);
        });

        taskElement.appendChild(deleteButton)
        tasksContainer.appendChild(taskElement);
    });
}

// function enterEditMode(element) {
//     const text = element.textContent;
//     const input = document.createElement("input");
//     input.value = text;
  
//     const finishEdit = () => {
//         const newText = input.value;
//         element.textContent = newText;
//         element.removeEventListener("blur", finishEdit);
//         element.addEventListener("dblclick", () => {
//         enterEditMode(element);
//         });
//     };
  
//     input.addEventListener("blur", finishEdit);
  
//     element.textContent = "";
//     element.appendChild(input);
  
//     input.focus();
//     input.setSelectionRange(0, input.value.length);
  
//     element.removeEventListener("dblclick", handleDoubleClick);
// }
  
//     function handleDoubleClick() {
//         enterEditMode(this);
// }
  
//     const taskElements = document.querySelectorAll(".task");
//     taskElements.forEach((taskElement) => {
//         taskElement.addEventListener("dblclick", handleDoubleClick);
// });
  

function deleteTask(index){
    tasks.splice(index, 1);
    displayTasks();
}

const createTaskButton = document.getElementById("create-task-button");
createTaskButton.addEventListener("click", createTask);

displayTasks();
