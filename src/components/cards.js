// Функция создания карточки

export function createCard(
  cardData,
  userId,
  handleLike,
  handleDelete,
  openImagePopup
) {
  // объявляем переменный для всех DOM-элементов
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  // Наполняем карточку данными
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  // Лайки
  likeCount.textContent = cardData.likes.length;

  // Проверяем наш лайк
  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Обработчики
  likeButton.addEventListener("click", () =>
    handleLike(cardData._id, likeButton, likeCount)
  );
  deleteButton.addEventListener("click", () =>
    handleDelete(cardData._id, cardElement)
  );
  cardImage.addEventListener("click", () =>
    openImagePopup(cardData.name, cardData.link)
  );

  return cardElement;
}
