
const formatOptions = (option, options) => {
    let htmlStructure = "";
    options.forEach(element => {
        htmlStructure += `<img class="detail__options-img detail__options-img--${option}" src="${element.urlImg}">`;
    })

    htmlStructure = `
        <p class="detail__options-title">${option.toUpperCase()}</p>
        <div class="detail__img-container">
            ${htmlStructure}
        </div>
    `;
    return htmlStructure;
}
const mapOptions = (options) => {
    let optionFormated = [];
    options.forEach( (element) => {
        let idOption = element.replace("https://rickandmortyapi.com/api/episode/", " ");
        let episodesBlock ='';
        episodesBlock += `<div class="detail__episode-info" href="${element}">${idOption}</div>`;
        optionFormated.push(episodesBlock);
    });
    return optionFormated;
}
