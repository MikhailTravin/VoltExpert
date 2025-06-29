Fancybox.bind("[data-fancybox]", {
  // опции
});

document.querySelectorAll('.slider1').forEach((sliderElement, index) => {
  // Генерируем уникальные классы для кнопок навигации
  const prevEl = `.slider1-arrow-prev`;
  const nextEl = `.slider1-arrow-next`;

  // Находим контейнер текущего слайдера
  const container = sliderElement.closest('.block-slider1__content');

  // Находим конкретные кнопки внутри этого контейнера
  const prevButton = container ? container.querySelector(prevEl) : null;
  const nextButton = container ? container.querySelector(nextEl) : null;

  new Swiper(sliderElement, {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
});

document.querySelectorAll('.slider2').forEach((sliderElement, index) => {
  // Генерируем уникальные классы для кнопок навигации
  const prevEl = `.slider2-arrow-prev`;
  const nextEl = `.slider2-arrow-next`;

  // Находим контейнер текущего слайдера
  const container = sliderElement.closest('.block-slider2__content');

  // Находим конкретные кнопки внутри этого контейнера
  const prevButton = container ? container.querySelector(prevEl) : null;
  const nextButton = container ? container.querySelector(nextEl) : null;

  new Swiper(sliderElement, {
    observer: true,
    observeParents: true,
    slidesPerView: 5,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
});

if (document.querySelector('.block-gallery__slider')) {
  const swiperGallery = new Swiper('.block-gallery__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 2.2,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-gallery-arrow-prev',
      nextEl: '.block-gallery-arrow-next',
    },

    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector('.slider-articles')) {
  const swiperArticles = new Swiper('.slider-articles', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.slider-articles-arrow-prev',
      nextEl: '.slider-articles-arrow-next',
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        }));
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");
        const spollerItem = spollerTitle.closest(".spollers__item");
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);

          // Переключаем класс на заголовке и на .spollers__item
          spollerTitle.classList.toggle("_spoller-active");
          if (spollerItem) spollerItem.classList.toggle("_spoller-active");

          _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
        }
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        spollerActiveTitle.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }
    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) document.addEventListener("click", (function (e) {
      const el = e.target;
      if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
        const spollersBlock = spollerClose.closest("[data-spollers]");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
        spollerClose.classList.remove("_spoller-active");
        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
      }));
    }));
  }
}
spollers()

// Получаем все формы с классом .form
document.querySelectorAll('.form').forEach(form => {
  // Проверка формы при отправке
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Отменяем стандартную отправку

    let hasError = false;

    const requiredFields = this.querySelectorAll('input[data-required]');

    requiredFields.forEach(input => {
      input.classList.remove('form-error'); // Убираем старые ошибки

      if (!input.value.trim()) {
        input.classList.add('form-error');
        hasError = true;
      }
    });

    if (!hasError) {
      console.log('Форма прошла валидацию');
      // Можно добавить здесь this.submit(), если нужно отправлять форму
    }
  });

  // Удаляем ошибку при вводе текста в поле
  form.querySelectorAll('input[data-required]').forEach(input => {
    input.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        this.classList.remove('form-error');
      }
    });
  });

  // Добавляем/убираем класс при фокусе/блуре
  form.querySelectorAll('.input').forEach(field => {
    field.addEventListener('focus', function () {
      this.classList.add('form-focus');
    });

    field.addEventListener('blur', function () {
      this.classList.remove('form-focus');
    });
  });
});

//Карта
const map = document.querySelector("#map");
if (map) {
  if ("undefined" !== typeof ymaps) ymaps.ready((() => initMainMap()));
  else console.warn("Yandex Maps API не загружено для карты #map");
  function initMainMap() {
    try {
      var myMap = new ymaps.Map("map", {
        center: [55.812818, 37.755859],
        zoom: 18,
        controls: ["zoomControl"],
        behaviors: ["drag"]
      }, {
        searchControlProvider: "yandex#search"
      });
      const placemark1 = new ymaps.Placemark([55.812818, 37.755859], {}, {
      });
      myMap.geoObjects.add(placemark1);
    } catch (error) {
      console.error("Ошибка при инициализации карты #map:", error);
    }
  }
}

const btnUp = document.querySelector(".button-up");

if (btnUp) {
  // Показываем/скрываем кнопку при скролле
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnUp.style.opacity = "1";
      btnUp.style.pointerEvents = "auto";
    } else {
      btnUp.style.opacity = "0";
      btnUp.style.pointerEvents = "none";
    }
  });

  // Прокрутка наверх при клике
  btnUp.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

