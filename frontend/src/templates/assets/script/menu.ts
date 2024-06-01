const menuBtn = document.querySelector('.menu__button');
const menuActive = document.querySelector('.menu_active');

if(menuBtn) {
  menuBtn.addEventListener('click', (event) => {
    const target = <HTMLElement>event.currentTarget;
    const menu = target.closest('.menu');

    if(menu) {
      menu.classList.toggle('menu_active');
    }
  });
}

if(window.screen.width <= 1024 && menuActive) {
  menuActive.classList.remove('menu_active');
}