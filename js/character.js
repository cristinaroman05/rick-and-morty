const printDetailCharacter = (url) =>{
    getCharacter(url).then(response =>{
        console.log(response);
        let characterDetail = formatCharacterDetail(response);
        mainContainer.innerHTML =`
        <section class="section__character">
            <h3 class="section__title">CHARACTER DETAIL</h3>
            <section class="section__container">
                ${characterDetail}
            </section>
        </section>
        `;
        adaptStatus(response.status);
    })
}
const getCharacter = async (url) =>{
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataCharacter(data);
    return data;
}
const formatDataCharacter = (data) =>{
    let dataFormated ={
        img:"https://rickandmortyapi.com/api/character/avatar/" + data.id +'.jpeg',
        name: data.name.toUpperCase(),
        status: data.status,
        species: data.species,
        origin: data.origin.name,
        location: data.location.name,
        episode: mapOptions(data.episode),
        urlDetail: data.url,
        urlEpisode: data.episode,
        urllocation: data.location,
    }
    return dataFormated;
}
const formatCharacterDetail = (character) => {
    let episode = formatOptions('episode', character.episode);
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
                    <p id="alive" class="detail__status">ALIVE</p>
                    <p id="dead"  class="detail__status">DEAD</p>
                    <p id="unwnown" class="detail__status">UNKNOWN</p>
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
                <p class="detail__info--location">${character.location}</p>
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
