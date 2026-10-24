

const emptyMessage = document.getElementById("emptyMessage");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
// Display task on webpage
function displayTask(task) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;

checkbox.addEventListener("change", async function () {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: task.title,
            completed: checkbox.checked
        })
    });

    if (response.ok) {
        task.completed = checkbox.checked;
        span.style.textDecoration =
            task.completed ? "line-through" : "none";

        message.textContent = "Task status updated!";
    } else {
        checkbox.checked = !checkbox.checked;
        message.textContent = "Could not update task!";
    }
});

span.style.textDecoration =
    task.completed ? "line-through" : "none";
    span.textContent = task.title;

    // EDIT BUTTON
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.background = "#6254d9";

    editButton.addEventListener("click", async function () {

        const updatedTitle = prompt(
            "Enter updated task:",
            task.title
        );

        if (!updatedTitle || updatedTitle.trim() === "") {
            return;
        }

        const response = await fetch(`/api/tasks/${task.id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: updatedTitle.trim()
            })

        });

        if (response.ok) {

            const updatedTask = await response.json();

            span.textContent = updatedTask.title;
            task.title = updatedTask.title;

            message.textContent = "Task updated successfully!";

        }
    });


    // DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async function () {

        const response = await fetch(`/api/tasks/${task.id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            li.remove();
            updateStats();

            message.textContent = "Task deleted successfully!";

        }
    });


    // Add buttons and task to list
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    updateStats();
}
function updateStats() {
    const allTasks = taskList.querySelectorAll("li");
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');

    const total = allTasks.length;

    let completed = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            completed++;
        }
    });

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    if (total === 0) {
    emptyMessage.style.display = "block";
} else {
    emptyMessage.style.display = "none";
}
}

// GET API - Fetch all tasks
async function getTasks() {

    const response = await fetch("/api/tasks");

    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        displayTask(task);

    });
    updateStats();
}


// POST API - Add new task
taskForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        return;
    }

    const response = await fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: taskName
        })

    });

    if (response.ok) {

        const newTask = await response.json();

        displayTask(newTask);

        taskInput.value = "";

        message.textContent = "Task added successfully!";
        updateStats();

    }

});


// Load tasks when page opens
getTasks();
