const DEBOUNCE_INTERVAL = 500;

const generateRandomInteger = (firstNumber, secondNumber) => {
  const lowerBound = Math.ceil(Math.min(firstNumber, secondNumber));
  const upperBound = Math.floor(Math.max(firstNumber, secondNumber));
  const randomResult = Math.random() * (upperBound - lowerBound + 1) + lowerBound;
  return Math.floor(randomResult);
};

const selectRandomElement = (array) => array[generateRandomInteger(0, array.length - 1)];

const isEscPressed = (keyboardEvent) => keyboardEvent.key === 'Escape';

const displayStatusMessage = ({ templateSelector, popupClass, closeButtonClass }) => {
  const messageElement = document
    .querySelector(templateSelector)
    .content
    .cloneNode(true)
    .querySelector(popupClass);

  document.body.append(messageElement);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', handleEscClose);
  };

  const handleEscClose = function(event) {
    if (isEscPressed(event)) {
      closeMessage();
    }
  };

  messageElement.querySelector(closeButtonClass).addEventListener('click', closeMessage);

  messageElement.addEventListener('click', (clickEvent) => {
    if (clickEvent.target === messageElement) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', handleEscClose);
};

const openModalWindow = (modalContainer, onCloseAction) => {
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const handleOutsideModalClick = (clickEvent) => {
    if (clickEvent.target === modalContainer) {
      closeModal();
    }
  };

  function closeModal() {
    modalContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');

    modalContainer.removeEventListener('click', handleOutsideModalClick);

    if (onCloseAction) {
      onCloseAction();
    }
  }

  modalContainer.addEventListener('click', handleOutsideModalClick);

  return closeModal;
};

const showAlertMessage = (alertText) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = alertText;

  document.body.append(alertContainer);
};

function debounceFunction (callbackFunction, delayTime = DEBOUNCE_INTERVAL) {
  let timeoutReference;

  return (...functionArguments) => {
    clearTimeout(timeoutReference);
    timeoutReference = setTimeout(() => callbackFunction.apply(this, functionArguments), delayTime);
  };
}

export{generateRandomInteger, selectRandomElement, showAlertMessage, debounceFunction, displayStatusMessage, openModalWindow, isEscPressed};
