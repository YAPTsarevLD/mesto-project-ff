// Задание: Открытие и закрытие модального окна

// функция открытия модалки
export function openModal(modal){
  modal.classList.add('popup_is-animated'); //добавляем класс, который отвечает за анимацию
  modal.classList.add('popup_is-opened'); //добавляем класс открытого попапа
  document.addEventListener('keydown', handleEscClose); //добавляем слушатель нажатия на esc
}

// функция закрытия модалки
export function closeModal(modal){
    modal.classList.remove('popup_is-opened'); //удаляем класс открытого попапа
    document.removeEventListener('keydown', handleEscClose); //убираем слушатель нажатия на esc
}

// функция добавления слушателя событий на кнопки закрытия
export function addCloseListeners() {
  document.querySelectorAll('.popup').forEach((popup) => {
    // Закрытие попапа кликом на оверлей
    popup.addEventListener('click', (evt) => { //слушатель нажатия на оверлей
      if (evt.target === popup) { //если пользователь нажал не на содержимое попапа
        closeModal(popup);
      }
    });
  });

  document.querySelectorAll('.popup__close').forEach((popupCloseButton) => {
    popupCloseButton.addEventListener('click', (evt) => { //слушатель нажатия на кнопку закрытия (крестик)
    const popup = evt.target.closest('.popup');
    closeModal(popup);
    });
  });
}

// Закрытие попапа нажатием на Esc
function handleEscClose(evt) { //функция обработчик нажатия на Esc
  if (evt.key === "Escape") { //пользователь нажал на Escape
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
