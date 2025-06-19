const taskInput = document.getElementById('task');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filters = document.querySelectorAll('.filters button');
const themeToggle = document.getElementById('theme-toggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  let filtered = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
      <div>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt('Edit Task:', tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Filter buttons
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Initial render
renderTasks();