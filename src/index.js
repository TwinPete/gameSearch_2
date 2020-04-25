// import './detail.js';


const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const searchResults = document.querySelector('.search__results');


if(searchButton){
    searchButton.addEventListener('click', function(){
        onSearch();
    });
}

function onSearch(){
    const gameName = searchInput.value;
    console.log(getGames(gameName));
    getGames(gameName);
    // createGamesList(gamesList);
}

function getGames(gameName){

    gameName = gameName.toLowerCase().split(' ').join('%20');

    const baseUrl = 'https://api.rawg.io/api/games';

    return fetch(`${baseUrl}?page_size=7&search=${gameName}`)
        .then(response => response.json())
        .then(data => data.results)
        .then( res => {
            console.log(res);
            createGamesList(res);
        })
        .catch((error) => {
            console.log(error);
    });
}

function createGamesList(games){
    let gamesList = '';
    console.log('games Array');
    console.log(games);
    games.forEach( game => {
         gamesList += `
            <li >
                <div class="game">
                    <div class="game__image">
                        <img src="${game.background_image}" alt="No Image Available">
                    </div>
                    <div class="game__title">${game.name}</div>
                    <div class="game__description">${game.released}</div>
                    <div class="game__detailLink">
                        <a href="./detail.html?id=${game.id}">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </li>
         `;
    });
    searchResults.innerHTML = gamesList;
    addEmptyBoxes();
}

function addEmptyBoxes(){
    searchResults.innerHTML += `
        <li><div class="emptyBox"></div></li>
        <li><div class="emptyBox"></div></li>
        <li><div class="emptyBox"></div></li>
        <li><div class="emptyBox"></div></li>    
    `;
}

// getGames('Mario Kart');
