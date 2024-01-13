const printDetailEpisode = (episode) =>{
    const url = "https://rickandmortyapi.com/api/episode/" + episode;
    getEpisode(url).then(response =>{
        console.log(response);
        let episodeDetail = formatEpisodeDetail(response);
        mainContainer.innerHTML =`
        <section class="section__episode">
            <h3 class="section__title">EPISODE DETAIL</h3>
            <section class="section__container">
                ${episodeDetail}
            </section>
        </section>
        `;
    })
}
const getEpisode = async (url) =>{
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataEpisode(data);
    return data;
}

const formatDataEpisode = (data) =>{
    let dataFormated ={
        name:data.name,
        episode:data.episode,
        date: data.air_date,
        characters: characterOptions(data.characters).join(' '),
        urlCharacter:data.characters,
        urlDetail: data.url,
    }
    return dataFormated;
}
const formatEpisodeDetail = (episode) => {
    return `
    <div class="episode__detail-container">
        <div class="episode__detail-header">
            <h1 class="episode__detail-title">${episode.name}</h1>
        </div>
        <div class="episode__detail-data">
            <div class="episode__detail-info">
                <h1 class="episode__info">EPISODE</h1>
                <p class="episode__info-text">${episode.episode}</p>
            </div>
            <div class="episode__detail-info">
                <h1 class="episode__info">DATE</h1>
                <p class="episode__info-text">${episode.date}</p>
            </div>
            <div class="episode__characters">
                <h1 class="episode__info-characters">CHARACTERS</h1>
                <div class="episode__detail-characters">
                    <div class="episode__info-character">
                        <img ${episode.characters}>
                    </div>
                </div>
            </div> 
        </div>
</div>
    `;
}
const characterOptions = (options) => {
    let charactersFormated = [];
    options.forEach( (element, i) => {
        let stringParts = element.split("/");
        let idCharacter = stringParts[stringParts.length - 1];
        let auxObject = `
        <div class="episode__info-character">
        <img class="episode__img-small card_link" onclick="addEventsToCharacterLinks('${element}')" src="https://rickandmortyapi.com/api/character/avatar/${idCharacter}.jpeg" >
        </div>`
        charactersFormated.push(auxObject);
    });
    return charactersFormated;
}
const addEventsToCharacterLinks = (character) => {
    printPage('CHARACTERS', character);
 }
