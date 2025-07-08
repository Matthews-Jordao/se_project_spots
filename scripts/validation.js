// Configuration object
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
};

// Show error message for invalid input
const showInputError = (formElement, inputElement, config, errorMessage) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
};

// Hide error message for valid input
const hideInputError = (formElement, inputElement, config) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

// Validate individual input field
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Check if any input is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Toggle submit button state based on form validity
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

// Attach input event listeners to validate in real-time
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Set initial button state
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Enable validation on all forms that match selector
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

// Initialize validation
enableValidation(validationConfig);
