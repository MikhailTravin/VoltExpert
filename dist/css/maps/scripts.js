const modules_flsModules = {};

let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

class BeforeAfter {
  constructor(props) {
    let defaultConfig = {
      init: true,
      logging: true,
      swiper: null
    };
    this.config = Object.assign(defaultConfig, props);

    if (this.config.init) {
      const beforeAfterItems = document.querySelectorAll('[data-ba]');
      if (beforeAfterItems.length > 0) {
        this.beforeAfterInit(beforeAfterItems);
      }
    }
  }

  beforeAfterInit(beforeAfterItems) {
    beforeAfterItems.forEach(beforeAfter => {
      if (beforeAfter) {
        this.beforeAfterClasses(beforeAfter);
        this.beforeAfterItemInit(beforeAfter);
      }
    });
  }

  beforeAfterClasses(beforeAfter) {
    beforeAfter.addEventListener('mouseover', function (e) {
      const targetElement = e.target;
      if (!targetElement.closest('[data-ba-arrow]')) {
        if (targetElement.closest('[data-ba-before]')) {
          beforeAfter.classList.remove('_right');
          beforeAfter.classList.add('_left');
        } else {
          beforeAfter.classList.add('_right');
          beforeAfter.classList.remove('_left');
        }
      }
    });

    beforeAfter.addEventListener('mouseleave', function () {
      beforeAfter.classList.remove('_left');
      beforeAfter.classList.remove('_right');
    });
  }

  beforeAfterItemInit(beforeAfter) {
    const beforeAfterArrow = beforeAfter.querySelector('[data-ba-arrow]');
    const afterItem = beforeAfter.querySelector('[data-ba-after]');

    if (!beforeAfterArrow || !afterItem) return;

    const beforeAfterArrowWidth = parseFloat(
      window.getComputedStyle(beforeAfterArrow).getPropertyValue('width')
    );

    const handler = isMobile.any() ? 'touchstart' : 'mousedown';
    beforeAfterArrow.addEventListener(handler, (e) => {
      this.handleDragStart(e, beforeAfter, afterItem, beforeAfterArrowWidth);
    });
  }

  handleDragStart(e, beforeAfter, afterItem, arrowWidth) {
    e.preventDefault();
    e.stopPropagation();

    const swiperInstance = this.config.swiper;

    if (swiperInstance && typeof swiperInstance === 'object') {
      swiperInstance.allowTouchMove = false;
    }

    const sizes = {
      width: beforeAfter.offsetWidth,
      left: beforeAfter.getBoundingClientRect().left - scrollX
    };

    const moveHandler = (eMove) => {
      this.handleMouseMove(eMove, beforeAfter, afterItem, arrowWidth, sizes);
    };

    const endHandler = () => {
      document.removeEventListener(isMobile.any() ? 'touchmove' : 'mousemove', moveHandler);
      // Разрешаем свайп снова
      if (swiperInstance && typeof swiperInstance === 'object') {
        swiperInstance.allowTouchMove = true;
      }
    };

    // Подписываемся на события движения и завершения
    if (isMobile.any()) {
      document.addEventListener('touchmove', moveHandler);
      document.addEventListener('touchend', endHandler, { once: true });
    } else {
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', endHandler, { once: true });
    }

    // Блокируем drag
    document.addEventListener('dragstart', (eDrag) => {
      eDrag.preventDefault();
    }, { once: true });
  }

  handleMouseMove(e, beforeAfter, afterItem, arrowWidth, sizes) {
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const posLeft = clientX - sizes.left;

    if (posLeft >= 0 && posLeft <= sizes.width) {
      const way = (posLeft / sizes.width) * 100;
      const arrowLeft = `calc(${way}% - ${arrowWidth}px)`;

      beforeAfter.querySelector('[data-ba-arrow]').style.cssText =
        `left:${arrowLeft}; transform: translate(50%, -50%);`;
      afterItem.style.cssText = `width: ${100 - way}%`;
    } else if (posLeft < 0) {
      beforeAfter.querySelector('[data-ba-arrow]').style.cssText = `left: 0%`;
      afterItem.style.cssText = `width: 100%`;
    } else if (posLeft > sizes.width) {
      beforeAfter.querySelector('[data-ba-arrow]').style.cssText =
        `left: calc(100% - ${arrowWidth}px)`;
      afterItem.style.cssText = `width: 0%`;
    }
  }
}
modules_flsModules.ba = new BeforeAfter({});

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

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
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1330: {
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
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1330: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
});

