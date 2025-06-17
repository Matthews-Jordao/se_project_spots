// Log to verify script is connected
console.log('Script loaded!');

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

// 1. Create an array of initial cards
const initialCards = [
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

// 2. Loop through the array and log each card's name
initialCards.forEach(function(card) {
  console.log(card.name);
});

// Utility functions
function openModal(modal) {
  modal.classList.add(MODAL_OPENED_CLASS);
}
function closeModal(modal) {
  modal.classList.remove(MODAL_OPENED_CLASS);
}

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

// Edit Profile form submit
profileFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

// New Post form submit (log values)
addCardFormElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  console.log('Image link:', cardImageInput.value);
  console.log('Caption:', cardCaptionInput.value);
  closeModal(newPostModal);
});