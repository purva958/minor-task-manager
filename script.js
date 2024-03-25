// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var li = document.createElement("li");
        li.textContent = taskText;

        li.addEventListener("click", toggleTaskCompletion);

        taskList.appendChild(li);
        taskInput.value = "";
        saveTasksToLocalStorage();
    }
}

// Function to toggle task completion
function toggleTaskCompletion() {
    this.classList.toggle("completed");
    saveTasksToLocalStorage();
}

// Function to clear completed tasks
function clearCompletedTasks() {
    var completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach(function(task) {
        task.remove();
    });
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    var tasks = document.querySelectorAll("#taskList li");
    var taskArray = [];
    tasks.forEach(function(task) {
        taskArray.push({
            task: task.textContent,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(task) {
            var li = document.createElement("li");
            li.textContent = task.task;
            if (task.completed) {
                li.classList.add("completed");
            }
            li.addEventListener("click", toggleTaskCompletion);
            document.getElementById("taskList").appendChild(li);
        });
    }
}

// Add event listeners
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("clearCompletedBtn").addEventListener("click", clearCompletedTasks);

// Load tasks when the page loads
window.onload = loadTasksFromLocalStorage;
