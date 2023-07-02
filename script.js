const searchForm = document.querySelector('.search-form');
const playerInput = document.querySelector('#player-input');
const playerDetails = document.querySelector('#player-details');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = playerInput.value;
    getPlayerDetails(playerName);
});

async function getPlayerDetails(playerName) {
    try {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`);
    const data = await response.json();

    if (data && data.player) {
        const player = data.player[0];
        playerDetails.innerHTML = `
        <div class="bingkai">
        <img src="${player.strThumb}" alt="${player.strPlayer}" />
        <h3>${player.strPlayer}</h3>
        </div>
        <h4>Club: ${player.strTeam}</h4>
        <h4>Posisi: ${player.strPosition}</h4>
        <h4>Kebangsaan: ${player.strNationality}</h4>
        <h4>Tanggal Lahir: ${player.dateBorn}</h4>
        <p>Deskripsi: ${player.strDescriptionEN}</p>
        `;
    } else {
        playerDetails.innerHTML = '<h4 class="error-message">Pemain tidak ditemukan</h4>';
    }
    } catch (error) {
    console.log('Error:', error);
}
}