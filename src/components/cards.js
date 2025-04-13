// Функция создания карточки

export function createCard(cardData, userId, handleLike, handleDelete, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  // Наполняем карточку данными
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  // Лайки
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  likeCount.textContent = cardData.likes.length;
  
  // Проверяем наш лайк
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработчики
  likeButton.addEventListener('click', () => handleLike(cardData._id, likeButton, likeCount));
  deleteButton.addEventListener('click', () => handleDelete(cardData._id, cardElement));
  cardElement.querySelector('.card__image').addEventListener('click', () => openImagePopup(cardData.name, cardData.link));

  return cardElement;
}