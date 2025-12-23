import { displayFullSizePhoto } from './full-size-photo.js';
import { loadPhotos } from './api.js';
import { showAlertMessage } from './utilities.js';

const gallerySection = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;

const buildPhotoCard = (photoData) => {
  const cardClone = photoTemplate.cloneNode(true);

  const cardImage = cardClone.querySelector('.picture__img');
  cardImage.src = photoData.url;
  cardImage.alt = photoData.description;

  cardClone.querySelector('.picture__likes').textContent = photoData.likes;
  cardClone.querySelector('.picture__comments').textContent = photoData.comments.length;

  cardImage.addEventListener('click', () => displayFullSizePhoto(photoData));

  return cardClone;
};

const populateGallery = (photosArray) => {
  const fragmentContainer = document.createDocumentFragment();

  photosArray.forEach((photoItem) => {
    fragmentContainer.append(buildPhotoCard(photoItem));
  });

  gallerySection.append(fragmentContainer);
};

let allPhotos = [];

const getFilteredPhotos = (filterType) => {
  switch (filterType) {
    case 'random':
      return [...allPhotos]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    case 'discussed':
      return [...allPhotos]
        .sort((first, second) => second.comments.length - first.comments.length);

    default:
      return allPhotos;
  }
};

const emptyGallery = () => {
  gallerySection
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());
};

const renderPhotoCollection = (filterType = 'default') => {
  emptyGallery();
  populateGallery(getFilteredPhotos(filterType));
};

const initializeGallery = () =>
  loadPhotos()
    .then((loadedPhotos) => {
      allPhotos = loadedPhotos;
      renderPhotoCollection();
    })
    .catch((error) => {
      showAlertMessage(error.message);
    });

export { renderPhotoCollection, initializeGallery };
