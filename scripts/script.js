'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function () {
    if (localStorage.data) {
        todoData = JSON.parse(localStorage.data);
    }
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.data = JSON.stringify(todoData);
            render();
        });
    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        localStorage.data = JSON.stringify(todoData);
        headerInput.value = '';

        render();
    }
});

render();