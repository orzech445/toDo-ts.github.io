import { Category } from "../types/types";

export const renderCategories = (categories: Category[], categoryContainer: HTMLElement) => {
    categories.forEach((category, index) => {
        const categoryEl: HTMLLIElement = document.createElement('li');

        const inputCategoryEl: HTMLInputElement = document.createElement('input');
        inputCategoryEl.type = 'radio';
        inputCategoryEl.name = 'category';
        inputCategoryEl.id = `category-${category}`;
        inputCategoryEl.value = category;
        index == 0 ? inputCategoryEl.checked = true : inputCategoryEl.checked = false;

        const labelCategoryEl: HTMLLabelElement = document.createElement('label');
        labelCategoryEl.setAttribute('for', `category-${category}`);
        labelCategoryEl.innerText = category;

        categoryEl.appendChild(inputCategoryEl);
        categoryEl.appendChild(labelCategoryEl);

        categoryContainer.appendChild(categoryEl);
    })
}