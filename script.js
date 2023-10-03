let currentPokemon;
let allPokemon = [];
let loadStop = 20;
let currentPokemonIndex = 0;


async function loadPokemon() {
    const startIndex = currentPokemonIndex + 1;
    const endIndex = currentPokemonIndex + loadStop;

    for (let i = startIndex; i <= endIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json();

        allPokemon.push(currentPokemon);

        genPokeCard(i, currentPokemon);

    }
}


function genPokeCard(i, currentPokemon) {
    let pokeCard = document.getElementById(`card`);
    pokeCard.innerHTML += `
    <div id="pokedex${i}" class="pokedex" onclick="openPokeCard(${i - 1})">
        <div class="pokemonHeader">
            <h1 id="pokemonName${i}" class="pokemonName">Name</h1>    
            <h2 id="pokemonId${i}">#</h2>
        </div>
        
        <img id="pokemonImage${i}" class="pokemonImage">
        
    </div>
    `;

    document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
    document.getElementById(`pokemonId${i}`).innerHTML = '#' + currentPokemon['id'];
    document.getElementById(`pokemonImage${i}`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];


}


function openPokeCard(i) {
    document.getElementById(`pokeCard`).classList.remove('d-none');
    genPokeCardDetails(i);
}


function closePokeCard() {
    document.getElementById(`pokeCard`).classList.add('d-none');
}


function doNotClose(event) {
    event.stopPropagation();
}


function genPokeCardDetails(i) {

    let pokemonName = allPokemon[`${i}`]['name'];
    let pokemonId = allPokemon[`${i}`]['id'];
    let pokemonImg = allPokemon[`${i}`]['sprites']['other']['official-artwork']['front_default'];
    let selectedPokemonHeight = allPokemon[`${i}`]['height'];
    let selectedPokemonWeight = allPokemon[`${i}`]['weight'];
    let selectedPokemonAbilities0 = allPokemon[`${i}`]['abilities']['0']['ability']['name'];
    let selectedPokemonAbilities1 = allPokemon[`${i}`]['abilities']['1']['ability']['name'];
    let pokeCardDetails = document.getElementById(`pokemonDetailInfo`);

    pokeCardDetails.innerHTML = `
    <div class="pokemonDetailInfoContainer">
        <div class="pokemonDetailInfoHeader">
            <h1 id="pokemonName${i}" class="pokemonName">Name</h1>    
            <h2 id="pokemonId${i}">#</h2>
        </div>

        <div class="pokemonDetailInfoImg">
            <img id="pokemonImage${i}" class=""> 
        </div>    

        <div class="pokemonDetailInfoOverview">
            <div class="pokemonDetailInfoOverviewHeader">
                
            </div>

            <div class="statsDiv" id="aboutTab">
                

                <div class="container">
                    <div class="box">
                        <input type="radio" class="tab-toggle" name="tab-toggle" id="tab1" checked>
                        <input type="radio" class="tab-toggle" name="tab-toggle" id="tab2">
                        <input type="radio" class="tab-toggle" name="tab-toggle" id="tab3">

                        <ul class="tab-list">
                            <li class="tab-item">
                                <label class="tab-trigger" for="tab1">About</label>
                            </li>
                            <li class="tab-item">
                                <label class="tab-trigger" for="tab2">Stats</label>
                            </li>
                            <li class="tab-item">
                                <label class="tab-trigger" for="tab3">Moves</label>
                            </li>
                        </ul>
                        
                        <div class="tab-container">
                            <div class="tab-content">
                                <div class="tab-content-about-container">
                                    <div class="tab-content-about">
                                        <span>Height</span>
                                        <span>Weight</span>
                                        <span>Abilities</span>
                                    </div>

                                    <div class="statsContentValues">
                                        <span>${selectedPokemonHeight / 10} m</span>
                                        <span>${selectedPokemonWeight / 10} kg</span>
                                        <span>${selectedPokemonAbilities0}, ${selectedPokemonAbilities1}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-content">
                                <div class="tab-content-stats">
                                    Stats
                                </div>        
                            </div>

                            <div class="tab-content">
                                <div class="tab-content-moves">
                                    moves
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
 `;

    document.getElementById(`pokemonName${i}`).innerHTML = pokemonName;
    document.getElementById(`pokemonId${i}`).innerHTML = '#' + pokemonId;
    document.getElementById(`pokemonImage${i}`).src = pokemonImg;

}



function loadMorePokemon() {
    currentPokemonIndex += loadStop;
    loadPokemon();
}

