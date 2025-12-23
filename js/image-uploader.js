const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileInputElement = document.querySelector('#upload-file');
const previewImageElement = document.querySelector('.img-upload__preview img');

fileInputElement.addEventListener('change', () => {
  const selectedFile = fileInputElement.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const isValidFileType = ALLOWED_FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (isValidFileType) {
    previewImageElement.src = URL.createObjectURL(selectedFile);
  }
});
