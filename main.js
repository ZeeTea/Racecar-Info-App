const resultContainer = document.getElementById('result')
const form = document.querySelector('form')
const seasonInput = document.querySelector('#season')
const roundInput = document.querySelector('#round')
const tableBody = document.querySelector('#f1-table tbody')

function displayData(drivers, round) {
  tableBody.innerHTML = '';
  drivers.forEach((driver) => {
    const {
      position,
      Driver: { givenName, familyName, nationality },
      Constructors: [{ name: sponsor }],
      points,
      wins,
    } = driver;

    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${position}</td>
      <td>${givenName} ${familyName}</td>
      <td>${nationality}</td>
      <td>${sponsor}</td>
      <td>${points}</td>
      <td>${wins}</td>
      <td>${round}</td>
    `;
    tableBody.appendChild(tr)
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const season = seasonInput.value;
  const round = roundInput.value;

  try {
    const response = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
    if (!response.ok) {
      throw { status: 404, message: 'Resource not found' };
    }
    const data = await response.json();
    const drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    displayData(drivers, round);
  } catch (error) {
    console.error(`Error (${error.status}): ${error.message}`);
  }
});