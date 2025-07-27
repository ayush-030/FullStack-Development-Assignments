const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");

// Add new todo item
function addTodo() {
  const task = input.value.trim();
  if (task === "") return;

  // Create list item container
  const li = document.createElement("li");

  // Task text span
  const taskSpan = document.createElement("span");
  taskSpan.textContent = task;
  taskSpan.style.flex = "1";
  taskSpan.style.userSelect = "text";

  // Toggle complete on text click
  taskSpan.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Create delete button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "&times;"; // Cross symbol
  delBtn.className = "delete-btn";
  delBtn.setAttribute("aria-label", `Delete task: ${task}`);
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent completing the task on delete button click
    todoList.removeChild(li);
  });

  li.appendChild(taskSpan);
  li.appendChild(delBtn);
  todoList.appendChild(li);

  input.value = "";
  input.focus();
}

// Clear all tasks
function clearAll() {
  todoList.innerHTML = "";
  input.focus();
}

// Event listeners
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
clearBtn.addEventListener("click", clearAll);
