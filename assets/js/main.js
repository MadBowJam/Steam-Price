// To run it use next commands in CMD
// cd c:\Program Files\Google\Chrome\Application
// chrome.exe --disable-web-security --user-data-dir="c:/ChromeDevSession”
// file:///D:/programming/SteamPrice/index.html;
const link = 'https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=';
document.getElementById('output').innerHTML += 'Приблизний час очікування — ' + Math.round((linkArray.length*3)/60 ) + ' хвилин' + "<br/>";
let cost = document.getElementsByClassName('price'),
    timer = 0;

function fetchData() {
    const tableBody = document.getElementById('table');
    const data = []; // Масив для збереження отриманих даних

    // Отримання сьогоднішньої дати
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // "+1" бо місяці в JS починаються з 0
    const year = currentDate.getFullYear();
    const today = `${day}.${month}.${year}`;

    for (let i = 0; i < linkArray.length; i++) {
        setTimeout(() => {
            fetch(link + linkArray[i])
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(response => {
                    const price = JSON.stringify(response);
                    const newRow = document.createElement('tr');
                    const newCell = document.createElement('th');
                    newCell.classList.add('price');
                    newCell.innerHTML = price.split('"')[5].substring(1).replace('.', ',');
                    newRow.appendChild(newCell);
                    tableBody.appendChild(newRow);

                    // Зберегти дані у масиві
                    data.push(response);

                    // Перевірка, чи це останній запит
                    if (data.length === linkArray.length) {
                        // Конвертувати масив даних у рядок JSON
                        const jsonData = JSON.stringify(data);

                        // Створити посилання для завантаження файлу JSON зі сьогоднішньою датою в назві
                        const blob = new Blob([jsonData], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${today}.json`; // Використовуємо сьогоднішню дату в назві файлу
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data for', link + linkArray[i], ':', error);
                    // Handle the error as needed
                });
        }, timer);
        timer += 5000;
    }
}