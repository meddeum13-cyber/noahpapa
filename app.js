const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const itemsLeft = document.querySelector('#items-left');
const clearCompletedButton = document.querySelector('#clear-completed');

let todos = [];
let currentFilter = 'all';

function renderTodos() {
  list.innerHTML = '';

  const filtered = todos.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '삭제';
    deleteButton.type = 'button';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    list.appendChild(item);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  itemsLeft.textContent = `${remaining}개 남음`;
}

function addTodo(text) {
  todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addTodo(value);
  input.value = '';
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    renderTodos();
  });
});

clearCompletedButton.addEventListener('click', clearCompleted);

renderTodos();
