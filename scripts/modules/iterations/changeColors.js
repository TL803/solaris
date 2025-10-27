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
    colorElem.className = 'w-[48px] h-[48px] border-2 border-gray-300 rounded-[6px] cursor-pointer';
    colorElem.style.backgroundColor = color.hex;
    colorElem.title = `${color.name} — ${color.hex}`;
    colorElem.dataset.color = color.name;
    colorContainer.appendChild(colorElem);
});

colorContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cursor-pointer')) {
        if (activeColorElem) {
            activeColorElem.classList.replace('border-blue-500', 'border-gray-300');
        }

        e.target.classList.replace('border-gray-300', 'border-blue-500');
        activeColorElem = e.target;

        const selectedColor = e.target.dataset.color;
        carImage.src = `../assets/auto/${selectedColor}`;
    }
});

if (colorContainer.firstElementChild) {
    colorContainer.firstElementChild.click();
}