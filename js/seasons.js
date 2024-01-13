const printEpisodes = (url) => {
    mainContainer.innerHTML = "";
    getEpisodes(url).then(response =>{
        let episodesCards = formatEpisodesCards(response);
        mainContainer.innerHTML =`
        <h1 class= "section__title">EPISODES</h1>
        <section class= "section--episodes">
                ${episodesCards}
            </section>        
            `;
    }) 
};
const formatEpisodesCards = (seasons) =>{
    let templateEpisode = Object.keys(seasons).map(key =>{
        const numberSeason = key.substring(2,3);
        const season = seasons[key];
        const date1 = season[0].air_date;
        const date2 =season[season.length-1].air_date;
        let template = `
            <article class= "card--episode">
                <h2 class= "card__title--episode"> Season ${numberSeason}</h2>
                <div class= "card__info-container--date">
                    <p class= "card__info-title"> DATE </p>
                    <h2 class= "card__info-date"> ${date1} - ${date2}</h2>
                </div>
                <div class= "card__info-container--episode">
                    <p class= "card__info-title"> EPISODES </p>
        `;
        season.forEach(episode => {
            template += `<h2 class= "card__info--episode" onclick="printPage('EPISODES', ${episode.id})">${episode.name} </h2>`;
        });
        template += `</div></article>`
        return template

    }).join('');
    return templateEpisode;
}

const getEpisodes = async() =>{
    let url = URL_BASE + "/episode/";
    let response = await fetch(url);
    let data = await response.json();
    let dataAll = data.results;
    for (let i = 0; i < data.info.pages - 1;i++) {
        let response = await fetch(data.info.next);
        let data1 = await response.json();
        dataAll = [...dataAll, ...data1.results];
    }
    return mapDataEpisodes(dataAll);
}
const mapDataEpisodes = (data) => {
    return data.reduce((acc,curr)=>{
        const season=curr.episode.substring(0,3);
        if(Object.keys(acc).every(val=>val !== season)){
            acc[season]=[curr];
        }else{
            acc[season].push(curr);
        }
        return acc;
    },{});
}