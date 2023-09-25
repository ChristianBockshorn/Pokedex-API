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
    <div id="pokedex${i}" class="pokedex">
        <div class="pokemonHeader">
            <h1 id="pokemonName${i}" class="pokemonName">Name</h1>    
            <h2 id="pokemonId${i}">#</h2>
            
        </div>
        
        <img id="pokemonImage${i}" class="pokemonImage">
        <p class="stats">stats</p>

        <div id="openPokedexCard${i}" class="openPokedexCard d-none"
            onclick="closePokedexCard(${i})">
        </div>
    </div>
    `;
    document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
    document.getElementById(`pokemonId${i}`).innerHTML = '#' +currentPokemon['id'];
    document.getElementById(`pokemonImage${i}`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


function openPokedexCard() {
    document.getElementById(`openPokedexCard`).classList.remove('d-none');
}


function closePokedexCard() {
    document.getElementById(`openPokedexCard`).classList.add('d-none');
}


function doNotClose(event) {
    event.stopPropagation();
}

function loadMorePokemon() {
    currentPokemonIndex += loadStop;
    loadPokemon();
}





