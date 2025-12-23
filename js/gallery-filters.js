import { renderPhotoCollection } from './photo-gallery.js';
import { debounceFunction } from './utilities.js';

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const topCommentsFilterButton = document.querySelector('#filter-discussed');

const highlightActiveButton = (selectedButton) => {
  const currentActive = document.querySelector('.img-filters__button--active');
  currentActive.classList.remove('img-filters__button--active');
  selectedButton.classList.add('img-filters__button--active');
};

const delayedRender = debounceFunction((filterType) => {
  renderPhotoCollection(filterType);
});

defaultFilterButton.addEventListener('click', () => {
  highlightActiveButton(defaultFilterButton);
  delayedRender('default');
});

randomFilterButton.addEventListener('click', () => {
  highlightActiveButton(randomFilterButton);
  delayedRender('random');
});

topCommentsFilterButton.addEventListener('click', () => {
  highlightActiveButton(topCommentsFilterButton);
  delayedRender('discussed');
});
