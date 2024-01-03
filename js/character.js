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
        name: data.name,
        status: data.status,
        species: data.species,
        origin: data.origin.name,
        location: data.location.name,
        episode: mapOptions(data.episode),
    }
    return dataFormated;
}
const formatCharacterDetail = (character) => {
    let episode = formatOptions('episode', character.episode);
   

    return `
    <div class="detail">
    <img class="detail__img" src="${character.img}">
    <div class="detail__info-container">
        <h4 class="detail__title">${character.status}</h4>
        <p class="detail__info-title">STATUS</p>
        <p class="detail__info">${character.species}</p>
        <p class="detail__info-title">ORIGIN</p>
        <p class="detail__info">${character.origin}</p>
        <p class="detail__info-title">LOCATION</p>
        <p class="detail__info">${character.location}</p>
        <div class= "detail__episode-container">
            <p class="detail__info-title">EPISODE</p>
            <p class="detail__info">${character.episode}</p>
        </div>
        
    </div>
    <div class="detail__options-container">
        ${episode}
        
    </div>
</div>
    `;
}