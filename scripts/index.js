// Modal open/close class
const MODAL_OPENED_CLASS = 'modal_is-opened';

// Profile elements (displayed on page)
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

// Edit Profile Modal and form elements
const editProfileModal = document.getElementById('edit-profile-modal');
const profileFormElement = editProfileModal.querySelector('.modal__form');
const nameInput = profileFormElement.querySelector('#profile-name-input');
const descriptionInput = profileFormElement.querySelector('#profile-description-input');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfileCloseBtn = editProfileModal.querySelector('.modal__close-btn');

// New Post Modal and form elements
const newPostModal = document.getElementById('new-post-modal');
const addCardFormElement = newPostModal.querySelector('.modal__form');
const cardImageInput = addCardFormElement.querySelector('#card-image-input');
const cardCaptionInput = addCardFormElement.querySelector('#card-caption-input');
const newPostBtn = document.querySelector('.profile__add-btn');
const newPostCloseBtn = newPostModal.querySelector('.modal__close-btn');

// Preview Modal Elements
const previewModal = document.getElementById('preview-modal');
const previewImage = previewModal.querySelector('.modal__preview-image');
const previewTitle = previewModal.querySelector('.modal__preview-title');
const previewCloseBtn = previewModal.querySelector('.modal__close-btn');

// Example initialCards array (add your own data as needed)
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

//// 2. Loop through the array and log each card's name
//initialCards.forEach(function(card) {
//  console.log(card.name);
//});

// Select the template and the cards container
const cardTemplate = document.getElementById('card-template');
const cardsList = document.querySelector('.cards__list');

// Function to generate a card element from data
function getCardElement(data) {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeBtn = cardElement.querySelector('.card__like-btn');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Like button toggle
  likeBtn.addEventListener('click', function () {
    likeBtn.classList.toggle('card__like-btn_active');
  });

  // Delete button removes the card
  deleteBtn.addEventListener('click', function () {
    cardElement.remove();
  });

  // Preview image modal
  cardImage.addEventListener('click', function () {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Render all initial cards
initialCards.forEach(function(cardData) {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement); // Use prepend to add new cards to the top
});

// Utility functions
function openModal(modal) {
  modal.classList.add(MODAL_OPENED_CLASS);

  // Add Escape key listener when modal opens
  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  }
  modal._handleEscClose = handleEscClose; // Store reference for removal
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove(MODAL_OPENED_CLASS);

  // Remove Escape key listener when modal closes
  if (modal._handleEscClose) {
    document.removeEventListener("keydown", modal._handleEscClose);
    modal._handleEscClose = null;
  }
}

// Close modal when clicking on overlay (outside modal__container)
function setOverlayClose(modal) {
  modal.addEventListener('mousedown', function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

// Set overlay close for all modals
[editProfileModal, newPostModal, previewModal].forEach(setOverlayClose);

// Open Edit Profile Modal and pre-fill fields
editProfileBtn.addEventListener('click', function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

// Open New Post Modal
newPostBtn.addEventListener('click', function () {
  openModal(newPostModal);
});

// Close modals
editProfileCloseBtn.addEventListener('click', function () {
  closeModal(editProfileModal);
});
newPostCloseBtn.addEventListener('click', function () {
  closeModal(newPostModal);
});
previewCloseBtn.addEventListener('click', function () {
  closeModal(previewModal);
});

// Edit Profile form submit
profileFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

// New Post form submit (add new card)
addCardFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();

  // Get values from form fields
  const newCardData = {
    name: cardCaptionInput.value,
    link: cardImageInput.value
  };

  // Create new card element
  const newCardElement = getCardElement(newCardData);

  // Add new card as the first element in the card container
  cardsList.prepend(newCardElement);

  // Optionally, reset the form fields
  addCardFormElement.reset();

  // Close the modal
  closeModal(newPostModal);
});