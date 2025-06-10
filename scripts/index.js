// Log to verify script is connected
console.log('Script loaded!');

// Constants for class names and selectors
const MODAL_OPENED_CLASS = 'modal_is-opened';
const EDIT_PROFILE_MODAL_ID = 'edit-profile-modal';
const NEW_POST_MODAL_ID = 'new-post-modal';
const EDIT_PROFILE_BTN_CLASS = 'profile__edit-btn';
const NEW_POST_BTN_CLASS = 'profile__add-btn';
const CLOSE_BTN_CLASS = 'modal__close-btn';

// Utility function to open a modal
function openModal(modal) {
  modal.classList.add(MODAL_OPENED_CLASS);
}

// Utility function to close a modal
function closeModal(modal) {
  modal.classList.remove(MODAL_OPENED_CLASS);
}

// Get modal elements
const editProfileModal = document.getElementById(EDIT_PROFILE_MODAL_ID);
const newPostModal = document.getElementById(NEW_POST_MODAL_ID);

// Get open buttons
const editProfileBtn = document.querySelector(`.${EDIT_PROFILE_BTN_CLASS}`);
const newPostBtn = document.querySelector(`.${NEW_POST_BTN_CLASS}`);

// Get close buttons
const editProfileCloseBtn = editProfileModal.querySelector(`.${CLOSE_BTN_CLASS}`);
const newPostCloseBtn = newPostModal.querySelector(`.${CLOSE_BTN_CLASS}`);

// Event listeners for opening modals
editProfileBtn.addEventListener('click', function handleEditProfileOpen() {
  openModal(editProfileModal);
});
newPostBtn.addEventListener('click', function handleNewPostOpen() {
  openModal(newPostModal);
});

// Event listeners for closing modals
editProfileCloseBtn.addEventListener('click', function handleEditProfileClose() {
  closeModal(editProfileModal);
});
newPostCloseBtn.addEventListener('click', function handleNewPostClose() {
  closeModal(newPostModal);
});