// Конфиг с настройками валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  urlInputSelector: ".popup__input_type_url"
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
    input.addEventListener("input", () => {
      validateInput(input, form, settings);
      toggleButtonState(inputs, submitButton, settings.inactiveButtonClass);
    });
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

// Валидация одного поля
function validateInput(input, form, settings) {
  const errorId = `${input.id}-error`;
  const errorElement =
    form.querySelector(`#${errorId}`) || form.querySelector(`.${errorId}`);

  if (!input.validity.valid) {
    showInputError(input, errorElement, settings);
  } else {
    hideInputError(input, errorElement, settings);
  }
}

function hideInputError(input, errorElement, settings) {
  if (!errorElement) return;

  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = ""; // Очищаем текст, но сохраняем место
}
// Переключение состояния кнопки
function toggleButtonState(inputs, button, inactiveClass) {
  const isValid = Array.from(inputs).every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(inactiveClass, !isValid);
}

function showInputError(input, errorElement, settings) {
  if (!errorElement) return;

  input.classList.add(settings.inputErrorClass);

  // Проверяем специальные случаи
  if (input.validity.patternMismatch) {
    // Для URL-полей
    if (input.type === "url" || input.hasAttribute("pattern")) {
      errorElement.textContent =
        input.dataset.errorMessage ||
        "Введите корректный URL (начинается с http:// или https://)";
    }
    // Для других полей с паттерном
    else {
      errorElement.textContent =
        input.dataset.errorMessage || "Недопустимые символы";
    }
  }
  // Стандартные ошибки
  else {
    errorElement.textContent = input.validationMessage;
  }

  errorElement.classList.add(settings.errorClass);
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
  submitButton.classList.remove(settings.inactiveButtonClass);
}

export { enableValidation, clearValidation, validationConfig };
