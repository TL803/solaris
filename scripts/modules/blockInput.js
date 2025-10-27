document.addEventListener('DOMContentLoaded', () => {
    const modelSelect = document.getElementById('carModelSelect');
    const trimSelect = document.getElementById('carTrimSelect');

    if (!modelSelect || !trimSelect) return;

    modelSelect.addEventListener('change', () => {
        if (modelSelect.value) {
            trimSelect.disabled = false;
        } else {
            trimSelect.disabled = true;
            trimSelect.value = '';
        }
    });
});