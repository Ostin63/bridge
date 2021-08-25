/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable id-length */
const body = document.querySelector('body');
const calculatorForm = body.querySelector('.calculator__form');
const sliderElement = calculatorForm.querySelector('.calculator__slider');
const valueElementRange = calculatorForm.querySelector('.calculator__input--slider');
const valueElementPay = calculatorForm.querySelector('.calculator__input--pay');
const valueMonthlyPay = calculatorForm.querySelector('.calculator__input--pay-top');
const valueYearlyPay = calculatorForm.querySelector('.calculator__input--pay-right');

const navButton = body.querySelector('.header__button-nav');
const modalNav = body.querySelector('.header__nav-wrapper');
const navClose = modalNav.querySelector('.header__nav-close');
const topButton = modalNav.querySelector('.header__top-button');
const headerNavLinks = modalNav.querySelectorAll('.header__nav-item-link');

const options = body.querySelector('.options__wrapper');
const optionsNavs = options.querySelectorAll('.options__nav-item');
const optionsCarts = options.querySelectorAll('.options__cart');

const optionsMenuArrows = options.querySelectorAll('.options__cart-open');
const optionsMenus = options.querySelectorAll('.options__menu');
const optionsTrustMenuItems = options.querySelectorAll('.options__menu-item--trust');
const optionsSpecificMenuItems = options.querySelectorAll('.options__menu-item--specific');

const form = body.querySelector('.footer__form');
const fieldName = form.querySelector('.footer__form-input--name');
const fieldTel = form.querySelector('.footer__form-input--tel');
const dataSabmitUrl = 'https://echo.htmlacademy.ru/';

const success = body.querySelector('#success')
  .content
  .querySelector('.success');

const errorSuccess = body.querySelector('#error-loading')
  .content
  .querySelector('.error-loading');

const successElement = success.cloneNode(true);
const errorElement = errorSuccess.cloneNode(true);

//меню навигации

const onAddModalNav = () => {
  modalNav.classList.add('active');
};

const onRemoveModalNav = () => {
  modalNav.classList.remove('active');
};

const checkWidth = () => {
  if (window.innerWidth >= 1440) {
    onRemoveModalNav();
  }
};

for (let link of headerNavLinks) {
  link.addEventListener('click', onRemoveModalNav);
}

navButton.addEventListener('click', onAddModalNav);
navClose.addEventListener('click', onRemoveModalNav);
topButton.addEventListener('click', onRemoveModalNav);
window.addEventListener('resize', checkWidth);

const switchSlides = (switchers, slides) => {
  for (let i = 0; i < switchers.length; i++) {
    switchers[i].addEventListener('click', () => {

      for (let i = 0; i < switchers.length; i++) {
        switchers[i].classList.remove('active');
        slides[i].classList.remove('active');
      }

      switchers[i].classList.add('active');
      slides[i].classList.add('active');
    });
  }
};

const onToggleMenuItem = (MenuItems, arrows, menus) => {
  for (let i = 0; i < MenuItems.length; i++) {
    MenuItems[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let i = 0; i < MenuItems.length; i++){
        MenuItems[i].classList.remove('active');
      }
      MenuItems[i].classList.add('active');
      for (let i = 0; i < arrows.length; i++){
        arrows[i].classList.remove('active');
        menus[i].classList.remove('show');
      }
    });
  }
};

// Переключатель карточек

switchSlides(optionsNavs, optionsCarts);

//открытие меню

for (let i = 0; i < optionsMenuArrows.length; i++) {
  optionsMenuArrows[i].addEventListener('click', () => {
    optionsMenuArrows[i].classList.toggle('active');
    optionsMenus[i].classList.toggle('show');
  });
}

onToggleMenuItem(optionsTrustMenuItems, optionsMenuArrows, optionsMenus);
onToggleMenuItem(optionsSpecificMenuItems, optionsMenuArrows, optionsMenus);
// Калькулятор

valueElementRange.value = 2050000;

noUiSlider.create(sliderElement, {
  range: {
    min: 100000,
    max: 5000000,
  },
  start: 2050000,
  step: 50000,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  valueElementRange.value = Math.round(unencoded[handle]);

  const valueRange = Number(valueElementRange.value);

  if (valueRange < 249000) {
    valueElementPay.value = 12;
    valueMonthlyPay.value = Math.round(valueRange * 12 / 100 / 12);
    valueYearlyPay.value =  valueRange * 12 / 100;
  } else if (valueRange < 449000) {
    valueElementPay.value = 14;
    valueMonthlyPay.value = Math.round(valueRange * 14 / 100 / 12);
    valueYearlyPay.value = valueRange * 14 / 100;
  } else if (valueRange < 1000000) {
    valueElementPay.value = 16;
    valueMonthlyPay.value = Math.round(valueRange * 16 / 100 / 12);
    valueYearlyPay.value = valueRange * 16 / 100;
  } else {
    valueElementPay.value = 18;
    valueMonthlyPay.value = Math.round(valueRange * 18 / 100 / 12);
    valueYearlyPay.value = valueRange * 18 / 100;
  }
});


// Инициализация слайдера

new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.reviews__control-button--next',
    prevEl: '.reviews__control-button--prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
    },
    768: {
      slidesPerView: 1.5,
    },
    1300: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
  },
});

//Отправка формы
const isEscEvent = (evt) => evt.key === keys.escape || evt.key === keys.esc;

const onSuccessRemove = () => {
  successElement.remove();
  document.removeEventListener('click', onSuccessRemove);
};

const onElementEscRemove = () => {
  if (isEscEvent) {
    onSuccessRemove();
    document.removeEventListener('keydown', onElementEscRemove);
  }
};

const alertSuccess = () => {
  body.append(successElement);
  document.addEventListener('keydown', onElementEscRemove);
  document.addEventListener('click', onSuccessRemove);
};

const resetForm = () => {
  fieldName.value = '';
  fieldTel.value = '';
};

const alertForm = () => {
  alertSuccess();
  resetForm();
};

const onErrorLoadingRemove = () => {
  errorElement.remove();
  document.removeEventListener('click', onErrorLoadingRemove);
};

const onEscRemoveRemove = () => {
  if (isEscEvent) {
    errorElement.remove();
    document.removeEventListener('keydown', onEscRemoveRemove);
  }
};

const alertErrorloading = () => {
  body.append(errorElement);
  document.addEventListener('keydown', onEscRemoveRemove);
  document.addEventListener('click', onErrorLoadingRemove);
};

const sendData = (url, bodyForm, alertSucces, error) => {
  fetch(url, {
    method: 'POST',
    body: bodyForm,
  })
    .then((response) => {
      if (response.ok) {
        alertSucces();
      } else {
        error();
      }
    })
    .catch(() => {
      error();
    });
};

const onFormSend = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(dataSabmitUrl, formData, alertForm, alertErrorloading);
};

form.addEventListener('submit', onFormSend);