if (document.querySelector('.block-reviews-slider')) {
  const swiperReviews = new Swiper('.block-reviews-slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-reviews-arrow-prev',
      nextEl: '.block-reviews-arrow-next',
    },

    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 1.8,
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
      1330: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

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
        slidesPerView: 1.8,
        spaceBetween: 30,
      },
      1330: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector('.block-cases__slider')) {
  const swiperCases = new Swiper('.block-cases__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-cases-arrow-prev',
      nextEl: '.block-cases-arrow-next',
    },
  });
}

if (document.querySelector('.block-examples-work__slider')) {
  const swiperWorks = new Swiper('.block-examples-work__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 2,
    spaceBetween: 30,
    speed: 400,
    navigation: {
      prevEl: '.block-examples-work-arrow-prev',
      nextEl: '.block-examples-work-arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });

  modules_flsModules.ba = new BeforeAfter({
    init: true,
    swiper: swiperWorks
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
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1330: {
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

// === Слушатели событий ===
const header = document.querySelector('.header');

// Обработчик скролла с оптимизацией
let ticking = false;

window.addEventListener('scroll', function () {
  const isScrolled = window.scrollY > 50;

  if (isScrolled) {
    header.classList.add('_header-scroll');
  } else {
    header.classList.remove('_header-scroll');
  }

  if (!ticking) {
    requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

// Плавная навигация по странице
function pageNavigation() {
  // data-goto - указать ID блока
  // data-goto-header - учитывать header
  // data-goto-top - недокрутить на указанный размер
  // data-goto-speed - скорость (только если используется доп плагин)
  // Работаем при клике на пункт
  document.addEventListener("click", pageNavigationAction);
  // Если подключен scrollWatcher, подсвечиваем текущий пукт меню
  document.addEventListener("watcherCallback", pageNavigationAction);
  // Основная функция
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      // Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          // Видим объект
          // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
          navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
        } else {
          // Не видим объект
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
        }
      }
    }
  }
}
pageNavigation()
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      headerItemHeight = document.querySelector(headerItem).offsetHeight;
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    // Закрываем меню, если оно открыто
    document.documentElement.classList.contains("menu-open") ? menuClose() : null;

    if (typeof SmoothScroll !== 'undefined') {
      // Прокрутка с использованием дополнения
      new SmoothScroll().animateScroll(targetBlockElement, '', options);
    } else {
      // Прокрутка стандартными средствами
      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
      targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: "smooth"
      });
    }
  }
};


//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

document.addEventListener('DOMContentLoaded', () => {
  const revealClasses = ['title1', 'title2'];
  const visibleClass = 'is-visible';
  const isMobile = window.innerWidth < 768;

  const style = document.createElement('style');
  style.textContent = revealClasses.map(cls => `
    .${cls} {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
      transition-delay: 0.12s;
      will-change: opacity, transform;
    }
    .${cls}.${visibleClass} {
      opacity: 1;
      transform: translateY(0);
    }
  `).join('\n');
  document.head.appendChild(style);

  const excludedSelectors = ['.no-reveal', '.disable-reveal'];

  function isExcluded(el) {
    return excludedSelectors.some(sel =>
      el.matches(sel) || el.closest(sel)
    );
  }

  const revealElements = revealClasses.flatMap(cls =>
    Array.from(document.querySelectorAll(`.${cls}`))
  );

  revealElements.forEach(el => {
    if (isMobile && isExcluded(el)) {
      revealClasses.forEach(cls => el.classList.remove(cls));
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
        } else {
          entry.target.classList.remove(visibleClass);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      if (!(isMobile && isExcluded(el))) {
        observer.observe(el);
      }
    });
  } else {
    console.warn('IntersectionObserver не поддерживается в этом браузере.');
  }
});

const fileInput = document.querySelector('.form__files input[type="file"]');
const previewContainer = document.querySelector(".previews");

function createPreview(file) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("preview-item");

  const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "other";

  if (fileType === "image") {
    const img = document.createElement("img");
    img.classList.add("preview-img");

    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    const removeBtn = document.createElement("div");
    removeBtn.classList.add("preview-remove");
    removeBtn.innerHTML = "&times;";

    removeBtn.addEventListener("click", () => {
      wrapper.remove();
    });

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
  }

  if (fileType === "video") {
    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("preview-video");

    const playIcon = `
            <svg class="preview-video-icon" viewBox="0 0 24 24" width="24" height="24">
                <circle cx="12" cy="12" r="10" fill="#000" opacity="0.6"/>
                <polygon points="10,8 16,12 10,16" fill="#fff"/>
            </svg>
        `;

    const fileName = document.createElement("div");
    fileName.textContent = file.name;
    fileName.classList.add("preview-video-name");

    const removeBtn = document.createElement("div");
    removeBtn.classList.add("preview-remove");
    removeBtn.innerHTML = "&times;";

    removeBtn.addEventListener("click", () => {
      wrapper.remove();
    });

    videoWrapper.innerHTML = playIcon;
    wrapper.appendChild(videoWrapper);
    wrapper.appendChild(fileName);
    wrapper.appendChild(removeBtn);
  }

  previewContainer.appendChild(wrapper);
}

