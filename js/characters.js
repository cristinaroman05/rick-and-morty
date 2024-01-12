const printCharacters = () => {
    mainContainer.innerHTML = "";
    getCharacters().then(response =>{
        console.log(response);
        let charactersCards = formatCharactersCards(response);
        mainContainer.innerHTML =`
        <h1 class= "section__title">CHARACTERS FINDER</h1>
        <section class= "section">
            ${charactersCards}
        </section> 
        <button onclick=${nextPage()} class= "button">+MORE</button>
            `;
            addEventsToCharactersLinks(response);
    }) 
};
const formatCharactersCards = (characters) =>{
    let templateCharacter = characters.map(character =>{
        return`
            <article class= "card">
                <div class= "card__title-container">
                    <h2 class= "card__title"> ${character.name} </h2>
                    <p class="card__title-info ${adaptStatus(character.status)}">  ${character.status}</p>
                </div>
                <div class="card__container-details">
                    <img class= "card__img"src=${character.img}>
                <div class= "card__info-container">
                    <p class= "card__info-title">SPECIES</p>
                    <p class= "card__info">${character.species}</p>
                    <p class= "card__info-title">GENDER</p>
                    <p class= "card__info">${character.gender}</p>
                    <p class= "card__info-title">ORIGIN</p>
                    <p class= "card__info">${character.origin}</p>
                    <p class= "card__info-title">LOCATION</p>
                    <p class= "card__info">${character.location}</p>
                </div>
                </div>
                <button class= "card__button">+MORE DETAILS</button>
            </article>
            
        `
    }).join('');
    return templateCharacter;
}
const addEventsToCharactersLinks = (characters) => {
    let cardLinks = [...document.getElementsByClassName('card__button')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('CHARACTERS', characters[i].urlDetail);
        })
    });
}
const getCharacters = async() =>{
    
    let url = URL_BASE + "/character/?page=";
    let response = await fetch (url);
    let data = await response.json();
    data = mapDataCharacters(data.results);
    return data;
}
function nextPage(){
    let page = 0;
    page++;
    getCharacters();
}
const mapDataCharacters = (data) => {
    let dataMapped = data.map (character => {
    let object = {
        img: "https://rickandmortyapi.com/api/character/avatar/" + character.id +'.jpeg',
        name: character.name,
        status: character.status.toUpperCase(),
        species: character.species,
        gender: character.gender,
        origin: character.origin.name,
        location: character.location.name,
        urlDetail: character.url,
    }
        return object;
    })
    return dataMapped;
}
const adaptStatus = (status) => {
console.log(status);
    let classStatus;
if(status === 'unknown'){
    classStatus ='card__title-info--unknown';
}
if(status === 'Dead'){
    classStatus ='card__title-info--dead';
}
else if (
    status === 'Alive'){
    classStatus ='card__title-info';
}
return classStatus;
}










 