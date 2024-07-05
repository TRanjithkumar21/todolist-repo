let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todolist");
    let parseTodoList = JSON.parse(stringifiedTodoList);
    if (parseTodoList === null) {
        return [];
    } else {
        return parseTodoList;
    }
}

let todolist = getTodoListFromLocalStorage();

let saveButton = document.getElementById("saveTodoButton");
saveButton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
}

function deleteEl(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteElementIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(deleteElementIndex, 1);
}

function isChecked(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoItemIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoItem = todolist[todoItemIndex];
    if (todoItem.isChecked === true) {
        todoItem.isChecked = false;
    } else {
        todoItem.isChecked = true;
    }
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;

    inputElement.onclick = function() {
        isChecked(checkboxId, labelId, todoId);
    }

    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.onclick = function() {
        deleteEl(todoId);
    };

    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todolist) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInput = userInputElement.value;

    if (userInput === "") {
        alert("Enter Valid Text");
        return;
    }
    let newTodo = {
        text: userInput,
        uniqueId: todolist.length + 1,
        isChecked: false
    };
    todolist.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}
console.log(todolist)