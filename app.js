// To run it use next commands in CMD
// cd c:\Program Files\Google\Chrome\Application
// chrome.exe --disable-web-security --user-data-dir="c:/ChromeDevSession”
// file:///D:/programming/SteamPrice/index.html
const link = 'https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=';
const linkArray = [
    'Prisma%20Case',
    'Fracture%20Case',
    'Prisma%202%20Case',
    'Danger%20Zone%20Case',
    'Clutch%20Case',
    'Dreams%20%26%20Nightmares%20Case',
    'Snakebite%20Case',
    'Revolution%20Case',
    'Recoil%20Case',
    'Sticker%20%7C%20Natus%20Vincere%20%7C%20Katowice%202019',
    'Sticker%20%7C%20FaZe%20Clan%20%7C%20Katowice%202019',
    '2020%20RMR%20Legends',
    '2020%20RMR%20Challengers',
    '2020%20RMR%20Contenders',
    'Stockholm%202021%20Legends%20Sticker%20Capsule',
    'Stockholm%202021%20Challengers%20Sticker%20Capsule',
    'Stockholm%202021%20Contenders%20Sticker%20Capsule',
    'Stockholm%202021%20Champions%20Autograph%20Capsule',
    'Stockholm%202021%20Finalists%20Autograph%20Capsule',
    'Stockholm%202021%20Legends%20Patch%20Pack',
    'Sticker%20%7C%20Natus%20Vincere%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20Natus%20Vincere%20%28Holo%29%20%7C%20Stockholm%202021',
    'Patch%20%7C%20Natus%20Vincere%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20Gambit%20Gaming%20%28Holo%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20FURIA%20%28Holo%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20Vitality%20%28Holo%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20Ninjas%20in%20Pyjamas%20%28Holo%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20Team%20Liquid%20%28Holo%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20Team%20Liquid%20%28Foil%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20G2%20Esports%20%28Holo%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20G2%20Esports%20%28Foil%29%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20s1mple%20%7C%20Stockholm%202021',
    'Sticker%20%7C%20s1mple%20%28Holo%29%20%7C%20Stockholm%202021',
    'Antwerp%202022%20Legends%20Sticker%20Capsule',
    'Antwerp%202022%20Challengers%20Sticker%20Capsule',
    'Antwerp%202022%20Contenders%20Sticker%20Capsule',
    'Antwerp%202022%20Legends%20Autograph%20Capsule',
    'Antwerp%202022%20Challengers%20Autograph%20Capsule',
    'Antwerp%202022%20Contenders%20Autograph%20Capsule',
    'Antwerp%202022%20Champions%20Autograph%20Capsule',
    'Sticker%20%7C%20Natus%20Vincere%20%7C%20Antwerp%202022',
    'Sticker%20%7C%20Cloud9%20%7C%20Antwerp%202022',
    'Sticker%20%7C%20Cloud9%20%28Glitter%29%20%7C%20Antwerp%202022',
    'Sticker%20%7C%20Cloud9%20%28Holo%29%20%7C%20Antwerp%202022',
    'Rio%202022%20Legends%20Sticker%20Capsule',
    'Rio%202022%20Challengers%20Sticker%20Capsule',
    'Rio%202022%20Contenders%20Sticker%20Capsule',
    'Rio%202022%20Legends%20Autograph%20Capsule',
    'Rio%202022%20Challengers%20Autograph%20Capsule',
    'Rio%202022%20Contenders%20Autograph%20Capsule',
    'Rio%202022%20Champions%20Autograph%20Capsule',
    'Paris%202023%20Legends%20Sticker%20Capsule',
    'Paris%202023%20Challengers%20Sticker%20Capsule',
    'Paris%202023%20Contenders%20Sticker%20Capsule',
    'Paris%202023%20Legends%20Autograph%20Capsule',
    'Paris%202023%20Challengers%20Autograph%20Capsule',
    'Paris%202023%20Contenders%20Autograph%20Capsule',
    'Paris%202023%20Champions%20Autograph%20Capsule',
    'Sticker%20%7C%20Natus%20Vincere%20%28Gold%29%20%7C%20Paris%202023'
];
document.getElementById('output').innerHTML += 'Приблизний час очікування — ' + Math.round((linkArray.length*3)/60 ) + ' хвилин' + "<br/>";
let cost = document.getElementsByClassName('price'),
    timer = 0;

function fetchData() {
    // Create a script tag for each request
    for (let i = 0; i < linkArray.length; i++) {
        let script = document.createElement('script');
        script.src = link + linkArray[i] + '&format=jsonp&callback=handleResponse';
        document.body.appendChild(script);
    }
}

// Define the callback function to handle the response
function handleResponse(data) {
    // Find the matching element by the market hash name
    let element = document.querySelector(`[data-market-hash-name="${data.market_hash_name}"]`);
    // Update the price
    element.innerHTML += data.lowest_price;
}

