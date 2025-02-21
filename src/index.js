import { createCard, handleLikeClick } from './components/cards.js'; //импортируем функции, которые работают с карточками
import { openModal, addCloseListeners, closeModal } from './components/modal.js'; //импортируем функции, которые работают с модалками

import '../src/index.css';

const avatarImage = new URL('./images/avatar.jpg', import.meta.url);
const card1 = new URL('./images/card_1.jpg', import.meta.url);
const card2 = new URL('./images/card_2.jpg', import.meta.url);
const card3 = new URL('./images/card_3.jpg', import.meta.url);
const addIconImage = new URL('./images/add-icon.svg', import.meta.url);
const closeImage = new URL('./images/close.svg', import.meta.url);
const deleteIconImage = new URL('./images/delete-icon.svg', import.meta.url);
const editIconImage = new URL('./images/edit-icon.svg', import.meta.url);
const likeActiveImage = new URL('./images/like-active.svg', import.meta.url);
const likeInactiveImage = new URL('./images/like-inactive.svg', import.meta.url);
const logoImage = new URL('./images/logo.svg', import.meta.url);

document.querySelector('.profile__image').style.backgroundImage = `url(${avatarImage})`; //добавил вставку аватрки здесь, так как для логотипа указал <%=require(....)%> в html


const imagesToImport = [
  {name: 'avatar', link: avatarImage},
  {name: 'card_1', link: card1},
  {name: 'card_2', link: card2},
  {name: 'card_3', link: card3},
  {name: 'addIcon', link: addIconImage},
  {name: 'close', link: closeImage},
  {name: 'deleteIcon', link: deleteIconImage},
  {name: 'editIcon', link: editIconImage},
  {name: 'likeActive', link: likeActiveImage},
  {name: 'likeInactive', link: likeInactiveImage},
  {name: 'logo', link: logoImage}
]

// DOM узлы
const placesList = document.querySelector(".places__list"); //элемент, в который добавляются карточки

// Вывод карточек на страницу + исходные данные для карточки
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

initialCards.forEach( (cardData) => { //перебираем массив
  const card = createCard(cardData.name, cardData.link, openImagePopup, handleLikeClick); //вызываем функцию createCard, в аргумент передаются cardData.name и cardData.link из каждого элемента массива 
  placesList.append(card); //добавляем карточку в конец
});

// все кнопки, на которые открываются модалки
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// все попапы (модалки), попап для картинок составной
const profilePopupForm = document.querySelector('.popup_type_edit');
const newCardPopupForm = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

//функция открытия попапа картинок, находится в index.js, тк ее работа невозможна, пока не отрисованы картинки
function openImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// слушатель событий на кнопки закрытия
addCloseListeners();

// Редактирование имени и информации о себе
// находим форму в DOM
const profileForm = document.querySelector('.popup_type_edit');
// находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

// находим элементы профиля, которые надо поменять
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // изменяем информацию на странице 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopupForm);
}

// Прикрепляем слушатель события submit
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Открытие попапа с подстановкой текущих данных
profileEditButton.addEventListener('click', () => {
  // Заполняем поля текущими данными
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopupForm);
});

// Добавление карточки 
const newCardForm = document.forms['new-place'];
//через обычное обращение к элементу по имени (form1.elements.yandex) форма не работала, нашел вариант обращения через ['yandex']. Думаю что это из-за тире в названии
const placeInput = newCardForm.elements['place-name']; //получаем элементы формы по name
const linkInput = newCardForm.elements.link; //получаем элементы формы по name

function handleNewCardSubmit(evt) { //обработчик отправки формы добавления карточки
  evt.preventDefault(); 
  const newCard = createCard(placeInput.value, linkInput.value, openImagePopup, handleLikeClick); //создаем карточку
  placesList.prepend(newCard); //добавляем карточку в начало списка
  newCardForm.reset(); //очищаем форму
  closeModal(newCardPopupForm); //вызываем функцию закрытия попапа
}

newCardForm.addEventListener('submit', handleNewCardSubmit); //прикрепляем обработчик к форме добавления карточки
//добавляем слушатель открытия попапа
addCardButton.addEventListener('click', () => { 
  openModal(newCardPopupForm);
});

