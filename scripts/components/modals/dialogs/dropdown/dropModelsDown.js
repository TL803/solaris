document.addEventListener('DOMContentLoaded', function () {
    const modelsLink = document.querySelector('p[data-open-modal="models-modal"]');
    const dropdown = document.getElementById('models-dropdown');

    modelsLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (dropdown.classList.contains('hidden')) {
            closeAllDropdowns(); 
            dropdown.classList.remove('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    });

    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target) && e.target !== modelsLink) {
            dropdown.classList.add('hidden');
        }
    });

    function closeAllDropdowns() {
        const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
        allDropdowns.forEach(d => d.classList.add('hidden'));
    }
});