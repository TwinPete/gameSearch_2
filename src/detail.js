import Glide from '@glidejs/glide'

const detailContainer = document.querySelector('.detail');


getGameDetail();

function getGameDetail(){

    let gameId = parseInt(getUrlVars());
    console.log('url');
    console.log(gameId);



    // gameName.toLowerCase().split(' ').join('%20');

    const baseUrl = 'https://api.rawg.io/api/games';
    const finalUrl = `${baseUrl}/${gameId}`;
    console.log(finalUrl);

    fetch(finalUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log('logges Game');
            createDetail(data);
            console.log('after game detail');
            createSuggestionsList(gameId);
        })
        .catch((error) => {
            console.log(error);
        });
}

function createDetail(gameDetail){

    console.log('inside game detail function');
    let gameDetailMedia;
    if(gameDetail && gameDetail.clip){
        gameDetailMedia = `<video src="${gameDetail.clip.clip}" autoplay loop muted align="right" alt="">`;
    } else {
        gameDetailMedia = `<img src="${gameDetail.background_image}" alt="No Image Available">`;
    }

    gameDetail.platforms.forEach(item => {
        console.log(item);
    });


    const detail = `<div class="detail__body">
            <div class="detail__top">
                <div class="detail__stats">
                    <div class="detail__title">${gameDetail.name}</div>
                    <div class="detail__stat detail__releaseDate">
                    <span class="detail__label">Release Date:</span>
                    <span class="detail__value">${gameDetail.released}</span>
                    </div>
                    <div class="detail__stat detail__rating">
                    <span class="detail__label">Rating:</span>
                    <span class="detail__value">${gameDetail.rating}</span>
                    </div>
                    <div class="detail__stat detail__Genre">
                    <span class="detail__label">Genre:</span>
                    <span class="detail__value"><ul>${createGenreList(gameDetail.genres)}</ul></span>
                    </div>
                    <div class="detail__stat detail__platform">
                    <span class="detail__label">Platform:</span>
                    <span class="detail__value"><ul>${createPlaformsList(gameDetail.platforms)}</ul></span>
                    </div>
                    <div class="detail__description">
                        ${gameDetail.description}
                    </div>
                </div>
                <div class="detail__image">
                    ${gameDetailMedia}
                </div>
            </div>
        </div>`;

    detailContainer.innerHTML = detail;
}

function createSuggestionsList(gameId){
    const baseUrl = 'https://api.rawg.io/api/games';
    const finalUrl = `${baseUrl}/${gameId}`;

    fetch(finalUrl + '/suggested')
        .then(response => response.json())
        .then(data => {
            const suggestions = data.results;
            let suggestionsList = '';

            suggestions.forEach(suggestion => {
                console.log(suggestion.name);
                suggestionsList += `
                <li class="game">
                    <div class="game__image">
                        <img src="${suggestion.background_image}" alt="No Image Available">
                    </div>
                    <div class="game__title">${suggestion.name}</div>
                    <div class="game__description">${suggestion.description}</div>
                    <div class="game__detailLink">
                        <a href="./detail.html?id=${suggestion.id}">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </li>`;
            });

            console.log(suggestionsList);

            detailContainer.innerHTML += `
                <div class="detail__suggestions glide">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                          ${suggestionsList}
                        </ul>
                    </div>
                    <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                    </div>
                </div>`;
            new Glide('.glide', {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                responsive: [
                    {
                        // screens greater than >= 775px
                        breakpoint: 775,
                        settings: {
                            // Set to `auto` and provide item width to adjust to viewport
                            slidesToShow: 'auto',
                            slidesToScroll: 'auto',
                            itemWidth: 150,
                            duration: 0.25
                        }
                    },{
                        // screens greater than >= 1024px
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            itemWidth: 150,
                            duration: 0.25
                        }
                    }
                ]
            }).mount();
        })
        .catch((error) => {
            console.log(error);
        });

}

function getUrlVars() {
    let vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars.id;
}

function createPlaformsList(platforms){
    let list = '';

    if(platforms){
        platforms.forEach((platform, index) => {
            console.log(index);
            index === platforms.length - 1 ? list += `<li>${platform.platform.name}</li>` : list += `<li>${platform.platform.name},</li>`;
        });
    }

    return list;
}

function createGenreList(genres){
    let list = '';

    if(genres){
        genres.forEach((genre, index) => {
            index === list.length -1 ? list += `<li>${genre.name}</li>` : list += `<li>${genre.name},</li>`;
        });
    }

    return list;
}