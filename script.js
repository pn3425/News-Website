const API_KEY = "d6bb97128db044d4a173f968f8de7b65";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=>fetchNews("business"))

//Clicking on the home button/Logo
function reload(){
window.location.reload();
}

async function fetchNews(query)
{
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`) //formation of the link of news to be fetched,await for promise//
  const data = await res.json(); //Convert data into json//
 // console.log(data);
 bindData(data.articles);
}

function bindData(articles)
{
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  
  cardsContainer.innerHTML = "";


articles.forEach((article) => {
  if(!article.urlToImage) return;    //iF no image present in URL, return NULL
  const cardClone = newsCardTemplate.content.cloneNode(true);//To clone all the div inside the template-news-card(HTML file)

  fillDataInCard(cardClone,article); //Funtion call to fillin the data in the cards

  // Put the clones inside the card the container
  cardsContainer.appendChild(cardClone);
});
}

function fillDataInCard(cardClone,article){

   const newsImg = cardClone.querySelector("#news-img");
   const newsTitle = cardClone.querySelector("#news-title");
   const newsSource= cardClone.querySelector("#news-source");
   const newsDesc = cardClone.querySelector("#news-desc");
   
   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description; 
   const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
});


newsSource.innerHTML = `${article.source.name} · ${date}`;

//To redirect to whole article page,when clicked on any news tile
cardClone.firstElementChild.addEventListener("click", () => {
       window.open(article.url,"_blank");
});
}

//to search for nav search items,
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

//For searching the news from the search bar itself

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query)return; //If user didnt enter any text so return 
  fetchNews(query);

   curSelectedNav?.classList.remove('active');
   curSelectedNav=null;


});