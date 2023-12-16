const printHome = () => {
    mainContainer.innerHTML =`
    <section class="main__section">
            <div class="main__header">
                <div class="main__container-title">
                   <h1 class="main__title">RICK & MORTY</h1>
                    <h2 class="main__subtitle">THE WIKI</h2> 
                </div>
            </div>
            <p class="main__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation
            </p>
            <div class="main__separator"></div>
            <div class="main__container-page">
                <button data-link="characters"class="main__page">PERSONAJES</button>
                <button data-link="seasons" class="main__page">TEMPORADAS</button>
                <button data-link="locations" class="main__page">LOCALIZACIONES</button> 
            </div>
        </section>
    `;
}
const addEventsToHomeLinks = () =>{
    const homeLinks =document.querySelectorAll('[data-link]');
    homeLinks.forEach(element => {
        element.addEventListener('click', () => {
            printPage(element.getAttribute('data-link'))
        })
    })
};