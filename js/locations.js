const printLocations = () => {
    mainContainer.innerHTML = "";
    getLocations().then(response =>{
        console.log(response);
        let locationsCards = formatLocationsCards(response);
        mainContainer.innerHTML =`
        <h1 class= "section__title">LOCATIONS FINDER</h1>
        <section class= "section">
                ${locationsCards}
            </section>        
            `;
            addEventsToLocationsLinks(response);
    }) 
};
const formatLocationsCards = (locations) =>{
    let templateLocation = locations.map(location =>{
        return`
            <article class= "card--locations">
                    <h2 class= "card__title--episode"> ${location.name}</h2>
                    <div class= "card__container-location">
                        <div class= "card__info-container--date">
                            <p class= "card__info-title"> TYPE </p>
                            <h2 class= "card__info-location"> ${location.type} </h2>
                        </div>
                        <div class= "card__info-container--dimension">
                            <p class= "card__info-title"> DIMENSION </p>
                            <h2 class= "card__info-location">${location.dimension} </h2>
                        </div>
                    </div>
                    <button class= "card__button--locations">+MORE DETAILS</button>
            </article>
        `
    }).join('');
    return templateLocation;
}
const addEventsToLocationsLinks = (locations) => {
    let cardLinks = [...document.getElementsByClassName('card__button--locations')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('LOCATIONS', locations[i].urlDetail);
        })
    });
}
const getLocations = async() =>{
    let url = URL_BASE + "/location/";
    let response = await fetch (url);
    let data = await response.json();
    data = mapDataLocations(data.results);
    return data;
}
const mapDataLocations = (data) => {
    let dataMapped = data.map (location => {
    let object = {
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        residents: location.residents,
    }
        return object;
    })
    return dataMapped;
}