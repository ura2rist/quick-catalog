import {Tools} from "./tools";

window.addEventListener('DOMContentLoaded', () => {
  const menuBtns = document.querySelectorAll('.menu__content-item');
  const content = <HTMLElement>document.querySelector('.main__content');
  const articlesBtn = document.querySelectorAll('.main__article');
  const buttons = document.querySelector('.main__buttons');
  const link = 'http://localhost';

  if(menuBtns.length && buttons && content) {
    menuBtns.forEach((menuBtn) => {
      menuBtn.addEventListener('click', async (event) => {
        const target = <HTMLElement>event.currentTarget;
        const response = await fetch(`${link}/api/gettitle?id=${target.dataset.menu}`);
        const result = await response.json();

        if(result) {
          buttons.innerHTML = '';
          content.innerHTML = '';

          const buttonsHTML = Tools.createTitlesButtons(result.data);

          buttonsHTML.forEach((item: HTMLElement) => {
            buttons.append(item)
          });
        }
      });
    });
  }


  if(buttons && content) {
    buttons.addEventListener('click', async (event) => {
      const target = <HTMLElement>event.target;
      const parentLi = <HTMLElement>target.closest('.main__button');

      if(parentLi) {
        const response = await fetch(`${link}/api/getcontent?id=${parentLi.dataset.menu}`);
        const result = await response.json();

        if(result) {
          content.dataset.contentId = result.id;
          content.innerHTML = result.content;
        }
      }
    });
  }

  if(articlesBtn.length) {
    articlesBtn.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        const target = <HTMLElement>event.currentTarget;
        const response = await fetch(`${link}/api/getcontent?id=${target.dataset.menu}&category=${target.dataset.category}`);
        const result = await response.json();

        if(result && buttons) {
          buttons.innerHTML = '';

          content.dataset.contentId = result.id;
          content.innerHTML = result.content;

          const buttonsHTML = Tools.createTitlesButtons(result.data);

          buttonsHTML.forEach((item: HTMLElement) => {
            buttons.append(item)
          });
        }
      })
    });
  }
});