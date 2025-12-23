const SCALE_STEP_SIZE = 25;
const MINIMUM_SCALE = 25;
const MAXIMUM_SCALE = 100;

const FILTER_SETTINGS = {
  none: {filter: '', min: 0, max: 100, step: 1, unit: '', initialValue: 100, showSlider: false },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', initialValue: 1, showSlider: true },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', initialValue: 1, showSlider: true },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', initialValue: 100, showSlider: true },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', initialValue: 3, showSlider: true },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', initialValue: 3, showSlider: true }
};

const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDisplay = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const filterRadios = document.querySelectorAll('.effects__radio');
const filterSliderWrapper = document.querySelector('.img-upload__effect-level');
const filterSlider = document.querySelector('.effect-level__slider');
const filterValueDisplay = document.querySelector('.effect-level__value');

let currentFilter = 'none';

scaleDisplay.value = '100%';

const applyImageScale = (scalePercentage) => {
  const scaleFactor = scalePercentage / 100;
  imagePreview.style.transform = `scale(${scaleFactor})`;
};

const updateScaleControl = (newPercentage) => {
  scaleDisplay.value = `${newPercentage}%`;
  applyImageScale(newPercentage);
};

scaleDownButton.addEventListener('click', () => {
  const currentScale = parseInt(scaleDisplay.value, 10);

  if (currentScale > MINIMUM_SCALE) {
    updateScaleControl(currentScale - SCALE_STEP_SIZE);
  }
});

scaleUpButton.addEventListener('click', () => {
  const currentScale = parseInt(scaleDisplay.value, 10);

  if (currentScale < MAXIMUM_SCALE) {
    updateScaleControl(currentScale + SCALE_STEP_SIZE);
  }
});

noUiSlider.create(filterSlider, {
  start: FILTER_SETTINGS.none.initialValue,
  range: {
    min: FILTER_SETTINGS.none.min,
    max: FILTER_SETTINGS.none.max
  },
  step: FILTER_SETTINGS.none.step,
  connect: 'lower'
});

filterSliderWrapper.style.display = 'none';

const updateFilterEffect = (filterName, intensityValue) => {
  const filterConfig = FILTER_SETTINGS[filterName];
  if (filterConfig.filter) {
    imagePreview.style.filter = `${filterConfig.filter}(${intensityValue}${filterConfig.unit})`;
  } else {
    imagePreview.style.filter = '';
  }
  const numericValue = Number(intensityValue);
  filterValueDisplay.value = numericValue % 1 === 0 ? numericValue.toString() : numericValue.toFixed(1);
};

filterRadios.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    currentFilter = radioButton.value;
    const filterConfig = FILTER_SETTINGS[currentFilter];

    filterSliderWrapper.style.display = filterConfig.showSlider ? 'block' : 'none';

    filterSlider.noUiSlider.updateOptions({
      start: filterConfig.initialValue,
      range: { min: filterConfig.min, max: filterConfig.max },
      step: filterConfig.step
    });

    updateFilterEffect(currentFilter, filterConfig.initialValue);
  });
});

filterSlider.noUiSlider.on('update', (values, handle) => {
  const sliderValue = values[handle];
  updateFilterEffect(currentFilter, sliderValue);
});

export const resetImageEditor = () => {
  scaleDisplay.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  imagePreview.style.filter = 'none';
  filterSliderWrapper.style.display = 'none';
};
