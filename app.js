// Load Catagories Part

const loadCategory = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await (response.json())
        const categories = await (data.data.news_category);
        return categories
    } catch (error) {
        console.log(error)
    }
}

// Display Catagories Part 

const displayCategories = async () => {
    const categories = await (loadCategory());
    const categoriesContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const { category_name, category_id } = category
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('font-bold', 'mx-auto')
        categoryLi.innerHTML = `
        <a onclick="displayNewses('${category_id}','${category_name}')">${category_name}</a>
        `
        categoriesContainer.appendChild(categoryLi)
    });
}

displayCategories();