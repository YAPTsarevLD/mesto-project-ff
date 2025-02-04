// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; //шаблон карточки

// @todo: DOM узлы

const placesList = document.querySelector(".places__list"); //элемент, в который добавляются карточки

// @todo: Функция создания карточки

  function createCard(name, link) { //объявляем функцию, которая принимает в аргументы name и link
    
    const cardElement = cardTemplate.cloneNode(true); //клонируем шаблон
    const cardImage = cardElement.querySelector(".card__image"); //изображение карточки внутри шаблона
    const cardTitle = cardElement.querySelector(".card__title"); //имя карточки внутри шаблона
    const deleteButton = cardElement.querySelector(".card__delete-button"); //кнопка удаления внутри шаблона

    cardImage.src = link; //обозначаем, что ссылку на картинку будем получать из link
    cardTitle.textContent = name; //обозначаем, что текст картинки будем получать из name

    deleteButton.addEventListener("click", deleteCard); //обработчик событий на кнопку удаления. при нажатии вызывается функция deleteCard

    return cardElement; //возвращаем готовую карточку 
  }

// @todo: Функция удаления карточки
  function deleteCard(evt) {
        const cardList = evt.target.closest(".card"); //closest нужен для удаления всего элемента
        cardList.remove(); //удаление 
    }

// @todo: Вывести карточки на страницу

  initialCards.forEach(function (cardData) { //перебираем массив
    const card = createCard(cardData.name, cardData.link); //вызываем функцию createCard, в аргумент передаются cardData.name и cardData.link из каждого элемента массива 
    placesList.append(card); //добавляем карточку в конец
  });