//Поиск
const button = document.querySelector('.search-header__button');
const headerSearch = document.querySelector('.search-header');

if (button && headerSearch) {
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    headerSearch.classList.toggle('_active');
    document.documentElement.classList.toggle('search-open');
  });

  // Закрытие при клике вне блока
  document.addEventListener('click', function (e) {
    if (!headerSearch.contains(e.target)) {
      headerSearch.classList.remove('_active');
      document.documentElement.classList.remove('search-open');
    }
  });
}

//Меню
const iconMenu = document.querySelector('.header__icon');
const headerRight = document.querySelector('.header__right');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation(); // Останавливаем всплытие
    document.documentElement.classList.toggle("menu-open");
  });
}

// Закрытие меню при клике вне .header__right
document.addEventListener('click', function (e) {
  const isClickInsideHeaderRight = headerRight?.contains(e.target);

  if (!isClickInsideHeaderRight && document.documentElement.classList.contains("menu-open")) {
    document.documentElement.classList.remove("menu-open");
  }
});

function initMenu() {
  const menuLinks = document.querySelectorAll('.menu__link');
  const submenuTriggers1 = document.querySelectorAll('.menu__link'); // Первый уровень
  const submenuTriggers2 = document.querySelectorAll('.menu__link2'); // Второй уровень

  const isMobileOrTablet = window.matchMedia('(max-width: 1300px)').matches;

  // Добавляем/удаляем hidden атрибут для подменю при изменении размера экрана
  document.querySelectorAll('.menu__submenu1, .menu__submenu2').forEach(submenu => {
    if (isMobileOrTablet) {
      submenu.hidden = true;
    } else {
      submenu.hidden = false;
      submenu.style.removeProperty('height');
      submenu.classList.remove('_slide');
    }
  });

  // Удаляем старые обработчики
  menuLinks.forEach(link => {
    link.removeEventListener('click', handleFirstLevelClick);
    if (isMobileOrTablet) {
      link.addEventListener('click', handleFirstLevelClick);
    }
  });

  submenuTriggers2.forEach(trigger => {
    trigger.removeEventListener('click', handleSecondLevelClick);
    if (isMobileOrTablet) {
      trigger.addEventListener('click', handleSecondLevelClick);
    }
  });
}

// Закрытие всех подменю первого уровня, кроме текущего
function closeAllFirstLevelSubmenus(exceptThis) {
  document.querySelectorAll('.menu__submenu1._slide').forEach(submenu => {
    if (submenu !== exceptThis) {
      _slideUp(submenu);
    }
  });
}

// Закрытие всех подменю второго уровня, кроме текущего
function closeAllSecondLevelSubmenus(exceptThis) {
  document.querySelectorAll('.menu__submenu2._slide').forEach(submenu => {
    if (submenu !== exceptThis) {
      _slideUp(submenu);
    }
  });
  document.querySelectorAll('.menu__link2._spoller-active').forEach(link => {
    if (!exceptThis || link.nextElementSibling !== exceptThis) {
      link.classList.remove('_spoller-active');
    }
  });
}

// Обработчик клика на .menu__link (первый уровень)
function handleFirstLevelClick(e) {
  if (!e.target.classList.contains('menu__link')) return;

  const parentItem = e.target.closest('.menu__item');
  const submenu = parentItem.querySelector('.menu__submenu1');

  if (!submenu) return;

  // Переключаем активный класс у ссылки
  const activeLink = document.querySelector('.menu__link._active');
  if (activeLink && activeLink !== e.target) {
    activeLink.classList.remove('_active');
  }

  e.target.classList.toggle('_active');

  // Сначала закрываем все подменю первого уровня, кроме текущего
  closeAllFirstLevelSubmenus(submenu);

  // Также закрываем все подменю второго уровня
  closeAllSecondLevelSubmenus();

  // Плавно открываем текущее подменю
  _slideToggle(submenu);
}

// Обработчик клика на .menu__link2 (второй уровень)
function handleSecondLevelClick(e) {
  const trigger = e.target.closest('.menu__link2');
  if (!trigger) return;

  const submenu = trigger.nextElementSibling;
  if (!submenu || !submenu.classList.contains('menu__submenu2')) return;

  // Сначала закрываем все подменю второго уровня, кроме текущего
  closeAllSecondLevelSubmenus(submenu);

  // Переключаем класс споллера
  trigger.classList.toggle('_spoller-active');

  // Плавно открываем подменю
  _slideToggle(submenu);
}

// Инициализация при загрузке и изменении размера экрана
window.addEventListener('DOMContentLoaded', initMenu);
window.addEventListener('resize', () => {
  initMenu();
});