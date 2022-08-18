export const renderCategories = (categories, categoryContainer) => {
    categories.forEach((category, index) => {
        const categoryEl = document.createElement('li');
        const inputCategoryEl = document.createElement('input');
        inputCategoryEl.type = 'radio';
        inputCategoryEl.name = 'category';
        inputCategoryEl.id = `category-${category}`;
        inputCategoryEl.value = category;
        index == 0 ? inputCategoryEl.checked = true : inputCategoryEl.checked = false;
        const labelCategoryEl = document.createElement('label');
        labelCategoryEl.setAttribute('for', `category-${category}`);
        labelCategoryEl.innerText = category;
        categoryEl.appendChild(inputCategoryEl);
        categoryEl.appendChild(labelCategoryEl);
        categoryContainer.appendChild(categoryEl);
    });
};
