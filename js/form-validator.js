const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const photoUploadForm = document.querySelector('.img-upload__form');

const validationEngine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const validateDescriptionLength = (textValue) => textValue.length <= 140;

validationEngine.addValidator(
  descriptionInput,
  validateDescriptionLength,
  'Максимальная длина комментария - 140 символов'
);

const validateHashtagRules = (inputValue) => {
  if (!inputValue.trim()) {
    return true;
  }

  const hashtagsArray = inputValue.trim().split(/\s+/);
  const hashtagRegex = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  if (hashtagsArray.length > 5) {
    return false;
  }

  const lowerCaseTags = hashtagsArray.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseTags).size !== lowerCaseTags.length) {
    return false;
  }

  return hashtagsArray.every((tag) => hashtagRegex.test(tag));
};

const generateHashtagError = (inputValue) => {
  const hashtagsArray = inputValue.trim().split(/\s+/);
  const hashtagRegex = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  if (hashtagsArray.length > 5) {
    return 'Максимум 5 хэштегов';
  }

  const lowerCaseTags = hashtagsArray.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseTags).size !== lowerCaseTags.length) {
    return 'Хэштеги не должны повторяться';
  }

  if (!hashtagsArray.every((tag) => hashtagRegex.test(tag))) {
    return 'Некорректный формат хэштега';
  }

  return 'Ошибка в хэштегач';
};

validationEngine.addValidator(
  hashtagsInput,
  validateHashtagRules,
  generateHashtagError
);

export{validationEngine};
