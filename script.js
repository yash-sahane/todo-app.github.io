const todoBtn = document.querySelector('.todo-button')
const todoInput = document.getElementById('todo-input')
const mainTodoDiv = document.querySelector('.todo-items')
const filterOption = document.querySelector('.todo-filter-select-div')
// const deleteBtn = document.querySelector('.todo-trash')

const todofun = () => {
    if (todoInput.value === '') {
        document.querySelector('.validation-text').style.display = 'block'
    } else {
        document.querySelector('.validation-text').style.display = 'none'

        // creating div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo-div')

        // creating li
        const todoItem = document.createElement('li')
        todoItem.classList.add('todo-item')
        todoItem.innerText = todoInput.value
        todoDiv.appendChild(todoItem)

        // addding into local storage
        addIntoStorage(todoInput.value)

        // creating check button
        todoCheck = document.createElement('button')
        todoCheck.classList.add('todo-check', 'todo-btn')
        todoCheck.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(todoCheck)

        // creating delete button
        const todoDelete = document.createElement('button')
        todoDelete.classList.add('todo-trash', 'todo-btn')
        todoDelete.innerHTML = '<i class="fas fa-trash"></i>'
        todoDiv.appendChild(todoDelete)

        // append whole div in mainTodoDiv
        mainTodoDiv.appendChild(todoDiv)

        todoInput.value = ''
    }
}

const todoSetting = (e) => {
    const ele = e.target
    if (ele.classList[0] === 'todo-check') {
        ele.parentElement.classList.toggle('completed')
        ele.classList.toggle('checkCompleted')
    } else if (ele.classList[0] === 'todo-trash') {
        element = ele.parentElement
        element.classList.add('remove')
        removeFromStorage(element)
        // proper way
        element.addEventListener('transitionend', function () {
            element.remove()
            removeFromStorage(ele.value)
        })
        // using setTimeout function
        // setTimeout(() => {
        //     element.remove()
        // }, 500);
    }
}


function todoFilter(e) {
    const todos = mainTodoDiv.childNodes;
    for (let i = 1; i <= todos.length; i++) {
        switch (e.target.value) {
            case "All":
                todos[i].style.display = "flex";
                break;
            case "Completed":
                if (todos[i].classList.contains("completed")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "Uncompleted":
                if (!todos[i].classList.contains("completed")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
        }
    }
}

// localStorage.clear()
function addIntoStorage(todo) {
    let todos = parseFunction()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getFromStorage(todo) {
    let todos = parseFunction()
    todos.forEach((todo) => {
        // creating div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo-div')

        // creating li
        const todoItem = document.createElement('li')
        todoItem.classList.add('todo-item')
        todoItem.innerText = todo
        todoDiv.appendChild(todoItem)

        // creating check button
        todoCheck = document.createElement('button')
        todoCheck.classList.add('todo-check', 'todo-btn')
        todoCheck.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(todoCheck)

        // creating delete button
        const todoDelete = document.createElement('button')
        todoDelete.classList.add('todo-trash', 'todo-btn')
        todoDelete.innerHTML = '<i class="fas fa-trash"></i>'
        todoDiv.appendChild(todoDelete)

        // append whole div in mainTodoDiv
        mainTodoDiv.appendChild(todoDiv)
    })
}

function removeFromStorage(todo) {
    let todos = parseFunction()
    let Text = todo.children[0].innerText
    todos.splice(todos.indexOf(Text), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function parseFunction() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}
todoBtn.addEventListener('click', todofun)
mainTodoDiv.addEventListener('click', todoSetting)
filterOption.addEventListener('click', todoFilter)
document.addEventListener('DOMContentLoaded', getFromStorage)

