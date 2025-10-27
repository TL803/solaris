const colorContainer = document.getElementById('colors-container');
const carImage = document.getElementById('car-image');

const colors = [
    { name: "Rectangle 243.png", hex: "#FFFFFF" },
    { name: "Rectangle 248.png", hex: "#FFFFFF" },
    { name: "Rectangle 248.png", hex: "#949494" },
    { name: "Rectangle 248.png", hex: "#000000" },
    { name: "Rectangle 248.png", hex: "#BFBFBF" }
];

let activeColorElem = null;

colors.forEach((color) => {
    const colorElem = document.createElement('div');
    // Фиксированный размер: 48×48px, включая border
    colorElem.style.width = '48px';
    colorElem.style.height = '48px';
    colorElem.style.border = '2px solid #D1D5DB'; // tailwind gray-300
    colorElem.style.borderRadius = '6px';
    colorElem.style.backgroundColor = color.hex;
    colorElem.style.cursor = 'pointer';
    colorElem.style.boxSizing = 'border-box'; // важно: border входит в 48px
    colorElem.title = `${color.name} — ${color.hex}`;
    colorElem.dataset.color = color.name;
    colorContainer.appendChild(colorElem);
});

colorContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== 'DIV') return;

    if (activeColorElem) {
        activeColorElem.style.borderColor = '#D1D5DB'; // gray-300
    }

    e.target.style.borderColor = '#3B82F6'; // tailwind blue-500
    activeColorElem = e.target;

    const selectedColor = e.target.dataset.color;
    carImage.src = `../assets/auto/${selectedColor}`;
});

// Активировать первый цвет
if (colorContainer.firstElementChild) {
    colorContainer.firstElementChild.click();
}