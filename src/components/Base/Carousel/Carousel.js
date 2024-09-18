/**
* Carousel
* @param {HTMLElement[]} objectArray - Array de elementos HTML que serão apresentados no carrossel.
* @param {string} previousButtonImg - URL da imagem do botão "anterior" do carrossel.
* @param {string} nextButtonImg - URL da imagem do botão "próximo" do carrossel.
* @param {number} itemPresentationTime - Tempo de apresentação de cada item, em milissegundos.
* @param {number} [numberOfItemsToShow=1] - Quantidade de itens a serem exibidos ao mesmo tempo no carrossel.
* 
* @throws {Error} Se 'itemPresentationTime' não for um número positivo.
* @throws {Error} Se 'previousButtonImg' ou 'nextButtonImg' não forem strings válidas.
* @throws {Error} Se algum item em 'objectArray' não for uma instância de HTMLElement.
* @throws {Error} Se 'numberOfItemsToShow' não for um número positivo.
* @throws {Error} Se 'numberOfItemsToShow' for maior que o número total de itens em 'objectArray'.
*  
* @method create - Cria o carrossel com seus itens e botões de controle.
* @method update - Atualiza o índice atual do carrossel e os itens visíveis.
* @method #createItem - Cria o contêiner de itens do carrossel e insere os elementos HTML fornecidos.
* @method #updateItem - Atualiza a exibição dos itens do carrossel com base nos índices antigos e novos.
* @method #getItem - Retorna o item HTML correspondente a um índice fornecido.
* @method #startInterval - Inicia o intervalo de troca automática dos itens do carrossel.
* @method #pauseInterval - Pausa o intervalo de troca automática.
* @method #createMenu - Cria os botões de navegação do carrossel (anterior, próximo e seletor de itens).
* @method #updateMenu - Atualiza o estado dos botões de navegação com base no item atualmente selecionado.
* @method #handleCurrentIndex - Ajusta o índice atual para garantir que ele esteja dentro dos limites do array.
* @method #createElementWithClass - Cria um elemento HTML com uma classe CSS opcional.
* @method #validateParameters - Valida os parâmetros fornecidos para a criação do carrossel.
*/

export class Carousel {
  constructor({
    objectArray, 
    previousButtonImg = "<", 
    nextButtonImg = ">", 
    itemPresentationTime = 3000, 
    numberOfItemsToShow = 1
  }) {
    this.#validateParameters(objectArray, previousButtonImg, nextButtonImg, itemPresentationTime, numberOfItemsToShow);
    
    this.objectArray = objectArray;
    this.previousButtonImg = previousButtonImg;
    this.nextButtonImg = nextButtonImg;
    this.itemPresentationTime = itemPresentationTime;
    this.numberOfItemsToShow = numberOfItemsToShow;

    this.currentIndex = 0;
  }
  
  create() {
    const carousel = this.#createElementWithClass("div", "carousel");
    carousel.classList.add("carousel");
    
    this.content = this.#createItem();
    carousel.appendChild(this.content);
    this.currentIndexes = this.#setInitialIndexes();
    const fullIndexArray = [];
    for (let i = 0; i < this.objectArray.length; i++) {
      fullIndexArray.push(i);
    }
    const difference = fullIndexArray.filter(element => !this.currentIndexes.includes(element))
    this.#updateItem(difference);


    const menu = this.#createMenu();
    carousel.appendChild(menu);

    if (this.itemInterval) {
      clearInterval(this.itemInterval);
    }

    this.#startInterval();

    return carousel;
  }

  #setInitialIndexes() {
    let count = this.numberOfItemsToShow;
    const indexes = [];
    while (count > 0) {
      count--;
      const quocient = count / 2;
      const remainder = count % 2;
      const index = (remainder === 0) ? - quocient : quocient + 0.5;
      indexes.push(this.#handleCurrentIndex(index, this.objectArray))
    }
    return indexes.sort();
  }

