/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

isWebp();

$(window).on('load resize', function () {
  textHeight();
  textHeight2();
});

// Функція для вирівнювання тексту в блоках services на одному рівні
function textHeight() {
  let title = document.querySelectorAll('.si--title');
  let titleLength = Array.from(title).map((e) => e.offsetHeight);
  let maxHeight = Math.max(...titleLength);

  for (let i = 0; i < title.length; i++) {
    title[i].style.minHeight = maxHeight + 'px';
  }
}

// Функція для вирівнювання тексту в блоках team на одному рівні
function textHeight2() {
  let title = document.querySelectorAll('.tc--title');
  let titleLength = Array.from(title).map((e) => e.offsetHeight);
  let maxHeight = Math.max(...titleLength);

  for (let i = 0; i < title.length; i++) {
    title[i].style.minHeight = maxHeight + 'px';
  }
}

AOS.init({
  once: true,
  duration: 1000,
});

// Burger menu
const burgerMenu = document.querySelector('#showBtn');
const backdrop = document.querySelector('.backdrop');
const menuBody = document.getElementById('menu');
let clickCountMenu = 0;

burgerMenu.addEventListener('click', function () {
  clickCountMenu++;
  if (clickCountMenu % 2 !== 0) {
    backdrop.style.opacity = 1;
    backdrop.style.pointerEvents = 'all';
    menuBody.style.pointerEvents = 'all';
    menuBody.style.display = 'block';
  } else {
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  }
  console.log('click');
});

backdrop.addEventListener('click', function () {
  if (clickCountMenu % 2 !== 0) {
    clickCountMenu++;
    burgerMenu.checked = false;
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  }
});

const links = document.querySelectorAll('.nav-box--link');

links.forEach(function (el) {
  el.addEventListener('click', function () {
    clickCountMenu++;
    burgerMenu.checked = false;
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  });
});

// Плавна прокрутка до блоку
const anchors = document.querySelectorAll('a[href^="#s-"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href');
    if (window.matchMedia('(min-width: 900px)').matches) {
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
}

// Прокрутка до геро блока
const headerLink = document.querySelector('.header--logo');
headerLink.addEventListener('click', (e) => {
  e.preventDefault;
  document.querySelector('#s-hero').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// Активний клас для навігації при скролі
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (window.matchMedia('(min-width: 900px)').matches) {
        if (entry.isIntersecting) {
          document.querySelectorAll('a[href^="#s-"]').forEach((link) => {
            // Забираємо хештег і зрівнюємо id
            if (link.getAttribute('href').replace('#', '') === entry.target.id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  },
  {
    threshold: 0.5,
  }
);

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});

// Клас для меню коли ми його проскролили
$(document).on('scroll load resize', function () {
  const windowScrollTop = window.pageYOffset;
  const headerHeight = document.querySelector('.header').clientHeight;

  if (windowScrollTop > headerHeight) {
    document.querySelector('.header').classList.add('header--scrolled');
  } else {
    document.querySelector('.header').classList.remove('header--scrolled');
  }
});
