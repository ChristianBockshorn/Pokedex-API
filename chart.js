function renderChart(i) {
    let ctx = document.getElementById(`myChart${i}`);


    new Chart(ctx, {
        type: 'bar',
        label: 'Base Stats',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{

                data: [allPokemon[`${i}`]['stats'][0]['base_stat'],
                allPokemon[`${i}`]['stats'][1]['base_stat'],
                allPokemon[`${i}`]['stats'][2]['base_stat'],
                allPokemon[`${i}`]['stats'][3]['base_stat'],
                allPokemon[`${i}`]['stats'][4]['base_stat'],
                allPokemon[`${i}`]['stats'][5]['base_stat']],

                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                    'rgba(255, 205, 86, 0.9)',
                    'rgba(95, 192, 192, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(201, 203, 207, 0.9)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            base: 0,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  }
                },
                x: {
                  max: 120,
                  grid: {
                    display: false,
                  }
                }
              }
        }
    });
}