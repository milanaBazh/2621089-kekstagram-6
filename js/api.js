const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const API_PATH = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
};
const ERROR_MESSAGE = {
  GET_DATA: 'Ошибка загрузки данных. Обновите страницу',
  SEND_DATA: 'Ошибка отправки формы. Повторите попытку',
};

const fetchData = (path, errorMsg, method = HTTP_METHOD.GET, data = null) =>
  fetch(`${SERVER_URL}${path}`, {method, body: data})
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .catch(() => {
      throw new Error(errorMsg);
    });

const loadPhotos = () => fetchData(API_PATH.GET_DATA, ERROR_MESSAGE.GET_DATA);
const uploadPhoto = (data) => fetchData(API_PATH.SEND_DATA, ERROR_MESSAGE.SEND_DATA, HTTP_METHOD.POST, data);

export {loadPhotos, uploadPhoto};
