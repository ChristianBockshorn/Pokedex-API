let currentPokemon;
let pokemon = [];
let allPokemon = [];
let loadStop = 20;
let currentPokemonIndex = 0;


async function loadPokemon3() {
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
        <h1 id="pokemonName${i}">Name</h1>
        <img id="pokemonImage${i}" class="pokemonImage">
        <p class="stats">stats</p>
    </div>
    `;
    document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
    document.getElementById(`pokemonImage${i}`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


function loadMorePokemon() {
    currentPokemonIndex += loadStop;
    loadPokemon3();
}