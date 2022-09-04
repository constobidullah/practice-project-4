// dynamic Catagories to Show Step 1
const loadCategories = async () => {
   const url = 'https://openapi.programming-hero.com/api/news/categories';
   try {
       const res = await fetch(url);
       const data = await res.json();
       displayCategories(data.data.news_category);
   } catch (error) {
       console.log(error);
   }
};


const displayCategories = categories => {
   // console.log(categories);


   categories.forEach(categorie => {
       const catagoriesList = document.getElementById('catagories-list');
       const categoriesDiv = document.createElement('div');
       // console.log(categorie.category_name);
       categoriesDiv.classList.add('w-50');
       categoriesDiv.classList.add('btn');
       categoriesDiv.innerHTML = `
   <button onclick="loadNews(${categorie.category_id})" class="btn  btn-info text-white">${categorie.category_name}</button>
   `

       catagoriesList.appendChild(categoriesDiv);
   })
};
loadCategories();
// display no news found

// spinner
const toggoleSpinner = (isLoading) => {
   const loaderSection = document.getElementById("loader");
   if (isLoading) {
       loaderSection.classList.remove("d-none");
   } else {
       loaderSection.classList.add("d-none");
   }
};


// News Details to Show Step 2
const loadNews = async (id) => {
   toggoleSpinner(true);
   const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
   try {
       const res = await fetch(url);
       const data = await res.json();
       displayNews(data.data);
   } catch (error) {
       console.log(error);
   }
};




const displayNews = (newses, name) => {
   // console.log(newses.length);


   // news shorting
   newses
       .sort((a, b) => {
           return a.total_view - b.total_view;
       })
       .reverse();
   const noNewsFound = document.getElementById('no-news-found');
   //   number of news
   if (newses.length === 0) {
       noNewsFound.innerHTML = `
           <h3 class="text-secondary fw-bold text-center">No news Found!! Please try a new One.</h3>
           `;
   } else {
       noNewsFound.innerHTML = `
           <h3 class="text-secondary text-secondary mb-5 bg-info rounded p-2">${newses.length} items found for category</h3>
           `;
   }



   const newsList = document.getElementById('news-list');
   newsList.innerHTML = '';
   newses.forEach(news => {
       // console.log(newses.length);




       const newsDiv = document.createElement('div');
       newsDiv.classList.add('col-md-4');
       newsDiv.innerHTML = `
       <div class="card">
           <img class="card-img-top" src="${news.image_url}" alt="Card image cap">
           <div class="card-body">
             <h5 class="card-title">${news.title}</h5>
             <p class="card-text">${news.details.length > 100 ? news.details.slice(0, 150) + "..." : details}</p>
             <img class="rounded-circle me-4" src="${news.author.img}" alt="" width="30" height="30">
             <p class="card-text"><small class="text-muted">${news.author.name} </small></p>
             <p>Total Views : ${news.total_view}</P>
             <button onclick="loadNewsDetails('${news._id}')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
           </div>
       </div>    
       `;
       newsList.appendChild(newsDiv);
   });
   toggoleSpinner(false);

};

loadNews();


const loadNewsDetails = async (id) => {
   const url = `https://openapi.programming-hero.com/api/news/${id}`;
   try {
       const res = await fetch(url);
       const data = await res.json();
       displayNewsDetails(data.data[0]);
   } catch (error) {
       // console.log(error);
   }
};

const displayNewsDetails = (details) => {
   // console.log(details);
   const modalTitle = document.getElementById("exampleModalLabel");
   modalTitle.innerText = details?.title;
   const detailImg = document.getElementById("detail-img");
   detailImg.innerHTML = `
      
       
       <img src="${details.image_url}" class="img-fluid">
       <p>${details.details}</p>
       <img src="${details.author.img}" height="50px" width="50px">
       <p>Author Name:${details.author.name ? details.author.name : "No Name Available"}</p>
       <p>Publish Date:${details.author.published_date}</p>
       <p>Total View :${details.total_view ? details.total_view : "No data found"}<p>
       `;
};
