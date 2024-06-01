type createBlockType = string | string[] | null;

interface Buttons {
  title: string,
  id: number
}

class Tools
{
  static createBlock(block:string, content:string|null = null, className: createBlockType = null): HTMLElement
  {
    const newBlock = document.createElement(block);

    if(className) {
      newBlock.classList.add(...(typeof className === 'string' ? [className] : className));
    }

    if(content) {
      newBlock.innerHTML = content;
    }

    return newBlock;
  }

  static createTitlesButtons(data: Buttons[]): HTMLElement[]
  {
    const buttons: HTMLElement[] = []

    data.forEach((item: Buttons) => {
      const li = this.createBlock('li', null, 'main__button');
      const span = Tools.createBlock('span', item.title);

      li.dataset.menu = String(item.id);
      li.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="IconChangeColor" height="30" width="30"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" id="mainIconPathAttribute"></path></svg>';
      li.append(span)
      buttons.push(li)
    });

    return buttons;
  }
}

export { Tools };