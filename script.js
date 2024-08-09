/**
 * Manages a todo list stored in the browser's localStorage.
 * Provides functions to add, remove, and retrieve todos.
 */
function removeSingleTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  retrieveTodos();
}

function retrieveTodos() {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const listContainer = document.getElementsByClassName("todo-list")[0];
  const checkedStates = Array.from(
    listContainer.querySelectorAll('input[type="checkbox"]')
  ).map((cb) => cb.checked);
  listContainer.innerHTML = "";
  storedTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checkedStates[index] || false;
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(todo));

    // Add close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "✕"; // "X" character
    closeButton.className = "close-btn";
    li.appendChild(closeButton);

    closeButton.onclick = () => removeSingleTodo(index);

    listContainer.appendChild(li);

    // Apply line-through style if checkbox is checked
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
    });

  });
  let todoLength = storedTodos.length;
  const showTotalTodo = document.getElementById("total_todo");
  showTotalTodo.innerHTML = `${todoLength} items total`;
}

retrieveTodos();

function addTodo() {
  let todo = document.getElementById("new_todo");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo.value);
  localStorage.setItem("todos", JSON.stringify(todos));
  todo.value = "";
  retrieveTodos();
}

function removeAllTodo() {
  localStorage.removeItem("todos");
  retrieveTodos();
}