  #createItem() {
    const contentDiv = this.#createElementWithClass("div", "content");
    for (const [index, item] of this.objectArray.entries()) {     
      const div = this.#createElementWithClass("div", "carousel-item");
      div.dataset.key = index;
      div.appendChild(item)
      contentDiv.appendChild(div);
    }
    return contentDiv;
  }

  update(newIndex, numberOfItemsToShow = null) {
    const oldIndexes = this.currentIndexes;

    if (numberOfItemsToShow) {
      this.numberOfItemsToShow = numberOfItemsToShow;
    };
    newIndex = this.#handleCurrentIndex(Number(newIndex), this.objectArray);
    this.currentIndex = newIndex;

    let minIndex;
    let maxIndex;
    if (this.numberOfItemsToShow % 2 === 0) {
      minIndex = newIndex - this.numberOfItemsToShow / 2 + 1;
      maxIndex = newIndex + this.numberOfItemsToShow / 2;
    } else {
      minIndex = newIndex - (this.numberOfItemsToShow - 1) / 2;
      maxIndex = newIndex + (this.numberOfItemsToShow - 1) / 2;
    }

    const newIndexes = [];
    for (let i = minIndex; i <= maxIndex; i++) {
      newIndexes.push(this.#handleCurrentIndex(i, this.objectArray));
    }
    this.currentIndexes = newIndexes;

    this.#updateMenu();
    this.#updateItem(oldIndexes);
  }

  #updateItem(oldIndexes) {
    for (const index of oldIndexes) {
      const item = this.#getItem(index);
      item.classList.add("hide");
    }
    for (const index of this.currentIndexes) {
      const item = this.#getItem(index);
      item.classList.remove("hide");
    }
  }

  #getItem(key) {
    const targetElement = Array.from(this.content.children).find(child => key == child.dataset.key);
    return targetElement;
  }

  #startInterval = () => {
    this.itemInterval = setInterval(() => this.update(this.currentIndex + 1), this.itemPresentationTime);
  };

  #pauseInterval = () => {
    clearInterval(this.itemInterval);
  };

  #createMenu() {
    this.menu = this.#createElementWithClass("nav", "carousel_menu");

    const previousButton = this.#createElementWithClass("button");
    previousButton.setAttribute("aria-label", "Previous");
    if (this.previousButtonImg !== "<") {
      previousButton.style.backgroundImage = `url(${this.previousButtonImg})`;
    } else {
      previousButton.textContent = "<"
    }
    previousButton.addEventListener("click", () => {
      this.update(this.currentIndex - 1);
      this.#pauseInterval();
      setTimeout(this.#startInterval, this.itemPresentationTime);
    });
    this.menu.appendChild(previousButton);

    this.selectButtonArea = this.#createElementWithClass("div");
    this.menu.appendChild(this.selectButtonArea);

    for (let i = 0; i < this.objectArray.length; i++) {
      const button = this.#createElementWithClass("button");
      button.dataset.key = i;
      if (i === this.currentIndex) {
        button.classList.add("selected");
      }
      button.addEventListener("click", () => {
        this.update(i)
        this.#pauseInterval();
        setTimeout(this.#startInterval, this.itemPresentationTime);
      });
      this.selectButtonArea.appendChild(button);
    }

    const nextButton = this.#createElementWithClass("button");
    nextButton.setAttribute("aria-label", "Next");
    if (this.nextButtonImg !== ">") {
      nextButton.style.backgroundImage = `url(${this.nextButtonImg})`;
    } else {
      nextButton.textContent = ">"
    }
    nextButton.addEventListener("click", () => this.update(this.currentIndex + 1));
    this.menu.appendChild(nextButton);

    return this.menu;
  }

  #updateMenu(){
    for (const button of this.selectButtonArea.children) {
      if (parseInt(button.dataset.key) === this.currentIndex) {
        button.classList.add("selected");
      } else {
        if (button.classList.contains("selected")) {
          button.classList.remove("selected");
        }
      }
    }
  }

  #handleCurrentIndex(newIndex, array) {
    return (newIndex + array.length) % array.length;
  }

  #createElementWithClass(tag, className = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  #validateParameters(objectArray, previousButtonImg, nextButtonImg, itemPresentationTime, numberOfItemsToShow) {
    if (typeof itemPresentationTime !== 'number' || itemPresentationTime <= 0) {
      throw new Error("O parâmetro 'itemPresentationTime' deve ser um número positivo.");
    }
    if (typeof previousButtonImg !== 'string' || typeof nextButtonImg !== 'string') {
      throw new Error("Os parâmetros 'previousButtonImg' e 'nextButtonImg' devem ser strings válidas.");
    }
    objectArray.forEach(item => {
      if (!(item instanceof HTMLElement)) {
          throw new Error("Todos os elementos devem ser instâncias de HTMLElement.");
      }
    });
    if (typeof numberOfItemsToShow !== 'number' || numberOfItemsToShow <= 0) {
      throw new Error("'numberOfItemsToShow' deve ser um número positivo.");
    }
    if (numberOfItemsToShow > objectArray.length) {
      throw new Error("'numberOfItemsToShow' não pode ser maior que o número total de itens.");
    }
  }
}