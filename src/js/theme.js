// UI THEME
const themeMoon = document.getElementById('dark-icon');
const themeSun = document.getElementById('light-icon');
const forecastItems = document.querySelectorAll('#forecast-container > div');

window.addEventListener('click', (e) => {
    if (e.target.id === 'dark-icon' || e.target.id === 'light-icon') {
        themeMoon.classList.toggle('theme');
        themeSun.classList.toggle('theme');
        document.documentElement.classList.toggle('dark');
    };
    if (e.target.id === 'dark-icon') {
        localStorage.setItem('theme', 'light');
    } else if (e.target.id === 'light-icon') {
        localStorage.setItem('theme', 'dark');
    };
    if (!document.documentElement.classList.contains('dark')) {
        forecastItems.forEach(item => item.classList.remove('sm:bg-input'));
    } else {
        forecastItems.forEach(item => item.classList.add('sm:bg-input'));
    };
});

window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === null) {
    if (window.matchMedia('(prefers-color-scheme: dark)')) {
        document.documentElement.classList.add('dark');
        themeSun.classList.toggle('theme');
    } else {
        document.documentElement.classList.remove('dark');
        themeMoon.classList.toggle('theme');
    };
    } else {
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.remove('dark');
            themeMoon.classList.toggle('theme');
        } else if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            themeSun.classList.toggle('theme');
        };
    };
});

// MEASUREMENT
import { Converter } from "./converter.js";
const converter = Converter();
const celsius = document.getElementById('celsius');
const farenheit = document.getElementById('farenheit');

celsius.addEventListener('click', (e) => {
    if (localStorage.getItem('measure') === 'celsius') {
        return;
    } else {
        celsius.classList.toggle('font-medium');
        farenheit.classList.toggle('font-medium');
        localStorage.setItem('measure', 'celsius');
        convertToC();
    };
});

farenheit.addEventListener('click', (e) => {
    if (localStorage.getItem('measure') === 'farenheit') {
        return;
    } else {
        celsius.classList.toggle('font-medium');
        farenheit.classList.toggle('font-medium');
        localStorage.setItem('measure', 'farenheit');
        convertToF();
    };
});

function convertToC() {
    converter.toCelsius();
    converter.toKMH();
    converter.to24H();
};

function convertToF() {
    converter.toFarenheit();
    converter.toMPH();
    converter.to12H();
};

window.addEventListener('load', () => {
    if (localStorage.getItem('measure') === null) {
        localStorage.setItem('measure', 'celsius');
        celsius.classList.toggle('font-medium');
    } else {
        if (localStorage.getItem('measure') === 'celsius') {
            celsius.classList.toggle('font-medium');
            return;
        } else if (localStorage.getItem('measure') === 'farenheit') {
            farenheit.classList.toggle('font-medium');
            convertToF();
        };
    };
});

// LANGUAGE
import { Translator } from "./translator.js";

const translator = Translator();

const select = document.querySelector('select');
window.addEventListener('load', () => {
    if (localStorage.getItem('lang') === null) {
        const localLang = navigator.language.slice(0, 2);
        translator.changeFlag(localLang);
    } else {
        const lang = localStorage.getItem('lang');
        translator.changeFlag(lang);
    };
});

select.addEventListener('change', (e) => {
    translator.changeFlag(e.target.value);
    localStorage.setItem('lang', e.target.value);
});

// IMAGES
const imgs = Array.from(document.querySelectorAll('img'));
const now = new Date();

window.addEventListener('load', () => {
    if (now.getHours() > 18) {
        const newImgArray = imgs.map(img => img.src.replaceAll('day', 'night'));
        imgs.forEach((img, index) => {
            img.src = newImgArray[index];
        });
    } else {
        const newImgArray = imgs.map(img => img.src.replaceAll('night', 'day'));
        imgs.forEach((img, index) => {
            img.src = newImgArray[index];
        });
    };
});

translator.translate('pt-BR')