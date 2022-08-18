import { Task, Category } from "./types/types.js";
import { renderCategories } from "./helpers/render-categories-helper.js";

const categoryContainer: HTMLUListElement = document.querySelector(".category-container");
const todoContainer: HTMLUListElement = document.querySelector(".todo-container");
const todoTitleEl: HTMLInputElement = document.querySelector('#todo-title');
const addBtn: HTMLButtonElement = document.querySelector(".add");

let tasks: Task[] = JSON.parse(localStorage.getItem('todoElements'));

let randomId = 0;

const categories: Category[] = [
    Category.GENERAL,
    Category.WORK,
    Category.GYM,
    Category.HOBBY
]

if (tasks) {
    tasks.forEach((task) => {
        addTodoFromLS(task);
    });
}

addBtn.addEventListener('click', (e: Event) => {
    e.preventDefault();

    addTodoToContainer();
});

function addTodoToContainer() {
    if (todoTitleEl.value) {
        const selectedRadioEl: HTMLInputElement = document.querySelector("input[type='radio']:checked");
        const selectedCategory: Category = selectedRadioEl.value as Category;

        randomId++;

        const todoEl: HTMLLIElement = document.createElement('li');
        todoEl.classList.add(selectedCategory);

        const labelTaskEl: HTMLLabelElement = document.createElement('label');
        labelTaskEl.setAttribute('for', `task-${randomId}`);
        labelTaskEl.innerText = todoTitleEl.value;

        const inputTaskEl: HTMLInputElement = document.createElement('input');
        inputTaskEl.type = 'checkbox';
        inputTaskEl.id = `task-${randomId}`;

        inputTaskEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');

            updateLS();
        });

        const spanTaskEl: HTMLSpanElement = document.createElement('span');
        spanTaskEl.classList.add('cross');
        spanTaskEl.innerHTML = '&#10060;';

        const categoryTitleEl: HTMLParagraphElement = document.createElement('p');
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

function addTodoFromLS(todo: Task) {

    randomId++;

    const todoEl: HTMLLIElement = document.createElement('li');
    todoEl.classList.add(todo.category);

    const labelTaskEl: HTMLLabelElement = document.createElement('label');
    labelTaskEl.setAttribute('for', `task-${randomId}`);
    labelTaskEl.innerText = todo.title;

    const inputTaskEl: HTMLInputElement = document.createElement('input');
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

    const spanTaskEl: HTMLSpanElement = document.createElement('span');
    spanTaskEl.classList.add('cross');
    spanTaskEl.classList.add(`${randomId}`);
    spanTaskEl.innerHTML = '&#10060;';

    const categoryTitleEl: HTMLParagraphElement = document.createElement('p');
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
    const todoEls: HTMLLIElement[] = document.querySelectorAll('.todo-container li');

    const tasksTabTmp: Task[] = [];

    const todoElsLabel: HTMLLabelElement[] = document.querySelectorAll('.todo-container label');

    todoEls.forEach((el, index) => {
        const isCompleted: boolean = el.classList.contains('completed');

        const categoryTmp: Category = el.className.split(" ")[0] as Category;

        const taskTmp: Task = { title: todoElsLabel[index].innerText, done: isCompleted, category: categoryTmp };

        tasksTabTmp.push(taskTmp);
    });

    localStorage.setItem('todoElements', JSON.stringify(tasksTabTmp));
}

renderCategories(categories, categoryContainer);