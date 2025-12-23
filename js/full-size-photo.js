import { openModalWindow, isEscPressed } from './utilities.js';

const modalElement = document.querySelector('.big-picture');
const modalCloseBtn = document.querySelector('.big-picture__cancel');
const commentCountDisplay = modalElement.querySelector('.social__comment-count');
const loadCommentsBtn = modalElement.querySelector('.comments-loader');
const commentsList = modalElement.querySelector('.social__comments');

const COMMENTS_PER_LOAD = 5;
let photoComments = [];
let commentsShown = 0;

const createCommentNode = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentHTML = `
        <img class="social__picture"
             src="${avatar}"
             alt="${name}"
             width="35" height="35">
        <p class="social__text">${message}</p>
    `;
  commentElement.innerHTML = commentHTML;
  return commentElement;
};

const updateCounterDisplay = () => {
  const totalComments = photoComments.length;
  commentCountDisplay.innerHTML = `${commentsShown} из <span class="comments-count">${totalComments}</span> комментариев`;

  if (commentsShown >= totalComments) {
    loadCommentsBtn.classList.add('hidden');
  } else {
    loadCommentsBtn.classList.remove('hidden');
  }
};

const renderCommentsBatch = () => {
  const commentsToShow = photoComments.slice(commentsShown, commentsShown + COMMENTS_PER_LOAD);

  commentsToShow.forEach((commentData) => {
    commentsList.append(createCommentNode(commentData));
  });

  commentsShown += commentsToShow.length;
  updateCounterDisplay();
};

const handleLoadMore = () => {
  renderCommentsBatch();
};

const resetCommentState = () => {
  photoComments = [];
  commentsShown = 0;
  commentsList.innerHTML = '';
  commentCountDisplay.classList.remove('hidden');
  loadCommentsBtn.classList.remove('hidden');
  loadCommentsBtn.removeEventListener('click', handleLoadMore);
};

const displayFullSizePhoto = (photoInfo) => {
  resetCommentState();

  const modalImage = modalElement.querySelector('.big-picture__img img');
  modalImage.src = photoInfo.url;
  modalImage.alt = photoInfo.description;
  modalElement.querySelector('.likes-count').textContent = photoInfo.likes;
  modalElement.querySelector('.social__caption').textContent = photoInfo.description;

  photoComments = photoInfo.comments;

  const totalCommentsElement = modalElement.querySelector('.comments-count');
  totalCommentsElement.textContent = photoComments.length;

  renderCommentsBatch();

  loadCommentsBtn.addEventListener('click', handleLoadMore);

  const closeModalFunction = openModalWindow(modalElement, () => {
    resetCommentState();
  });

  const escKeyHandler = (event) => {
    if (isEscPressed(event)) {
      event.preventDefault();
      closeModalFunction();
    }
  };

  document.addEventListener('keydown', escKeyHandler);

  const enhancedClose = () => {
    document.removeEventListener('keydown', escKeyHandler);
    closeModalFunction();
  };

  modalCloseBtn.addEventListener('click', enhancedClose);

  return enhancedClose;
};

export { displayFullSizePhoto };
