import { resetImageEditor } from './image-editor.js';
import { uploadPhoto } from './api.js';
import { validationEngine } from './form-validator.js';
import { displayStatusMessage, openModalWindow } from './utilities.js';

const fileSelectInput = document.querySelector('#upload-file');
const formOverlay = document.querySelector('.img-upload__overlay');
const documentBody = document.body;
const formCloseButton = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const formSubmitButton = document.querySelector('.img-upload__submit');

let formCloseHandler;

const clearFormData = () => {
  uploadForm.reset();
  validationEngine.reset();
  resetImageEditor();
};

const escKeyListener = (event) => {
  if (event.key === 'Escape') {
    if (
      document.activeElement === hashtagsInput ||
      document.activeElement === descriptionInput
    ) {
      return;
    }
    formCloseHandler();
  }
};

const hideFormOverlay = () => {
  formOverlay.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeyListener);
};

const showFormOverlay = () => {
  formCloseHandler = openModalWindow(formOverlay, () => {
    clearFormData();
    hideFormOverlay();
  });

  document.addEventListener('keydown', escKeyListener);

  formCloseButton.addEventListener('click', formCloseHandler, { once: true });
};

fileSelectInput.addEventListener('change', () => {
  if (fileSelectInput.files.length) {
    showFormOverlay();
  }
});

const showSuccessPopup = () => {
  displayStatusMessage({
    templateSelector: '#success',
    popupClass: '.success',
    closeButtonClass: '.success__button',
  });
};

const showErrorPopup = () => {
  hideFormOverlay();

  displayStatusMessage({
    templateSelector: '#error',
    popupClass: '.error',
    closeButtonClass: '.error__button',
  });

  const errorPopup = document.querySelector('.error');
  const errorContentArea = errorPopup.querySelector('.error__inner');
  const errorCloseButton = errorPopup.querySelector('.error__button');

  const reopenUploadForm = () => {
    errorPopup.remove();
    formOverlay.classList.remove('hidden');
    documentBody.classList.add('modal-open');

    document.removeEventListener('keydown', errorEscHandler);
    document.removeEventListener('click', outsideClickHandler);
  };

  function errorEscHandler(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      reopenUploadForm();
    }
  }

  function outsideClickHandler(event) {
    if (event.target === errorPopup && !errorContentArea.contains(event.target)) {
      reopenUploadForm();
    }
  }

  errorCloseButton.addEventListener('click', reopenUploadForm);
  document.addEventListener('keydown', errorEscHandler);
  document.addEventListener('click', outsideClickHandler);
};

const disableFormSubmission = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = 'Публикую';
};

const enableFormSubmission = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', (submitEvent) => {
  submitEvent.preventDefault();

  if (!validationEngine.validate()) {
    return;
  }

  disableFormSubmission();

  uploadPhoto(new FormData(uploadForm))
    .then(() => {
      showSuccessPopup();
      formCloseHandler();
    })
    .catch(() => {
      showErrorPopup();
    })
    .finally(() => {
      enableFormSubmission();
    });
});
