let currentPokemon;
let pokemon = [];
let allPokemon = [];
let loadStop = 20; 
let currentPokemonIndex = 0; 



async function loadPokemon() {
    // let url = 'https://pokeapi.co/api/v2/pokemon/1';
    // let response = await fetch(url);
    // let currentPokemon = await response.json();

    // console.log('loaded pokemon', currentPokemon);
    // let card = document.getElementById('card');
    // card.innerHTML = '';
    // card.innerHTML += `
    // <div id="pokedex" class="pokedex">
    //     <h1 id="pokemonName">Name</h1>
    //     <img id="pokemonImage">
    //     <p class="stats">stats</p>
    // </div>
    // `;
    // document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    // document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];


    // renderPokemonInfo();
    // loadPokemon2();
    loadPokemon3();
}

// function renderPokemonInfo() {

//     document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_shiny'];
// }

async function loadPokemon2() {
    let url = 'https://pokeapi.co/api/v2/pokemon/2/';
    let response = await fetch(url);
    let currentPokemon = await response.json();

    console.log('loaded pokemon2', currentPokemon);
    // let card = document.getElementById('card');
    // // card.innerHTML = '';
    // // card.innerHTML += `
    // // <div id="pokedex" class="pokedex">
    // //     <h1 id="pokemonName2">Name</h1>
    // //     <img id="pokemonImage2">
    // //     <p class="stats">stats</p>
    // // </div>
    // // `;
    // document.getElementById('pokemonName2').innerHTML = currentPokemon['name'];
    // document.getElementById('pokemonImage2').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

}

async function loadPokemon3() {
    const startIndex = currentPokemonIndex + 1;
    const endIndex = currentPokemonIndex + loadStop;
    let pokeCard = document.getElementById(`pokeCard`);
    for (let i = startIndex; i <= endIndex; i++) {

        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json();

        allPokemon.push(currentPokemon);

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
        console.log('loaded pokemon2', currentPokemon);
    }

    

}

function loadMorePokemon() {
    currentPokemonIndex += loadStop; 
    loadPokemon3();

}