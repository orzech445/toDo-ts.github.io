import { Category } from "./types/types.js";
import { renderCategories } from "./helpers/render-categories-helper.js";
const categoryContainer = document.querySelector(".category-container");
const todoContainer = document.querySelector(".todo-container");
const todoTitleEl = document.querySelector('#todo-title');
const addBtn = document.querySelector(".add");
let tasks = JSON.parse(localStorage.getItem('todoElements'));
let randomId = 0;
const categories = [
    Category.GENERAL,
    Category.WORK,
    Category.GYM,
    Category.HOBBY
];
if (tasks) {
    tasks.forEach((task) => {
        addTodoFromLS(task);
    });
}
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodoToContainer();
});
function addTodoToContainer() {
    if (todoTitleEl.value) {
        const selectedRadioEl = document.querySelector("input[type='radio']:checked");
        const selectedCategory = selectedRadioEl.value;
        randomId++;
        const todoEl = document.createElement('li');
        todoEl.classList.add(selectedCategory);
        const labelTaskEl = document.createElement('label');
        labelTaskEl.setAttribute('for', `task-${randomId}`);
        labelTaskEl.innerText = todoTitleEl.value;
        const inputTaskEl = document.createElement('input');
        inputTaskEl.type = 'checkbox';
        inputTaskEl.id = `task-${randomId}`;
        inputTaskEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });
        const spanTaskEl = document.createElement('span');
        spanTaskEl.classList.add('cross');
        spanTaskEl.innerHTML = '&#10060;';
        const categoryTitleEl = document.createElement('p');
        categoryTitleEl.innerText = selectedCategory;
        spanTaskEl.addEventListener('click', () => {
            todoEl.remove();
            updateLS();
        });
        todoEl.appendChild(labelTaskEl);
        todoEl.appendChild(inputTaskEl);
        todoEl.appendChild(spanTaskEl);
        todoEl.appendChild(categoryTitleEl);
        todoContainer.appendChild(todoEl);
        todoTitleEl.value = '';
        updateLS();
    }
}
function addTodoFromLS(todo) {
    randomId++;
    const todoEl = document.createElement('li');
    todoEl.classList.add(todo.category);
    const labelTaskEl = document.createElement('label');
    labelTaskEl.setAttribute('for', `task-${randomId}`);
    labelTaskEl.innerText = todo.title;
    const inputTaskEl = document.createElement('input');
    inputTaskEl.type = 'checkbox';
    inputTaskEl.id = `task-${randomId}`;
    if (todo.done) {
        todoEl.classList.add('completed');
        inputTaskEl.checked = true;
    }
    inputTaskEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed');
        updateLS();
    });
    const spanTaskEl = document.createElement('span');
    spanTaskEl.classList.add('cross');
    spanTaskEl.classList.add(`${randomId}`);
    spanTaskEl.innerHTML = '&#10060;';
    const categoryTitleEl = document.createElement('p');
    categoryTitleEl.innerText = todo.category;
    spanTaskEl.addEventListener('click', () => {
        const crossId = Number(spanTaskEl.className.split(" ")[1]);
        todoEl.remove();
        updateLS();
    });
    todoEl.appendChild(labelTaskEl);
    todoEl.appendChild(inputTaskEl);
    todoEl.appendChild(spanTaskEl);
    todoEl.appendChild(categoryTitleEl);
    todoContainer.appendChild(todoEl);
}
function updateLS() {
    const todoEls = document.querySelectorAll('.todo-container li');
    const tasksTabTmp = [];
    const todoElsLabel = document.querySelectorAll('.todo-container label');
    todoEls.forEach((el, index) => {
        const isCompleted = el.classList.contains('completed');
        const categoryTmp = el.className.split(" ")[0];
        const taskTmp = { title: todoElsLabel[index].innerText, done: isCompleted, category: categoryTmp };
        tasksTabTmp.push(taskTmp);
    });
    localStorage.setItem('todoElements', JSON.stringify(tasksTabTmp));
}
renderCategories(categories, categoryContainer);
