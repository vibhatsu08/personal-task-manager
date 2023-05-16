function Task(description, tags, completed){
    this.description = description;
    this.tags = tags;
    this.completed = completed;
}

let tasks = [];

function createTask(){
    const taskDescription = prompt("Enter what the task is about:");
    const tags = prompt("What tags do you want for your task, tags are separated by spaces: ").trim();
    tagsArray = tags.split(/\s+/);

    if (taskDescription.length > 0) {
        const newTask = new Task(taskDescription, tagsArray, false);
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

        const taskElementContent = document.createElement("div");
        taskElementContent.classList.add("task-content");

        const taskDesc = document.createElement("div");
        taskDesc.textContent = task.description;

        const taskTagsContent = document.createElement("div");
        taskTagsContent.classList.add("task-tags-content");


        task.tags.forEach((taskTagElement) => {
            const taskTag = document.createElement("div");
            taskTag.classList.add("task-tag");
            taskTag.textContent = "#" + taskTagElement;
            taskTagsContent.appendChild(taskTag);
        });

        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-task");
        deleteButton.textContent = "delete";
        
        deleteButton.addEventListener("click", (event) => {
            deleteTask(index);
        });
        
        taskElementContent.appendChild(taskDesc);
        taskElementContent.appendChild(deleteButton);

        taskElement.appendChild(taskElementContent);
        taskElement.appendChild(taskTagsContent);
        tasksContainer.appendChild(taskElement)
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
