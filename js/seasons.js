const printEpisodes = (url) => {
    mainContainer.innerHTML = "";
    getEpisodes(url).then(response =>{
        console.log(response);
        let episodesCards = formatEpisodesCards(response);
        mainContainer.innerHTML =`
        <h1 class= "section__title">EPISODES</h1>
        <section class= "section">
                ${episodesCards}
            </section>        
            `;
        addEventsToEpisodesLinks(response);      
    }) 
};
const formatEpisodesCards = (episodes) =>{
    let templateEpisode = episodes.map(episode =>{
        return`
            <article class= "card--episode">
                    <h2 class= "card__title--episode"> ${episode.episode}</h2>
                    <div class= "card__info-container--date">
                        <p class= "card__info-title"> DATE </p>
                        <h2 class= "card__info-date"> ${episode.date} </h2>
                    </div>
                    <div class= "card__info-container--episode">
                        <p class= "card__info-title"> EPISODES </p>
                        <h2 class= "card__info--episode">${episode.name} </h2>
                    </div>
            </article>
        `
    }).join('');
    return templateEpisode;
}

const getEpisodes = async() =>{
    let url = URL_BASE + "/episode/";
    let response = await fetch (url);
    let data = await response.json();
    data = mapDataEpisodes(data.results);
    return data;
}
const mapDataEpisodes = (data) => {
    let dataMapped = data.map (episode => {
    let object = {
        name: episode.name,
        date: episode.air_date,
        urlDetail: episode.url,
        episode: episode.episode.replace("S", "SEASON"+ episode.episode[2])
    }
        return object;
    })
    return dataMapped;
}
const addEventsToEpisodesLinks = (episodes) => {
    let cardLinks = [...document.getElementsByClassName('card__info--episode')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('EPISODES', episodes[i].urlDetail);
        })
    });
}