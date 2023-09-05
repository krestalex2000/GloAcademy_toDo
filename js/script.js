"use strict"

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = [];

const init = function () {

  if(localStorage.getItem("todo")) {
    const data = JSON.parse(localStorage.getItem("todo"));
  
    data.forEach(function(item) {
      toDoData.push(item);
    });
  
    if(toDoData.length) {
      render()
    }
  }
}

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function(item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

      if(item.completed) {
        todoCompleted.append(li);
      } else {

        todoList.append(li);
      }

      li.querySelector(".todo-complete").addEventListener("click", function() {
        item.completed = !item.completed;
        localStorage.setItem("todo", JSON.stringify(toDoData));
        render()
      });

      li.querySelector(".todo-remove").addEventListener("click", function() {
        toDoData.splice(index, 1);
        localStorage.setItem("todo", JSON.stringify(toDoData));
        render()
      });

  });

}

todoControl.addEventListener("submit", function(e) {
  e.preventDefault();

  const newToDO = {
    text: headerInput.value,
    completed: false,
  };

  if(headerInput.value.trim()) {
    toDoData.push(newToDO);
    headerInput.value = "";
  }
  
  
  localStorage.setItem("todo", JSON.stringify(toDoData));
  render();
});


init()