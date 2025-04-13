// Конфиг с настройками валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
  
// Включение валидации всех форм
function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
    setupFormValidation(form, settings);
  });
}
  
// Настройка валидации для одной формы
function setupFormValidation(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(input, form, settings);
      toggleButtonState(inputs, submitButton, settings.inactiveButtonClass);
    });
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
}
  
// Валидация одного поля
function validateInput(input, form, settings) {
  const errorId = `${input.id}-error`;
  const errorElement = form.querySelector(`#${errorId}`) || form.querySelector(`.${errorId}`);
  
  if (!input.validity.valid) {
    showInputError(input, errorElement, settings);
  } else {
    hideInputError(input, errorElement, settings);
  }
}
  
// Показать ошибку
function showInputError(input, errorElement, settings) {
  if (!errorElement) return;
  
  input.classList.add(settings.inputErrorClass);
  
  if (input.validity.patternMismatch) {
    errorElement.textContent = input.dataset.errorMessage || 'Недопустимые символы';
  } else {
    errorElement.textContent = input.validationMessage;
  }
  
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(input, errorElement, settings) {
  if (!errorElement) return;
  
  input.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}

// Переключение состояния кнопки
function toggleButtonState(inputs, button, inactiveClass) {
  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(inactiveClass, !isValid);
}

// Очистка ошибок 
function clearValidation(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    hideInputError(input, errorElement, settings);
  });

  submitButton.disabled = true;
  submitButton.classList.add(settings.inactiveButtonClass);
}

export { enableValidation, clearValidation, validationConfig };