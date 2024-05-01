// Get the task input element
const taskInput = document.querySelector("#task-input");

// Get the task list element
const taskList = document.querySelector("#task-list");

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
renderTasks();

// Add event listener to task input
taskInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    const taskName = taskInput.value.trim();
    if (taskName) {
      addTask(taskName);
      taskInput.value = "";
    }
  }
});

// Add task to local storage and render on page
function addTask(name) {
  const task = {
    name,
    completed: false,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render tasks on page
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      toggleTaskCompleted(index);
    });
    const span = document.createElement("span");
    span.textContent = task.name;
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = 0.5;
    }
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editTask(index);
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Toggle task completed status
function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task from local storage and render on page
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Edit task name in local storage and render on page
function editTask(index) {
  const newName = prompt("Enter new task name:", tasks[index].name);
  if (newName) {
    tasks[index].name = newName;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}
