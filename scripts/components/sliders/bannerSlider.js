  document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      loop: true,

      autoplay: {
        delay: 5000,
        disableOnInteraction: false, 
      },

      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },

      pagination: {
        el: '.carousel-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<div class="${className} w-6 h-1 rounded-full cursor-pointer ${
            index === 0 ? 'bg-white' : 'bg-white bg-opacity-50'
          }"></div>`;
        },
      },

      speed: 500,

      on: {
        init() {
          const container = document.querySelector('.carousel-container');
          if (container) {
            container.addEventListener('mouseenter', () => {
              swiper.autoplay.stop();
            });
            container.addEventListener('mouseleave', () => {
              swiper.autoplay.start();
            });
          }
        }
      }
    });
  });