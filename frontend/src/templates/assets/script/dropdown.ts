const dropdown = document.querySelector('.dropdown');

if(dropdown) {
  const dropdownSelect = dropdown.querySelector('.dropdown__select');
  const dropdownList = dropdown.querySelector('.dropdown__list');
  const dropSelectText = document.querySelector('.dropdown__text');

  if(dropdownSelect && dropdownList && dropSelectText) {
    dropdownSelect.addEventListener('click', (event) => {
      const target = <HTMLElement>event.currentTarget;

      dropdown.classList.toggle('dropdown_active');
    });

    dropdownList.addEventListener('click', (event) => {
      const target = <HTMLElement>event.target;

      if(target.classList.contains('dropdown__item')) {
        const value = target.dataset.value;
        const name = target.innerText;
        const body = document.querySelector('.body');

        if(body && value && name) {
          body.className = 'body';
          dropdown.classList.remove('dropdown_active');
          body.classList.add(value);
          dropSelectText.innerHTML = name;
        }
      }
    });
  }
}