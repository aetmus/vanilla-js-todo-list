(function() {
  const todosList = document.getElementById('todos-list');
  const form = document.getElementById('add-todo');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // create a unique ID
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // add a todo
  function addTodo(e) {
    e.preventDefault();
    const title = this.querySelector('[name=todo]').value;
    const id = uuidv4();
    const todo = { title, id, done: false };
    todos.push(todo);
    populateList(todos, todosList);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.reset();
  }

  // function to update UI
  function populateList(todos = [], todosList) {
    todosList.innerHTML = todos
      .map((todo, i) => {
        return `
        <li class="todo">
          <input type="checkbox" data-index=${i} id=${todo.id} ${todo.done ? 'checked' : ''} />
          <label class="todo-text ${todo.done ? 'done' : ''}" for="${todo.id}">${todo.title}
          </label> 
          <i class="material-icons" data-index=${i}>delete</i>
        </li>
        `;
      }).join('');
  }

  // Delete a todo
  function deleteTodo(e) {
    // don't do anything unless the trash icon is clicked
    if (!e.target.matches('i')) return;
    const el = e.target;
    const index = el.dataset.index;
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    populateList(todos, todosList);
  }

  function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
    populateList(todos, todosList);
  }

  // hook up event listeners
  form.addEventListener('submit', addTodo);
  todosList.addEventListener('click', deleteTodo);
  todosList.addEventListener('click', toggleDone);


  // Update UI on load
  populateList(todos, todosList);
})()