// import { checkImageValidity } from "./api.js";
// import { profileForm } from "./constants.js";


// Настройки валидации
const validationConfig = {
  formSelector: ".main__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// Функция для показа ошибки валидации
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция для скрытия ошибки валидации
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// Функция для проверки валидности поля
function checkInputValidity(formElement, inputElement, errorElement, config) {
  inputElement.setCustomValidity("");

  if (inputElement.validity.patternMismatch) {
    const errorMessage = inputElement.dataset.errorMessage;
    inputElement.setCustomValidity(errorMessage);
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}


// Функция для установки обработчиков событий на поля формы
function setEventListeners(formElement, config, inputList, buttonElement) {
  inputList.forEach((inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, errorElement, config);
      toggleButtonState(formElement, inputList, buttonElement, config);
    });
  });
}

// Функция для переключения состояния кнопки отправки формы
function toggleButtonState(formElement, inputList, config) {
	const buttonElement = formElement.querySelector(config.submitButtonSelector);

	if (buttonElement) {
			const isFormValid = inputList.every((inputElement) => inputElement.validity.valid && inputElement.value.trim() !== '');

			if (isFormValid) {
				buttonElement.classList.remove(config.inactiveButtonClass);
			} else {
				buttonElement.classList.add(config.inactiveButtonClass);
			}
	}
}


// Функция для очистки валидации формы
function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
}

// Получение формы и ее конфигурация
const formElement = document.querySelector(validationConfig.formSelector);

// Включение валидации формы
function enableValidation() {
  const formElement = document.querySelector(validationConfig.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
	
	if (buttonElement) {
  setEventListeners(formElement, validationConfig, inputList, buttonElement);
  
	toggleButtonState(formElement, inputList, validationConfig);

	formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
		// Дополнительная проверка перед отправкой формы
		if (inputList.every((inputElement) => inputElement.validity.valid && inputElement.value.trim() !== '')) {
			handleFormSubmit(); // Вызываем функцию для отправки данных

			        // Блокируем кнопку после отправки данных
							toggleButtonState(formElement, inputList, validationConfig);
	}
  });
  clearValidation(formElement, validationConfig);
	toggleButtonState(formElement, inputList, validationConfig);

 // Добавляем слушатели для отслеживания ввода посимвольно
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, inputElement.nextElementSibling, validationConfig);
        toggleButtonState(formElement, inputList, validationConfig);
      });
    });
  }
}

function handleFormSubmit() {
  const formElement = document.querySelector(validationConfig.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  if (inputList.every((inputElement) => inputElement.validity.valid && inputElement.value.trim() !== '')) {
    // Вызываем функцию из index.js для отправки данных
    if (typeof generate === 'function') {
      generate();
    }
  }
}

// Вызов функции для включения валидации формы
enableValidation();
