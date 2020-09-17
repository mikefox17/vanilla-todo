//Selectors
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearBtn = document.querySelector(".clear");
//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", createTodo);
todoList.addEventListener("click", createMark);
todoList.addEventListener("click", deleteMark);
clearBtn.addEventListener("click", clearAll);
//filterOption event change not click
filterOption.addEventListener("change", filterTodo);
//Functions
function createTodo(e) {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("Enter a todo item");
  } else {
    //To DO Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    //Add todo to localstorage
    saveLocalTodos(todoInput.value);

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
}
//Function Delete todo
function deleteMark(e) {
  const item = e.target;

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("click", function () {
      todo.remove;
    });
  }
}

//Fucntion Create Mark todo
function createMark(e) {
  const item = e.target;

  if (item.classList.contains("completed-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Filter todos childnode? switch?
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    console.log(todo);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Save to local storage
function saveLocalTodos(todo) {
  let todos;

  //check is there are todos in local
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //saving todos to local
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Get the todos from local storage
function getTodos() {
  let todos;

  //check if there are todos in local
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //To DO Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;

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
  });
}

function removeLocalTodos(todo) {
  let todos;

  //check if there are todos in local
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children.innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAll() {
  localStorage.clear();
  window.location.reload();
}
