const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
window.onload = function () {
  tasks.forEach(task => renderTask(task));
};

function addTask() {
  const taskText = taskInput.value.trim();
  const taskDue = dueDate.value;
  const taskPriority = priority.value;

  if (taskText === "") return alert("Task cannot be empty!");

  const task = {
    id: Date.now(),
    text: taskText,
    due: taskDue,
    priority: taskPriority
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  taskInput.value = "";
  dueDate.value = "";
  priority.value = "Medium";
}

function renderTask(task) {
  const li = document.createElement("li");

  const details = document.createElement("div");
  details.className = "task-details";

  const span = document.createElement("span");
  span.textContent = task.text;

  const info = document.createElement("small");
  info.innerHTML = `Due: ${task.due || "Not set"} | Priority: <span class="priority-${task.priority}">${task.priority}</span>`;

  details.appendChild(span);
  details.appendChild(info);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTask(task.id, span, info);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  };

  li.appendChild(details);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function editTask(taskId, textSpan, infoElement) {
  const task = tasks.find(t => t.id === taskId);
  const newText = prompt("Edit task:", task.text);
  if (newText === null || newText.trim() === "") return;

  const newDue = prompt("Edit due date (YYYY-MM-DD):", task.due);
  const newPriority = prompt("Edit priority (Low/Medium/High):", task.priority);

  task.text = newText.trim();
  task.due = newDue;
  task.priority = newPriority;

  saveTasks();

  textSpan.textContent = task.text;
  infoElement.innerHTML = `Due: ${task.due || "Not set"} | Priority: <span class="priority-${task.priority}">${task.priority}</span>`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
