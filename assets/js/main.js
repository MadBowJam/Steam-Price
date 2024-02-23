// To run it use next commands in CMD
// cd c:\Program Files\Google\Chrome\Application
// chrome.exe --disable-web-security --user-data-dir="c:/ChromeDevSession”
// file:///D:/programming/SteamPrice/index.html;
const link = 'https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=';
document.getElementById('output').innerHTML += 'Приблизний час очікування — ' + Math.round((linkArray.length*3)/60 ) + ' хвилин' + "<br/>";
let timer = 0;

// Функція для форматування ціни з формату "$0.63" у "0,63"
function formatPrice(priceString) {
    // Відкидаємо символ "$" та замінюємо кому на крапку
    return priceString.substring(1).replace('.', ',');
}

function fetchData() {
    const tableBody = document.getElementById('table');
    // const data = []; // Масив для збереження отриманих даних
    const lowestPrices = []; // Оголошуємо масив для зберігання найнижчих цін

    // Отримання сьогоднішньої дати
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // "+1" бо місяці в JS починаються з 0
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const today = `${day}.${month}.${year}_(${hours}_${minutes})`;

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
                    const price = response.lowest_price; // Отримання лише найнижчої ціни
                    const formattedPrice = formatPrice(price); // Форматування ціни
                    lowestPrices.push(formattedPrice); // Додавання форматованої ціни до масиву

                    // Створення нового рядка для таблиці
                    const newRow = document.createElement('tr');
                    const newCell = document.createElement('th');
                    newCell.classList.add('price');
                    newCell.innerHTML = formattedPrice; // Встановлення форматованої ціни
                    newRow.appendChild(newCell);
                    tableBody.appendChild(newRow);

                    // Перевірка, чи це останній запит
                    if (lowestPrices.length === linkArray.length) {
                        // Конвертування масиву з найнижчими цінами у рядок JSON
                        const jsonData = JSON.stringify(lowestPrices);

                        // Створення посилання для завантаження файлу JSON зі сьогоднішньою датою та часом в назві
                        const blob = new Blob([jsonData], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${today}.json`; // Використання сьогоднішньої дати та часу в назві файлу
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data for', link + linkArray[i], ':', error);
                    // Обробка помилки за необхідності
                });
        }, timer);
        timer += 5000;
    }
}
