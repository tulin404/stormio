const img = document.getElementById('img-flag');
const options = Array.from(document.querySelectorAll('option'));

function changeFlag(value) {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption !== undefined) {
        img.src = `public/flags/${value}.svg`;
        selectedOption.selected = true;
    } else  {
        img.src = `public/flags/en.svg`;
        const enOpt = options.find(option => option.value = 'en');
        enOpt.selected = true;
    }
};

export function Translator() {
    return {
        changeFlag(value) {
            return changeFlag(value);
        }, translate(value) {
            return translate(value);
        }
    };
};