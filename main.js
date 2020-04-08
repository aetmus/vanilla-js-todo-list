(function() {
  const todosDiv = document.getElementById('todos-list');
  const form = document.getElementById('add-todo');

  let todos = [];

  // create html for a todo object
  function createHTMLfromTodoObject(todo) {
    return `
  <div class="todo">
  <p class="todo-text" key="${todo.id}">${todo.title}</p>
  <i class="material-icons">delete</i>
  </div>
  `;
  }

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
    const title = form[0].value;
    let id = uuidv4();
    let newTodo = { title, id };
    todos.push(newTodo);
    updateUI();
    form[0].value = '';
  }

  // function to update UI
  function updateUI() {
    if (todos.length === 0) {
      todosDiv.innerHTML = '';
    } else {
      todosDiv.innerHTML = '<h2>Todos</h2>'
    }
    todos.forEach(todo => {
      const todoHTML = createHTMLfromTodoObject(todo);
      todosDiv.innerHTML += todoHTML;
    });
    addDeleteEventListeners();
  }

  // Delete a todo
  function deleteTodo(e) {
    let todoIDtoDelete = e.target.previousElementSibling.attributes.key.value;
    let newTodosArray = todos.filter(todo => todo.id !== todoIDtoDelete);
    todos = [...newTodosArray];
    updateUI();
  }

  // hook up event listeners
  form.addEventListener('submit', addTodo);

  // add event listeners to delete buttons
  function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.material-icons');
    deleteButtons.forEach(button => button.addEventListener('click', deleteTodo));
  }

  // Update UI on load
  updateUI();
})()