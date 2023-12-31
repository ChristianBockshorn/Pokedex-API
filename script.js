let currentPokemon;
let allPokemon = [];
let loadStop = 20;
let currentPokemonIndex = 0;
let typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
};


// Asynchrone Funktion zum Laden von Pokémon-Daten von der API
async function loadPokemon() {
    // Bestimmt den Start- und Endindex für die zu ladenden Pokémon
    const startIndex = currentPokemonIndex + 1;
    const endIndex = currentPokemonIndex + loadStop;

    // Schleife zum Laden von Pokémon-Daten und Erzeugen von Karten für jedes Pokémon
    for (let i = startIndex; i <= endIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json();

        allPokemon.push(currentPokemon); // Fügt das geladene Pokémon zum Array hinzu
        genPokeCard(i, currentPokemon); // Erzeugt eine Karte für das geladene Pokémon
    }
}


// Funktion zum Erzeugen einer Pokémon-Karte
function genPokeCard(i, currentPokemon) {
    // Holt den Container für die Karten und fügt HTML-Code für eine neue Karte hinzu
    let pokeCard = document.getElementById(`card`);
    pokeCard.innerHTML += /* html */`
    <div id="pokedex${i}" class="pokedex" onclick="openPokeCard(${i - 1})">
        <div class="pokemonHeader">
            <h1 id="pokemonName${i}" class="pokemonName">Name</h1>    
            <h2 id="pokemonId${i}">#</h2>
        </div>
        <img id="pokemonImage${i}" class="pokemonImage">
    </div>
    `;

    // Setzt den Namen, die ID und das Bild des Pokémon auf der Karte
    document.getElementById(`pokemonName${i}`).innerHTML = currentPokemon['name'];
    document.getElementById(`pokemonId${i}`).innerHTML = '#' + currentPokemon['id'];
    document.getElementById(`pokemonImage${i}`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    // Setzen Sie die Hintergrundfarbe der Karte basierend auf dem Typ des Pokémon
    setBackgroundColor(i);
}

function setBackgroundColor(i) {
    for (let j = 0; j < allPokemon.length; j++) {
        let typeBackgrounds = allPokemon[j]['types'][0]['type']['name']; // Holen Sie den ersten Typ des Pokémon
        let backgroundColor = typeColors[typeBackgrounds]; // Bestimmen Sie die Hintergrundfarbe basierend auf dem Typ

        // Ändern Sie die Hintergrundfarbe der entsprechenden Karte
        document.getElementById(`pokedex${i}`).style.backgroundColor = backgroundColor;
    }
}


// Funktion zum Öffnen einer ausgewählten Pokémon-Karte mit Details
function openPokeCard(i, allPokemon) {
    // Zeigt die Karte an und ruft Funktionen zum Anzeigen von Details auf
    document.getElementById(`pokeCard`).classList.remove('d-none');
    genPokeCardDetails(i);
    renderChart(i, allPokemon);
    getPokemonMoves(i);
}


// Funktion zum Schließen der geöffneten Pokémon-Karte
function closePokeCard() {
    document.getElementById(`pokeCard`).classList.add('d-none');
}


// Funktion zum Verhindern des Schließens der Karte beim Klicken auf Inhalte
function doNotClose(event) {
    event.stopPropagation();
}


function getPokemonMoves(i) {
    let movesContainer = document.getElementById(`moves`);
    let moves = allPokemon[`${i}`]['moves'];
    for (let m = 0; m < moves.length; m++) {
        renderPokemonMoves(m, moves, movesContainer);
    }
}


function renderPokemonMoves(m, moves, movesContainer) {
    let move = moves[m]['move']['name'];
    movesContainer.innerHTML += `
    <span class="moves" id="move${m}">${move}</span>`;
}


function genPokeCardDetails(i) {
    let pokemonName = allPokemon[`${i}`]['name'];
    let pokemonId = allPokemon[`${i}`]['id'];
    let pokemonImg = allPokemon[`${i}`]['sprites']['other']['official-artwork']['front_default'];
    let selectedPokemonHeight = allPokemon[`${i}`]['height'];
    let selectedPokemonWeight = allPokemon[`${i}`]['weight'];
    let selectedPokemonAbilities = allPokemon[i]['abilities'];
    let pokeCardDetails = document.getElementById(`pokemonDetailInfo`);

    pokeCardDetails.innerHTML = createPokemonDetailHTML(i, selectedPokemonHeight, selectedPokemonWeight, selectedPokemonAbilities);
    
    document.getElementById(`pokemonName${i}`).innerHTML = pokemonName;
    document.getElementById(`pokemonId${i}`).innerHTML = '#' + pokemonId;
    document.getElementById(`pokemonImage${i}`).src = pokemonImg;
}

function createPokemonDetailHTML(i, selectedPokemonHeight, selectedPokemonWeight, selectedPokemonAbilities) {
    return /* html */`
    <div class="pokemonDetailInfoContainer">
        <div class="pokemonDetailInfoHeader">
            <h1 id="pokemonName${i}" class="pokemonName">Name</h1>    
            <h2 id="pokemonId${i}">#</h2>
        </div>
        
        <div class="pokemonDetailInfoImg">
            <div>
                <img class="arrow" onclick="previousPokemon(${i})" src="./img/arrow-left.png">
            </div>
            <img id="pokemonImage${i}" class="detailPokemonImg"> 
            <div>
                <img class="arrow" onclick="nextPokemon(${i})" src="./img/arrow-right.png">
            </div>
        </div>    

        <div class="pokemonDetailInfoOverview">
            <div class="pokemonDetailInfoOverviewHeader"></div>
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
                                        <span>Height:</span>
                                        <span>Weight:</span>
                                        <span>Abilities:</span>
                                    </div>

                                    <div class="statsContentValues">
                                        <span>${selectedPokemonHeight / 10} m</span>
                                        <span>${selectedPokemonWeight / 10} kg</span>
                                        <span>${selectedPokemonAbilities.length > 0 ? `<span>${selectedPokemonAbilities.map(a => a['ability']['name'])}</span>` : ''}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-content">
                                <div class="tab-content-stats">
                                    <canvas id="myChart${i}"></canvas>
                                </div>        
                            </div>

                            <div class="tab-content">
                                <div class="tab-content-moves">
                                    <div class="movesContainer" id="moves"></div>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
 `;
}


// Funktion zum Laden von mehr Pokémon beim Klicken auf "Mehr laden"-Button
function loadMorePokemon() {
    currentPokemonIndex += loadStop;
    loadPokemon();
}


// Funktion zum Anzeigen des nächsten Pokémon
function nextPokemon(i) {
    i++;
    openPokeCard(i, allPokemon);
}


// Funktion zum Anzeigen des vorherigen Pokémon
function previousPokemon(i) {
    i--;
    openPokeCard(i, allPokemon);
}


// Funktion zum Filtern der angezeigten Pokémon basierend auf dem Suchbegriff
function filterPokemon() {
    let pokemoncard = document.getElementById('card');
    pokemoncard.innerHTML = '';
    for (let s = 0; s < allPokemon.length; s++) {
        pokemoncard.innerHTML += `<div id="pokedex${s}" class="pokedex"></div>`;
        genPokeCard(s, allPokemon[s]);
    }
    searchPokemon();
}


// Funktion zum Suchen nach Pokémon basierend auf dem eingegebenen Suchbegriff
function searchPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let pokemoncard = document.getElementById('card');
    pokemoncard.innerHTML = '';

    for (let s = 0; s < allPokemon.length; s++) {
        let pokemonName = allPokemon[s]['name'].toLowerCase();
        if (pokemonName.includes(search)) {
            // pokemoncard.innerHTML += `<div id="pokedex${s}" class="pokedex"></div>`;
            // pokemoncard.innerHTML = '';
            genPokeCard(s, allPokemon[s]);
        }
    }
}