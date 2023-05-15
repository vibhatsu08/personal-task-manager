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
        saveTasksToLocalStorage();
    }
    displayTasks();
}

function clearTasks(){
    tasks = [];
    saveTasksToLocalStorage();
    displayTasks();
}

function displayTasks(){
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";

    const tasksJSON = localStorage.getItem("tasks");
    tasks = tasksJSON ? JSON.parse(tasksJSON) : [];

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskDesc = document.createElement("span");
        taskDesc.textContent = task.description;
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

function deleteTask(index){
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    displayTasks();
}

function saveTasksToLocalStorage(){
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJSON);
}


const createTaskButton = document.getElementById("create-task-button");
const clearTasksButton = document.getElementById("clear-tasks-button");

createTaskButton.addEventListener("click", createTask);
clearTasksButton.addEventListener("click", clearTasks)

displayTasks();
