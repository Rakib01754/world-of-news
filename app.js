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

// Display Newses Part 

const displayNewses = async (id, cataName) => {
    const newsContainer = document.getElementById('news-container')
    const dataFound = document.getElementById('data-found')
    newsContainer.innerHTML = '';
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        const data = await (response.json())
        const allNews = (data.data)
        dataFound.innerHTML = `
    <h2 class="text-center text-3xl text-primary font-bold bg-gray-100 p-5">${allNews.length} Items Found On ${cataName} </h2>
`
        allNews.forEach(singleNews => {

            const { thumbnail_url, total_view, title, details, author, _id } = singleNews
            const newDiv = document.createElement('div')
            newDiv.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl my-5 flex flex-col md:flex-row">
        <img src="${thumbnail_url}" class="p-3">
        <div class="card-body">
            <h2 class="card-title text-3xl">${title}</h2>
            <p>${details ? details.slice(0, 200) + '...' : details}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-between flex-col md:flex-row">
                    <div class="btn btn-ghost btn-circle avatar">
                        <div class="w-20 rounded-full">
                            <img src="${author.img}" />
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="font-bold">${author.name ? author.name : 'No data found'}</div>
                        <div>${author.published_date ? author.published_date : 'No data found'}</div>
                    </div>
                </div>

                <div class="font-bold">
                    <i class="fa-solid fa-eye"></i> ${total_view ? total_view : 'No data found'}
                </div>
                
                <button class="btn btn-primary">
                     <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                 </button>
               
            </div>
        </div>
    </div>
        `
            newsContainer.appendChild(newDiv)
        })
    } catch (error) {
        console.log(error)
    }


}
displayNewses('08', 'All News');
displayCategories();