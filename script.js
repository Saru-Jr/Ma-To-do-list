// === Sélecteurs ===
const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// === Fonctions ===

// Enregistrer dans localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Afficher la liste filtrée
function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.done;
    if (currentFilter === 'done') return task.done;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleDone(${index})">✅</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Ajouter une tâche
function addTask() {
  const text = input.value.trim();
  if (text !== '') {
    tasks.push({ text, done: false });
    input.value = '';
    saveTasks();
    renderTasks();
  }
}

// Marquer comme fait / pas fait
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// Supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Changer de filtre
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderTasks();
  });
});

// Événement ajout
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

// Initialisation
renderTasks();
