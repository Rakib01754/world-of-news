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
    showLoader(true)
    const newsContainer = document.getElementById('news-container')
    const dataFound = document.getElementById('data-found')
    newsContainer.innerHTML = '';
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        const data = await (response.json())
        const allNews = (data.data)

        // Sorting Array 

        allNews.sort(function (a, b) {
            return b.total_view - a.total_view
        })
        dataFound.innerHTML = `
    <h2 class="text-center text-3xl text-primary font-bold bg-gray-100 p-5">${allNews.length} Items Found On ${cataName} </h2>
`
        if (allNews.length === 0) {
            showLoader(false);
        }
        allNews.forEach(singleNews => {


            const { thumbnail_url, total_view, title, details, author, _id } = singleNews

            const newDiv = document.createElement('div')
            newDiv.innerHTML = `
            <div class="card card-side bg-base-100 shadow-xl my-5 flex flex-col md:flex-row" >
            <img src="${thumbnail_url}" class="p-3">
            <div class="card-body">
                <h2 class="card-title text-3xl">${title ? title : 'no data found'}</h2>
                <p>${details ? details.slice(0, 250) + '...' : 'no data found'}</p>
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
                    <label for="my-modal-4" class="btn btn-primary modal-button" onclick="showModal('${_id}')"><i class="fa-solid fa-arrow-right"></i></label>
                </div>
            </div>
        </div> 
        `
            newsContainer.appendChild(newDiv)
            showLoader(false)
        })

    } catch (error) {
        console.log(error)
    }

}

//Show modal part

const showModal = async (news_id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
        const data = await (response.json())
        const postDetails = await (data.data[0]);
        console.log(postDetails)
        const { title, total_view, author, image_url, details } = postDetails;
        const modalBody = document.getElementById('modal-body');
        modalBody.textContent = "";
        modalBody.innerHTML = `
        <img src="${image_url}" alt="">
        <h2 class="text-center text-2xl font-bold ">${title ? title : 'no data found'}</h2>
        <p class="text-justify mb-2">${details}</p>
        
                               
        <div class="flex items-center justify-between">
            <div class="flex items-center justify-between">
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
        </div>
   
        `
    } catch (error) {
        console.log(error)
    }
}

//Spinner part 

const showLoader = (loader) => {
    const loaderArea = document.getElementById('spinner')
    if (loader === true) {
        loaderArea.classList.remove('hidden')
    }
    else {
        loaderArea.classList.add('hidden')
    }
}

displayNewses('01', 'Breaking News');
displayCategories();