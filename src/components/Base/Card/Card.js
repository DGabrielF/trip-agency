/**
* Representa um cartão de informação com título, detalhes, imagens e funções de interação.
* 
* @param {string} title - O título do cartão. Deve ser uma string.
* @param {string|Array<string>|HTMLElement} detail - Detalhes do cartão. Pode ser uma string, um array de strings ou um elemento HTML.
* @param {string|Array<string|Object>} images - Imagens do cartão. Pode ser uma string com a URL da imagem, um array de strings com URLs de imagens, um objeto com ropriedades `src` e `alt`, ou um array de objetos com essas propriedades.
 * @param {Function|null} onClickFunction - Função a ser chamada quando o cartão for clicado. Deve ser uma função ou `null`.
* @param {Function|null} onHoverFunction - Função a ser chamada quando o cartão for sobrevoado. Deve ser uma função ou `null`.
* @param {number|null} overlay - Opacidade da camada sobre o cartão. Deve ser um número entre 0 e 100 ou `null` para ignorar a camada.
* 
* @throws {Error} Se 'title' não for uma string.
* @throws {Error} Se 'detail' não for uma string, um array de strings ou um elemento HTML.
* @throws {Error} Se 'images' não for uma string, um array de strings, um objeto com propriedade 'src' ou um array de objetos com propriedades 'src' e opcionalmente 'alt'.
* @throws {Error} Se 'overlay' não for um número entre 0 e 100 ou 'null'.
* @throws {Error} Se 'onClickFunction' não for uma função ou 'null'.
* @throws {Error} Se 'onHoverFunction' não for uma função ou 'null'.

* @method create - Cria o cartão com seus itens e funções associadas.
* @method #addEventListeners - Adiciona event listeners ao cartão para clique e hover, se funções forem fornecidas.
* @method #createElementWithClass - Cria um elemento HTML com uma classe CSS opcional.
* @method #createDetail - Cria a seção de detalhes do cartão.
* @method #createImage - Cria a seção de imagens do cartão.
* @method #setImage - Cria uma imagem HTML com base nos dados fornecidos.
* @method #createOverlay - Cria a camada de sobreposição do cartão, se necessário.
* @method #objectAttibutes - Retorna um objeto com os atributos do cartão.
* @method #validateParameters - Valida os parâmetros fornecidos para a criação do cartão.
*/

export class Card {
  constructor({
    title = "Título do Cartão",
    detail = "Detalhes sobre o Cartão",
    images = "imagem_padrão.png",
    imageDuration = 1500, 
    onClickFunction = () => console.log("Cartão clicado"),
    onHoverFunction = null,
    overlay = null
  }) {
    this.#validateParameters(title, detail, images, imageDuration, onClickFunction, onHoverFunction, overlay);

    this.title = title;
    this.detail = detail;
    this.images = images;
    this.imageDuration = imageDuration;
    this.onClickFunction = onClickFunction;
    this.onHoverFunction = onHoverFunction;
    this.overlay = overlay;
  }

  create() {
    const card = this.#createElementWithClass("div", "card");    
    this.#addEventListeners(card);

    if (typeof this.title === "string") {
      const cardTitle = this.#createElementWithClass("h3", "title");
      cardTitle.textContent = this.title;
      card.appendChild(cardTitle);
    }
    
    if (this.images) {
      const cardImage = this.#createImage();
      card.appendChild(cardImage);

      if (this.overlay) {
        cardImage.classList.add("overlaid")
        const cardOverlay = this.#createOverlay();
        card.appendChild(cardOverlay);
      }
    }
    
    if (this.detail) {
      const cardDetail = this.#createDetail();
      card.appendChild(cardDetail);
    }

    return card;
  }

  #addEventListeners(card) {
    if (this.onClickFunction) {
      card.addEventListener("click", () => this.onClickFunction(this.#objectAttibutes()));
    }

    if (this.onHoverFunction) {
      card.addEventListener("mouseover", () => this.onHoverFunction(this.#objectAttibutes()));
    }
  }

  #createElementWithClass(tag, className = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  #createDetail() {
    const cardDetail = this.#createElementWithClass("div", "detail");

    if (typeof this.detail === "string") {
      cardDetail.textContent = this.detail;
    } else if (Array.isArray(this.detail)) {
      this.detail.forEach(item => {
        const phrase = document.createElement("p");
        phrase.textContent = item;
        cardDetail.appendChild(phrase);
      });
    } else if (this.detail instanceof HTMLElement) {
      cardDetail.appendChild(this.detail);
    }

    return cardDetail;
  }
  
  #createImage() {
    const cardImage = this.#createElementWithClass("div", "image");
    
    if (Array.isArray(this.images)) {
      this.imageIndex = 0;
      this.#setImage(this.images[this.imageIndex]);
      
      this.imageInterval = setInterval(() => {
        this.imageIndex = (this.imageIndex + this.images.length + 1) % this.images.length;        
        this.#setImage(this.images[this.imageIndex]);
      }, this.imageDuration)
    } else {
      cardImage.appendChild(this.#setImage(this.images));
    }
    
    return cardImage;
  }

  #setImage(imageData) {
    const image = this.#createElementWithClass("img");
    if (typeof imageData === "string") {
      image.src = imageData;
      image.alt = "card image";
    } else if (typeof imageData === 'object' && imageData !== null && !Array.isArray(imageData)) {
      if (Object.prototype.hasOwnProperty.call(imageData, 'src')) {
        image.src = imageData.src;
      }
      if (Object.prototype.hasOwnProperty.call(imageData, 'src')) {
        image.alt = imageData.alt;
      }
    }

    return image;
  }

  #updateImage() {
    this.imageIndex
  }

  #createOverlay() {
    const cardOverlay = this.#createElementWithClass("div", "overlay");
    return cardOverlay;
  }

  #objectAttibutes() {
    return {
      title: this.title,
      detail: this.detail,
      images: this.images,
    }
  }

  #validateParameters(title, detail, images, imageDuration, onClickFunction, onHoverFunction, overlay) {
    if (typeof title !== "string") {
      throw new Error("O parâmetro 'title' deve ser uma string.");
    }

    if (!Array.isArray(detail) && !(detail instanceof HTMLElement) && typeof detail !== "string") {
      throw new Error("O parâmetro 'detail' precisa estar em um dos seguintes formatos: string, array de string ou HTMLElement")
    }

    if (!Array.isArray(images) && typeof images !== "string" && typeof imageData !== 'object') {
      throw new Error("O parâmetro 'images' precisa estar em um dos seguintes formatos: string, array de string, objeto ou array de objetos. Os objetos devem conter o parâmetro 'src' e é aconselhável que também possuam o parâmetro 'alt' ou que seja um objeto 'null'")
    }

    if (typeof overlay !== "number" && overlay !== null) {
      console.log(overlay)
      throw new Error("O parâmetro 'overlay' deve ser um número entre 0 e 100 para representar a opacidade da camada ou 'null' para ignorar sua criação.");
    }

    if (typeof onClickFunction !== "function" && onClickFunction !== null) {
      throw new Error("O parâmetro 'onClickFunction' deve ser uma função ou o valor nulo.");
    }

    if (typeof onHoverFunction !== "function" && onHoverFunction !== null) {
      throw new Error("O parâmetro 'onHoverFunction' deve ser uma função ou o valor nulo.");
    }
  }
}