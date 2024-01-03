const mainContainer = document.querySelector('.main');
const URL_BASE = 'https://rickandmortyapi.com/api';
window.onload = () => {
    printHome('MAIN');
}

const printPage = (section, url) => {
    adaptHeader(section);
    console.log(section);
    switch (section){
        case 'MAIN':
            printHome();
        break;
        case 'CHARACTERS':
            console.log('pintamos personajes');
        url ? printDetailCharacter(url) : printCharacters();
        break;
        case 'SEASONS':
            console.log('pintamos temporadas');
        break;
        case 'LOCATIONS':
            console.log('pintamos localizaciones');
        default: 
        printHome();
    }
};
const adaptHeader = (section) => {
    console.log(section);
    const header = document.querySelector('header');
    if(section !== 'MAIN'){
        header.classList.add('header');
    } else {
        header.classList.remove('header');
    }
}