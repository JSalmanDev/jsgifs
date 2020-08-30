  
const btn = document.querySelector('button');
const gifContainer = document.querySelector('#gif-container');
const errorDiv = document.querySelector('#error-div')
const searchInput = document.querySelector('input');


async function getJSON(url){
  try{  
    const response = await fetch(url);
    return await response.json();
  }catch(error){
      throw error;
  }
}

function generateHTML(json){
  json.data.map((gif) =>{
    const section = document.createElement('section')
    gifContainer.appendChild(section)
    section.innerHTML =
      `<iframe src="${gif.embed_url}">`;
  })
}

function clearContainer(){
  if(gifContainer != null){
    gifContainer.innerHTML= ''
  };
}

btn.addEventListener('click', (event) => {
  event.target.textContent = 'Loading...';
  clearContainer();

  getJSON(`https://api.giphy.com/v1/gifs/search?q=${searchInput.value}&api_key=zlEo3RPzRRi15Cxm5HB6LCw5CaD3KDQF&q=&limit=25&offset=0&rating=g&lang=en`)
    .then(generateHTML)
    .catch( err => {
      errorDiv.innerHTML = "<h3>Something went wrong.</h3>"
      console.error(err);
    })
    .finally(() => event.target.textContent='Get Gifs!');

  searchInput.value = '';
})