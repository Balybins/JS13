'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);
        
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            }
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('Поле с планами должно быть заполненно!!!');
            this.input.value = '';
        }
    }

    generateKey() {
        return Math.random().toString(32).substring(2, 15) + Math.random().toString(32).substring(2, 15);
    }

    completedItem(key) {
        this.todoData.forEach((elem) => {
            if (elem.key === key) {
                if (elem.completed){
                    elem.completed = false;
                } else {
                    elem.completed = true;
                }
                this.addToStorage();
                this.render();
            }
        })
    }

    deleteItem(key) {
        this.todoData.delete(key);
        this.addToStorage();
        this.render();
    }

    editItem(target, key) {
        let text = target.offsetParent.offsetParent.firstElementChild;
        text.contentEditable = true;
        text.focus();

        const editText = () => {
            if (text.textContent.trim()) {
                this.todoData.forEach((elem) => {
                    if (elem.key === key) {
                        elem.value = text.textContent.trim();
                    }
                })
            } else {
                alert('Поле с планами должно быть заполненно!!!');
            }
            this.addToStorage();
            this.render();
            text.removeEventListener('blur', editText);
        }
        text.addEventListener('blur', editText);
    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');

        todoContainer.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('todo-remove')){
                this.deleteItem(event.target.offsetParent.offsetParent.key);
            } else if (target.classList.contains('todo-complete')) {
                this.completedItem(event.target.offsetParent.offsetParent.key);
            } else if (target.classList.contains('todo-edit')) {
                this.editItem(event.target, event.target.offsetParent.offsetParent.key);
            }
        })
        
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
