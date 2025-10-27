document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModalBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentImages = [];
    let currentIndex = 0;

    const carInfoBlocks = document.querySelectorAll('[data-car-info]');

    carInfoBlocks.forEach(block => {
        const thumbnails = block.querySelectorAll('.flex img:not([src*="icons/"])');

        thumbnails.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                currentImages = Array.from(thumbnails).map(thumb => thumb.src);
                currentIndex = index;
                openModal();
            });
        });
    });

    function openModal() {
        modalImg.src = currentImages[currentIndex];
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        currentImages = [];
        currentIndex = 0;
    }

    function showNext() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImg.src = currentImages[currentIndex];
    }

    function showPrev() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex];
    }

    closeModalBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowRight') showNext();
        else if (e.key === 'ArrowLeft') showPrev();
    });
});