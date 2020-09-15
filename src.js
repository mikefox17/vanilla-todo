//Selectors
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
//Event Listeners
todoButton.addEventListener("click", createTodo);
todoList.addEventListener("click", createMark);
todoList.addEventListener("click", deleteMark);
//Functions
function createTodo(e) {
  e.preventDefault();

  //To DO Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  console.log(newTodo);
  todoDiv.appendChild(newTodo);

  //Checkmark button
  const completedBtn = document.createElement("button");
  completedBtn.classList.add("completed-btn");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completedBtn);

  //Trash button
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashBtn);

  //Append to todo-list
  todoList.appendChild(todoDiv);

  //Clear the input
  todoInput.value = "";
}
//Delete todo
function deleteMark(e) {
  const item = e.target;

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.remove();
  }
}

//Check todo
function createMark(e) {
  const item = e.target;

  if (item.classList.contains("completed-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
