const printDetailCharacter = (url) =>{
    getCharacter(url).then(response =>{
        let characterDetail = formatCharacterDetail(response);
        mainContainer.innerHTML =`
        <section class="section__character">
            <h3 class="section__title">CHARACTER DETAIL</h3>
            <section class="section__container">
                ${characterDetail}
            </section>
        </section>
        `;
    })
}
const getCharacter = async (url) =>{
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataCharacter(data);
    return data;
}
const formatDataCharacter = (data) =>{
    const urlLocationSplitted = data.location.url.split("/");
    return {
        img:"https://rickandmortyapi.com/api/character/avatar/" + data.id +'.jpeg',
        name: data.name.toUpperCase(),
        status: data.status,
        species: data.species,
        origin: data.origin.name,
        location: data.location.name,
        episode: formatEpisode(data.episode),
        urlDetail: data.url,
        urlEpisode: data.episode,
        idLocation: urlLocationSplitted[urlLocationSplitted.length -1],
    }
}
const formatEpisode =(episodes) => {
    const episodesMapper =  episodes.map(value => {
        const spliter = value.split('/');
        return spliter[spliter.length - 1]
    });
    return mapOptions(episodesMapper)
}

const mapOptions = (options) => {
    let optionFormated = '';
    options.forEach((element) => {
        optionFormated += `<div class="detail__episode-info" href="${element}" onclick="addEventsToEpisodeLinks(${element})">${element}</div>`;
        
    });
    
    return optionFormated;
}

const formatCharacterDetail = (character) => {
    return `
    <div class="detail">
        <div class="section-img">
            <div class="detail__container-img">
                <img class="detail__img" src="${character.img}">
                <h4 class="detail__title">${character.name}</h4>
            </div>
        </div>
        <div class="detail__container">
            <div class="detail__status-container">
                <p class="detail__info-title">STATUS</p>
                <div class="detail__status-block">
                    <p class="${adaptStatusCharacter(character.status, 'Alive')}">ALIVE</p>
                    <p class="${adaptStatusCharacter(character.status, 'Dead')}">DEAD</p>
                    <p class="${adaptStatusCharacter(character.status, 'Unknown')}">UNKNOWN</p>
                </div>
            </div>
            <div class="detail__container-info">
                <p class="detail__info-title">SPECIES</p>
                <p class="detail__info">${character.species}</p>
            </div>
            <div class="detail__container-info">
                <p class="detail__info-title">ORIGIN</p>
                <p class="detail__info">${character.origin}</p>
            </div>
            <div class="detail__container-info">
                <p class="detail__info-title">LOCATION</p>
                <p class="detail__info--location" onclick="addEventsToLocationLinks(${character.idLocation})">${character.location}</p>
            </div>
            <div class= "detail__episode">
                <p class="detail__info-title">EPISODE</p>
                <div class= "detail__episode-container">
                    ${character.episode}
                </div>
            </div>
        </div>
    </div>
        `;    
}
const addEventsToLocationLinks = (location) => {
        printPage('LOCATIONS', location);
        }
    

const addEventsToEpisodeLinks = (episode) => {
        printPage('EPISODES', episode);
}
const adaptStatusCharacter = (status, valueButton) => {
    let classStatus = 'detail__status ';
    if(status === valueButton) {
        if(status === 'Alive') {
            classStatus +='detail__status--alive';
        } else if (status === 'Unknown') {
            classStatus +='detail__status--unknown';

        } else if(status === 'Dead') {
            classStatus +='detail__status--dead';

        }
    }
    return classStatus;
}
