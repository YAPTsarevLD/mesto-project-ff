// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; //шаблон карточки

// Функция создания карточки

export function createCard(name, link, openImagePopup, handleLikeClick) { //объявляем функцию, которая принимает в аргументы name и link
    
  const cardElement  = cardTemplate.querySelector('.card').cloneNode(true); //клонируем шаблон
  const cardImage = cardElement.querySelector(".card__image"); //изображение карточки внутри шаблона
  const cardTitle = cardElement.querySelector(".card__title"); //имя карточки внутри шаблона
  const deleteButton = cardElement.querySelector(".card__delete-button"); //кнопка удаления внутри шаблона
  const likeButton = cardElement.querySelector(".card__like-button"); //кнопка лайка

  cardImage.src = link; //обозначаем, что ссылку на картинку будем получать из link
  cardTitle.textContent = name; //обозначаем, что текст картинки будем получать из name
  cardImage.alt = name; //обозначаем, что альтренативный текст картинки будем получать из name

  deleteButton.addEventListener("click", deleteCard); //обработчик событий на кнопку удаления. при нажатии вызывается функция deleteCard

  likeButton.addEventListener("click", handleLikeClick); //обработчик событий на кнопку лайка. при нажатии вызывается функция handleLikeClick

  cardImage.addEventListener("click", () => { //слушатель события на открытие модалки картиники
    openImagePopup(name, link);
  }); 

  return cardElement; //возвращаем готовую карточку 
}

// Функция удаления карточки
function deleteCard(evt) {
  const cardList = evt.target.closest(".card"); //closest нужен для удаления всего элемента
  cardList.remove(); //удаление 
}

// Лайк карточки
export function handleLikeClick(evt) { //функция обработчик события лайка
  evt.target.classList.toggle('card__like-button_is-active');
} 
  