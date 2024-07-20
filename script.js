const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = [];

// Function to create a new task item
function createTodoItem(taskObj) {
  const li = document.createElement("li");
  li.dataset.id = taskObj.id;
  li.innerHTML = `
        <span class="task ${taskObj.completed ? "completed" : ""}">${
    taskObj.task
  }</span>
        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="status-btn">${
              taskObj.completed ? "Undo" : "Done"
            }</button>
        </div>
    `;
  li.querySelector(".status-btn").addEventListener("click", toggleCompleted);
  li.querySelector(".edit-btn").addEventListener("click", editTask);
  li.querySelector(".delete-btn").addEventListener("click", deleteTask);
  todoList.appendChild(li);
}

// Function to toggle completed status
function toggleCompleted(event) {
  const taskId = event.target.closest("li").dataset.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  renderTasks();
}

// Function to edit task
function editTask(event) {
  const li = event.target.closest("li");
  const taskId = li.dataset.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const newTask = prompt("Edit task:", tasks[taskIndex].task);
  if (newTask !== null) {
    tasks[taskIndex].task = newTask.trim();
    renderTasks();
  }
}

// Function to delete task
function deleteTask(event) {
  const li = event.target.closest("li");
  const taskId = li.dataset.id;
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Function to handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const task = input.value.trim();
  if (task !== "") {
    const taskObj = {
      id: Date.now().toString(),
      task: task,
      completed: false,
    };
    tasks.push(taskObj);
    createTodoItem(taskObj);
    input.value = "";
  }
});

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task) => createTodoItem(task));
}

// Initial tasks (optional)
createTodoItem({ id: "1", task: "Example task 1", completed: false });
createTodoItem({ id: "2", task: "Example task 2", completed: true });
