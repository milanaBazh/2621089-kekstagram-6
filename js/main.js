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