if (fileInput) {
  let currentInput = fileInput;

  function onChange(event) {
    const files = Array.from(currentInput.files);
    files.forEach(file => {
      createPreview(file);
    });

    // Сбросить инпут и заменить на новый, чтобы повторно можно было выбрать те же файлы
    currentInput.value = "";
    const newInput = currentInput.cloneNode(true);
    currentInput.replaceWith(newInput);
    currentInput = newInput;
    currentInput.addEventListener("change", onChange);
  }

  currentInput.addEventListener("change", onChange);
}

// Select
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    }
    this.config = Object.assign(defaultConfig, props);
    // CSS класи модуля
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input", // Поле введення
      classSelectText: "select__text", // Оболонка текстових даних
      classSelectLink: "select__link", // Посилання в елементі
      classSelectOptions: "select__options", // Випадаючий список
      classSelectOptionsScroll: "select__scroll", // Оболонка при скролі
      classSelectOption: "select__option", // Пункт
      classSelectContent: "select__content", // Оболонка контенту в заголовку
      classSelectRow: "select__row", // Ряд
      classSelectData: "select__asset", // Додаткові дані
      classSelectDisabled: "_select-disabled", // Заборонено
      classSelectTag: "_select-tag", // Клас тега
      classSelectOpen: "_select-open", // Список відкритий
      classSelectActive: "_select-active", // Список вибрано
      classSelectFocus: "_select-focus", // Список у фокусі
      classSelectMultiple: "_select-multiple", // Мультивибір
      classSelectCheckBox: "_select-checkbox", // Стиль чекбоксу
      classSelectOptionSelected: "_select-selected", // Вибраний пункт
      classSelectPseudoLabel: "_select-pseudo-label", // Псевдолейбл
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  getSelectClass(className) {
    return `.${className}`;
  }
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }
  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
        selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
      }
    }
    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
    this.selectBuild(originalSelect);

    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
    this.selectDisabled(selectItem, originalSelect);
  }
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

    this.setOptionsPosition(selectItem);

    if (originalSelect.closest('[data-one-select]')) {
      const selectOneGroup = originalSelect.closest('[data-one-select]');
      this.selectsСlose(selectOneGroup);
    }

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);

        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }
    selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }
    this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }
  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }
  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;
      if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
        selectOptions = selectOptions.filter(option => option.value);
      }
      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;

      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }
  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (!originalSelect.hasAttribute('data-show-selected')) {
          setTimeout(() => {
            if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
              selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
            }
            optionItem.hidden = true;
          }, this.config.speed);
        }
        originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
        this.selectAction(selectItem);
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      formValidate.validateInput(originalSelect);
    }
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      originalSelect.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
    }
  }
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}
modules_flsModules.select = new SelectConstructor({});