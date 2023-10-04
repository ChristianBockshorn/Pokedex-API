function renderChart(i, allPokemon) {
    let ctx = document.getElementById(`myChart${i}`);


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{

                data: [allPokemon[`${i}`]['stats'][0]['base_stat'],
                        allPokemon[`${i}`]['stats'][1]['base_stat'],
                        allPokemon[`${i}`]['stats'][2]['base_stat'],
                        allPokemon[`${i}`]['stats'][3]['base_stat'],
                        allPokemon[`${i}`]['stats'][4]['base_stat'],
                        allPokemon[`${i}`]['stats'][5]['base_stat']],
                borderWidth: 3
            }]
        },
        options: {
            indexAxis: 'y',
        }
    });
}