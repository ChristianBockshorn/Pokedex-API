let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    let currentPokemon = await response.json();

    console.log('loaded pokemon', currentPokemon);
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    // renderPokemonInfo();
    loadPokemon2();
}

// function renderPokemonInfo() {
    
//     document.getElementById('pokemonImage').src = currentPokemon['sprites']['front_shiny'];
// }



async function loadPokemon2() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let response = await fetch(url);
    let currentPokemon = await response.json();

    console.log('loaded pokemon', currentPokemon);

    for (let i = 0; i < pokemonName.length; i++) {
        const name = pokemonName[i];

        document.getElementById('pokemonName').innerHTML = currentPokemon['results'];
        
    }
    
}
