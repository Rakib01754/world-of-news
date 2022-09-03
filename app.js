// Load Catagories Part

const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await (response.json())
    const catagories = await (data.data.news_category);
    return catagories;
}