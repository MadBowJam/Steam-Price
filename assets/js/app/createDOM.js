import { linkArray } from './links.js';
import { fetchData } from '../index.js';
const elements = [
  { tag: 'h1', textContent: 'Steam price checker' }, // Створення заголовка прогами
  { tag: 'h4', id: 'output', innerHTML: `Приблизний час очікування — ${Math.round((linkArray.length * 5) / 60)} хвилин<br/>` }, // Створення приблизного часу очікування
  { tag: 'button', textContent: 'Перевірка цін', onclick: fetchData }, // Створення кнопки
  { tag: 'table', id: 'table' } // Створення таблиці
];

// elements.map(({tag, ...props}) => document.body.appendChild(Object.assign(document.createElement(tag), props))); // Створення елементів вебсторінки в масиві elements та додавання їх до сторінки

export { elements };