import './photo-gallery.js';
import './upload-form.js';
import './image-editor.js';
import { initializeGallery } from './photo-gallery.js';
import './gallery-filters.js';
import './image-uploader.js';

const filterPanel = document.querySelector('.img-filters');

initializeGallery().then(() => {
  filterPanel.classList.remove('img-filters--inactive');
});

const NAME = ['John', 'Alice', 'Bob', 'Emma', 'Charlie'];
const NAMES = NAME; // Исправление: используем существующий массив
const PHOTOS_COUNT = 25; // Добавляем определение константы

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createMessage = () => {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return messages[getRandomInteger(0, messages.length - 1)];
};

const createComment = () => ({
  id: getRandomInteger(1, 1000),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
});

const generatePhotos = () => Array.from({ length: PHOTOS_COUNT }, (_, i) => createPhoto(i + 1));

export { generatePhotos };

