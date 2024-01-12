const printDetailLocation = (url) =>{
    getLocation(url).then(response =>{
        console.log(response);
        let locationDetail = formatLocationDetail(response);
        mainContainer.innerHTML =`
        <section class="section__episode">
            <h3 class="section__title">LOCATION DETAIL</h3>
            <section class="section__container">
                ${locationDetail}
            </section>
        </section>
        `;
    addEventsToCharacterLinks(response.urlCharacter);
    })
}
const getLocation = async (url) =>{
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataLocation(data);
    return data;
}

const formatDataLocation = (data) =>{
    let dataFormated ={
        name:data.name,
        type:data.type,
        dimension:data.dimension,
        characters: characterOptions(data.residents), 
    }
    return dataFormated;
}
const formatLocationDetail = (location) => {
    return `
    <div class="episode__detail-container">
        <div class="episode__detail-header">
            <h1 class="episode__detail-title">${location.name}</h1>
        </div>
        <div class="episode__detail-data">
            <div class="episode__detail-info">
                <h1 class="episode__info">TYPE</h1>
                <p class="episode__info-text">${location.type}</p>
            </div>
            <div class="episode__detail-info">
                <h1 class="episode__info">DIMENSION</h1>
                <p class="episode__info-text">${location.dimension}</p>
            </div>
            <div class="episode__characters">
                <h1 class="episode__info-characters">RESIDENTS</h1>
                <div class="episode__detail-characters">
                    <div class="episode__info-character">
                        <img ${location.characters}> 
                    </div>
                </div>
            </div>
        </div>
</div>
    `;
}

