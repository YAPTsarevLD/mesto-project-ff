import { createCard } from "./components/cards.js"; //импортируем функции, которые работают с карточками
import {
  openModal,
  addCloseListeners,
  closeModal,
} from "./components/modal.js"; //импортируем функции, которые работают с модалками
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./components/validation.js"; //импортируем функции валидации
import {
  getUserInfo,
  getInitialCards,
  updateProfile,
  addNewCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./components/api.js"; //импортируем функции-запросы
import "../src/index.css";

let currentUserId = null;
const placesList = document.querySelector(".places__list"); //элемент, в который добавляются карточки

// все кнопки, на которые открываются модалки
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// все попапы (модалки), попап для картинок составной
const profilePopupForm = document.querySelector(".popup_type_edit");
const newCardPopupForm = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

//функция открытия попапа картинок
function openImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// слушатель событий на кнопки закрытия
addCloseListeners();

// Редактирование имени и информации о себе
const profileForm = document.querySelector(".popup_type_edit");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  // Блокируем кнопку на время запроса
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  updateProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      // Обновляем данные на странице
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profilePopupForm);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

// Прикрепляем слушатель события submit
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Открытие попапа с подстановкой текущих данных
profileEditButton.addEventListener("click", () => {
  // Заполняем поля
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  // Очищаем валидацию
  clearValidation(profileForm, validationConfig);

  openModal(profilePopupForm);
});

// Добавление карточки
const newCardForm = document.forms["new-place"];

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;

  // Получаем значения полей
  const name = form.elements.name.value.trim();
  const link = form.elements.link.value.trim();

  // UI состояния
  const submitButton = form.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  // Отправка данных
  addNewCard(name, link)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        currentUserId,
        handleLikeClick,
        handleDeleteCard,
        openImagePopup
      );
      placesList.prepend(cardElement);
      form.reset();
      closeModal(newCardPopupForm);
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

newCardForm.addEventListener("submit", handleNewCardSubmit); //прикрепляем обработчик к форме добавления карточки
//добавляем слушатель открытия попапа

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig); //NEW
  openModal(newCardPopupForm);
});

// Включение валидации всех форм при загрузке
enableValidation(validationConfig);

const profileImg = document.querySelector(".profile__image");

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cardsData, userData]) => {
    // Сохраняем ID текущего пользователя
    currentUserId = userData._id;

    // Обновляем данные профиля
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImg.src = userData.avatar;

    // Добавляем карточки на страницу
    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        currentUserId,
        handleLikeClick,
        handleDeleteCard,
        openImagePopup
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

const avatarPopupForm = document.querySelector(".popup_type_avatar");
const avatarContainer = document.querySelector(".profile__image-container");

// Обработчик отправки формы аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const avatarUrl = form.elements.link.value.trim();
  const submitButton = form.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  updateAvatar(avatarUrl)
    .then((userData) => {
      // Обновляем аватар на странице
      profileImg.src = userData.avatar;
      // Закрываем попап и сбрасываем форму
      closeModal(avatarPopupForm);
      form.reset();
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

// Инициализация формы аватара
const avatarForm = document.forms["change-avatar"];
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Открытие попапа при клике на аватар
avatarContainer.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopupForm);
});

// Обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch(console.error);
}

// Обработчик клика по лайку карточки
function handleLikeClick(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? unlikeCard : likeCard;

  likeMethod(cardId)
    .then((updatedCard) => {
      likeCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch(console.error);
}
