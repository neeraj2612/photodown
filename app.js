const auth ='563492ad6f917000010000011b34d84b304940c1be9d2c23d74cf2e6';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentsearch;

//eventlistner
searchInput.addEventListener('input' ,updateInput);
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    currentsearch = searchValue;
    searchPhotos(searchValue);

})

more.addEventListener('click' ,searchmore);

function genratePictures(data){data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML =`<img src =${photo.src.large}></img>  
    <div class="gallery-info">
    <p> ${photo.photographer}</p> 
    <button><a href = ${photo.src.original} target="_blank" class="Download">Download</a></button</div>`;
    gallery.appendChild(galleryImg);
});}
async function fetchApi(url){
    const dataFetch = await fetch( url  ,{
        method : "GET",
        headers :{
            Accept : "application/JSON",
            Authorization: auth
 }});
const data = await dataFetch.json();
    return data; 
    


}



function updateInput(e){
    searchValue=e.target.value;

}

 async function curatedPhotos(){
    fetchLink ="https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    genratePictures(data)
    
 }
async function searchPhotos(query){
   
    clear(); 
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    genratePictures(data);


    


}
function clear(){
    gallery.innerHTML="";
    searchInput.value = '';
}
 async function searchmore(){
    page++;
    if(currentsearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentsearch}+query&per_page=15&page=${page}`;
    }
    else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    genratePictures(data);
 }

curatedPhotos(); 