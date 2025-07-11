// Modal open/close class
const MODAL_OPENED_CLASS = 'modal_is-opened';

// Profile display elements
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

// Edit Profile Modal
const editProfileModal = document.getElementById('edit-profile-modal');
const profileFormElement = editProfileModal.querySelector('.modal__form');
const nameInput = profileFormElement.querySelector('#profile-name-input');
const descriptionInput = profileFormElement.querySelector('#profile-description-input');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfileCloseBtn = editProfileModal.querySelector('.modal__close-btn');

// New Post Modal
const newPostModal = document.getElementById('new-post-modal');
const addCardFormElement = newPostModal.querySelector('.modal__form');
const cardImageInput = addCardFormElement.querySelector('#card-image-input');
const cardCaptionInput = addCardFormElement.querySelector('#card-caption-input');
const newPostBtn = document.querySelector('.profile__add-btn');
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn');

// Preview Modal
const previewModal = document.getElementById('preview-modal');
const previewImage = previewModal.querySelector('.modal__preview-image');
const previewTitle = previewModal.querySelector('.modal__preview-title');
const previewCloseBtn = previewModal.querySelector('.modal__close-btn');

// Template & Cards List
const cardTemplate = document.getElementById('card-template');
const cardsList = document.querySelector('.cards__list');

// Initial cards
const initialCards = [
  {
    name: "Landscape Example",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  }
];

// Create card DOM element
function getCardElement(data) {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeBtn = cardElement.querySelector('.card__like-btn');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-btn_active');
  });

  deleteBtn.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Render initial cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

// Modal open function
function openModal(modal) {
  modal.classList.add(MODAL_OPENED_CLASS);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  }

  modal._handleEscClose = handleEscClose;
  document.addEventListener("keydown", handleEscClose);
}

// Modal close function
function closeModal(modal) {
  modal.classList.remove(MODAL_OPENED_CLASS);

  if (modal._handleEscClose) {
    document.removeEventListener("keydown", modal._handleEscClose);
    modal._handleEscClose = null;
  }
}

// Enable close on overlay click
function setOverlayClose(modal) {
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

[editProfileModal, newPostModal, previewModal].forEach(setOverlayClose);

// Open Edit Profile Modal
editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;

  // Reset errors and update button state before opening
  resetValidation(profileFormElement, validationConfig);

  openModal(editProfileModal);
});

// Open New Post Modal (do NOT reset form here)
newPostBtn.addEventListener('click', () => {
  openModal(newPostModal);
});

// Close modals
editProfileCloseBtn.addEventListener('click', () => closeModal(editProfileModal));
newPostCloseBtn.addEventListener('click', () => closeModal(newPostModal));
previewCloseBtn.addEventListener('click', () => closeModal(previewModal));

// Submit Edit Profile Form
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

// Submit New Post Form
addCardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: cardCaptionInput.value,
    link: cardImageInput.value
  };

  const newCardElement = getCardElement(newCardData);
  cardsList.prepend(newCardElement);

  //Clear fields and validation after successful submission
  addCardFormElement.reset();
  resetValidation(addCardFormElement, validationConfig);

  closeModal(newPostModal);
});