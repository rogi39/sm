const header = document.querySelector(".header");
const togglemenu = document.querySelector("#toggle-menu");
const menu = document.querySelector(".menu-modal");
const overlay = document.querySelector(".menu-modal-overlay");

togglemenu.addEventListener("click", () => {
  togglemenu.classList.toggle("on");
  menu.classList.toggle("on");
  overlay.classList.toggle("active");
  document.body.classList.toggle("noscroll");
  let wsb = widthScrollBar();
  if (togglemenu.classList.contains("on")) {
    header.style.paddingRight = widthScrollBar() + "px";
    document.querySelector(".main").style.paddingRight = wsb + "px";
    document.querySelector(".footer").style.paddingRight = wsb + "px";
  } else {
    header.style.paddingRight = "0px";
    document.querySelector(".main").style.paddingRight = "0px";
    document.querySelector(".footer").style.paddingRight = "0px";
  }
});

window.addEventListener("click", (e) => {
  if (e.target == overlay) {
    closeMenu();
  }
});

document.querySelector(".close-menu").addEventListener("click", closeMenu);

function closeMenu() {
  togglemenu.classList.remove("on");
  menu.classList.remove("on");
  overlay.classList.remove("active");
  document.body.classList.remove("noscroll");
  header.style.paddingRight = "0px";
  document.querySelector(".main").style.paddingRight = "0px";
  document.querySelector(".footer").style.paddingRight = "0px";

  menuScrolled.classList.remove("active");
  menuScrolledBtn.classList.remove("active");
  fadeOut(menuScrolled, 300);
}

const menuScrolled = document.querySelector(".menu-scrolled");
const menuScrolledBtn = document.querySelector(".header__scrolled-menu");

menuScrolledBtn.addEventListener("click", () => {
  menuScrolled.classList.toggle("active");
  document.body.classList.toggle("noscroll");
  overlay.classList.toggle("active");
  menuScrolledBtn.classList.toggle("active");

  let wsb = widthScrollBar();
  if (menuScrolled.classList.contains("active")) {
    fadeIn(menuScrolled, 300, "block");
    header.style.paddingRight = widthScrollBar() + "px";
    document.querySelector(".main").style.paddingRight = wsb + "px";
    document.querySelector(".footer").style.paddingRight = wsb + "px";
  } else {
    fadeOut(menuScrolled, 300);
    header.style.paddingRight = "0px";
    document.querySelector(".main").style.paddingRight = "0px";
    document.querySelector(".footer").style.paddingRight = "0px";
  }
});

window.addEventListener("scroll", () => {
  var scrolled = window.pageYOffset;
  if (scrolled >= 500) {
    header.classList.add("scrolled");
  } else if (scrolled <= 500) {
    header.classList.remove("scrolled");
  }
  if (scrolled >= 900) {
    header.classList.add("on");
  } else if (scrolled <= 900) {
    header.classList.remove("on");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Custom JS
});

let searchBtn = document.querySelectorAll(".search");
let searchForm = document.querySelectorAll(".form-header");

searchBtn.forEach((el) => {
  el.addEventListener("click", openSearch);
});

document.querySelectorAll(".form-header__close").forEach((el) => {
  el.addEventListener("click", () => {
    searchForm.forEach((form) => {
      fadeOut(form, 300);
      if (form.classList.contains("active")) form.classList.remove("active");
    });
  });
});

function openSearch(e) {
  const datafor = e.currentTarget.dataset.for;
  const form = document.querySelector(`.form-header[data-search-for="${datafor}"]`);
  if (form.classList.contains("active")) {
    form.classList.remove("active");
  } else {
    form.classList.add("active");
    fadeIn(form, 300, "block");
    form.querySelector(".form-header__input").focus();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const serviceItem = document.querySelector(".menu__item.menu-item-service");
  const serviceMenu = document.querySelector(".menu-service");

  if (serviceItem && serviceMenu) {
    // Показываем меню при наведении
    serviceItem.addEventListener("mouseenter", function () {
      serviceMenu.style.display = "block";
      // fadeIn(serviceMenu, 300, 'block');
    });

    // Скрываем меню при уходе с пункта
    serviceItem.addEventListener("mouseleave", function () {
      serviceMenu.style.display = "none";
      // fadeOut(serviceMenu, 300);
    });

    // Показываем меню при наведении на само меню услуг
    serviceMenu.addEventListener("mouseenter", function () {
      serviceMenu.style.display = "block";
      // fadeIn(serviceMenu, 300, 'block');
    });

    // Скрываем меню при уходе с меню услуг
    serviceMenu.addEventListener("mouseleave", function () {
      serviceMenu.style.display = "none";
      // fadeOut(serviceMenu, 300);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const triggerItems = document.querySelectorAll(".menu-scrolled__item[data-scrolled-sub]");
  const subMenus = document.querySelectorAll(".menu-scrolled__list[data-sub]");

  // Скрываем все подменю при загрузке
  subMenus.forEach((menu) => {
    menu.style.display = "none";
  });

  triggerItems.forEach((item) => {
    const targetValue = item.getAttribute("data-scrolled-sub");
    const targetMenu = document.querySelector(`.menu-scrolled__list[data-sub="${targetValue}"]`);

    if (!targetMenu) return;

    // Показать подменю при наведении на пункт
    item.addEventListener("mouseenter", () => {
      subMenus.forEach((menu) => {
        menu.style.display = "none"; // скрываем все подменю
      });
      targetMenu.style.display = "flex";
    });

    // Скрыть подменю при уходе с пункта — но с задержкой, чтобы можно было перейти на подменю
    item.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!targetMenu.matches(":hover")) {
          targetMenu.style.display = "none";
        }
      }, 100);
    });

    // Показать подменю при наведении на само подменю
    targetMenu.addEventListener("mouseenter", () => {
      targetMenu.style.display = "flex";
    });

    // Скрыть подменю при уходе с подменю
    targetMenu.addEventListener("mouseleave", () => {
      targetMenu.style.display = "none";
    });
  });
});

const widthScrollBar = () => {
  let div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const fadeIn = (el, timeout, display) => {
  el.style.opacity = 0;
  el.style.display = display || "block";
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = "none";
  }, timeout);
};

const wrapTagInDiv = (el, wrapClass = "wrapclass") => {
  let div = document.createElement("div");
  div.classList.add(wrapClass);
  el.parentNode.insertBefore(div, el);
  div.appendChild(el);
};

const wrapVideoInContent = () => {
  let contents = document.querySelectorAll(".content");
  if (!contents) return false;
  contents.forEach((el) => {
    let videos = el.querySelectorAll("iframe, video");
    videos.forEach((video) => {
      wrapTagInDiv(video, "video");
    });
    let tables = el.querySelectorAll("table");
    tables.forEach((table) => {
      wrapTagInDiv(table, "table-adaptive");
    });
  });
};
document.addEventListener("DOMContentLoaded", wrapVideoInContent);

const openTab = (e) => {
  let trg = e.currentTarget;
  let parent = trg.closest(".tab-block");
  console.log();
  parent.querySelector(".tab-btn.active").classList.remove("active");
  parent.querySelector(".tab-content.active").classList.remove("active");
  trg.classList.add("active");
  parent.querySelector(`.tab-content[data-tab-content="${trg.dataset.tab}"]`).classList.add("active");
};

let tabs = document.querySelectorAll(".tab-btn");
if (tabs) {
  tabs.forEach((el) => {
    el.addEventListener("click", openTab);
  });
}

const openQa = (e) => {
  if (e.target.closest(".qa-item__title-block").parentElement.classList.contains("open")) {
    e.target.closest(".qa-item__title-block").nextElementSibling.style.maxHeight = "0";
    e.target.closest(".qa-item__title-block").parentElement.classList.remove("open");
  } else {
    e.target.closest(".qa-item__title-block").nextElementSibling.style.maxHeight = e.target.closest(".qa-item__title-block").nextElementSibling.scrollHeight + "px";
    e.target.closest(".qa-item__title-block").parentElement.classList.add("open");
  }
};

let qa = document.querySelectorAll(".qa-item");
if (qa) {
  qa.forEach((el, i) => {
    el.addEventListener("click", openQa);
  });
}

let map_btn = document.querySelectorAll(".map-block__toggle-btn");
map_btn.forEach((el) => {
  el.addEventListener("click", toggleMapBlock);
});

function toggleMapBlock(e) {
  let trg = e.target;
  let parent = trg.closest(".map-block");
  parent.querySelector(".map-block__toggle-btn.active").classList.remove("active");
  parent.querySelector(".map-block__toggle-item.active").classList.remove("active");
  parent.querySelector(`.map-block__toggle-item[data-toggle-item="${trg.dataset.toggleBtn}"]`).classList.add("active");
  trg.classList.add("active");
  console.log(trg);
}

const openMenu = (e) => {
  if (e.currentTarget.classList.contains("open")) {
    e.currentTarget.querySelector(".menu__sub").style.maxHeight = "0";
    e.currentTarget.classList.remove("open");
  } else {
    e.currentTarget.querySelector(".menu__sub").style.maxHeight = 8 + e.currentTarget.querySelector(".menu__sub").scrollHeight + "px";
    e.currentTarget.classList.add("open");
  }
};
let menuSubBtns = document.querySelectorAll(".menu__item_sub:not(.not)");
menuSubBtns.forEach((el) => {
  el.addEventListener("click", openMenu);
});

let akciiItems = document.querySelectorAll(".akcii-item");
if (akciiItems) {
  akciiItems.forEach((el) => {
    el.addEventListener("click", openAkcii);
  });
}

function openAkcii(e) {
  let trg = e.currentTarget;
  console.log(trg);
  let modal = trg.querySelector(".akcii-item__modal");
  // let modal = trg;
  console.log(modal);
  window.addEventListener("click", function (e) {
    if ((e.target.classList.contains("akcii-item__modal") && modal.classList.contains("active")) || e.target.classList.contains("akcii-item__modal-close")) {
      fadeOut(modal, 300);
      setTimeout(() => {
        modal.classList.remove("active");
        document.body.classList.remove("noscroll");
        header.style.paddingRight = "0px";
        document.querySelector(".footer").style.paddingRight = "0px";
        document.querySelector(".main").style.paddingRight = "0px";
      }, 300);
    }
  });
  if (modal !== null && !modal.classList.contains("active")) {
    let wsb = widthScrollBar();
    fadeIn(modal, 300, "block");
    document.body.classList.add("noscroll");
    header.style.paddingRight = wsb + "px";
    document.querySelector(".main").style.paddingRight = wsb + "px";
    document.querySelector(".footer").style.paddingRight = wsb + "px";
    setTimeout(() => {
      modal.classList.add("active");
    }, 300);
  }
}

(function () {
  let modal = document.querySelector("#modal-address");
  let wsb = widthScrollBar();
  let items = document.querySelectorAll(".select-address__item");
  let btn = document.querySelector(".select-address__btn");
  let closeModal = modal.querySelector(".modal__close");

  if (getCookie("id_address")) {
    document.querySelector(".select-address__item.active").classList.remove("active");
    document.querySelector(`.select-address__item[data-id-address="${getCookie("id_address")}"]`).classList.add("active");
    // console.log(getCookie('id_address'));
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest(".modal__close") || e.target.classList.contains("modal")) {
      fadeOut(modal, 300);
      setTimeout(() => {
        document.body.classList.remove("noscroll");
        document.querySelector(".header").style.paddingRight = "0px";
        document.querySelector(".footer").style.paddingRight = "0px";
        document.querySelector(".main").style.paddingRight = "0px";
      }, 300);
    }
  });

  if (!getCookie("id_address")) {
    // modal.classList.add("open");
    // document.body.classList.add("noscroll");
    // document.querySelector(".header").style.paddingRight = wsb + "px";
    // document.querySelector(".footer").style.paddingRight = wsb + "px";
    // document.querySelector(".main").style.paddingRight = wsb + "px";

    setCookie("id_address", 6, {
      secure: true,
      "max-age": 2592000,
    });
  }

  items.forEach((el) => {
    el.addEventListener("click", (e) => {
      let trg = e.currentTarget;
      document.querySelector(".select-address__item.active").classList.remove("active");
      if (!trg.classList.contains("active")) {
        trg.classList.add("active");
        setCookie("id_address", trg.dataset.idAddress, {
          secure: true,
          "max-age": 2592000,
        });
      }
    });
  });

  btn.addEventListener("click", (e) => {
    if (!getCookie("id_address")) {
      setCookie("id_address", document.querySelector(".select-address__item.active").dataset.idAddress, {
        secure: true,
        "max-age": 2592000,
      });
    }
    fadeOut(modal, 300);
    setTimeout(() => {
      document.body.classList.remove("noscroll");
      document.querySelector(".header").style.paddingRight = "0px";
      document.querySelector(".footer").style.paddingRight = "0px";
      document.querySelector(".main").style.paddingRight = "0px";
    }, 300);
    window.location.reload();
  });
})();

function openModal(e) {
  e.preventDefault();
  let modal = e.currentTarget.dataset.idModal ? document.getElementById(e.currentTarget.dataset.idModal) : document.getElementById("modal-callback");
  let objectTitle = e.currentTarget.dataset.objectTitle;
  if (objectTitle) modal.querySelector('input[name="modal-object-title"]').value = objectTitle;
  let wsb = widthScrollBar();
  fadeIn(modal, 300, "flex");
  document.body.classList.add("noscroll");
  document.querySelector(".header").style.paddingRight = wsb + "px";
  document.querySelector(".footer").style.paddingRight = wsb + "px";
  document.querySelector(".main").style.paddingRight = wsb + "px";
}

let btnModals = document.querySelectorAll(".btn-modal");
btnModals.forEach((el) => {
  el.addEventListener("click", (e) => {
    openModal(e);
  });
});

function closeModal(e) {
  if (e.target.closest(".modal__close") || e.target.classList.contains("modal")) {
    if (e.currentTarget.querySelector(".select__button-address")) {
      e.currentTarget.querySelector(".select__button-address").textContent = "Выберите филиал";
    }
    if (e.currentTarget.querySelector(".select__button-text")) {
      e.currentTarget.querySelector(".select__button-text").textContent = "";
    }
    fadeOut(e.currentTarget, 300);
    setTimeout(() => {
      document.body.classList.remove("noscroll");
      document.querySelector(".header").style.paddingRight = "0px";
      document.querySelector(".footer").style.paddingRight = "0px";
      document.querySelector(".main").style.paddingRight = "0px";
    }, 300);
    if (e.currentTarget.querySelector(".modal__success-block")) fadeOut(e.currentTarget.querySelector(".modal__success-block"), 300);
  }
}
let modals = document.querySelectorAll(".modal");
modals.forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.querySelectorAll(".tel").forEach((el) => {
  IMask(el, {
    mask: "+{7}(000)-000-00-00",
  });
});

// Инициализация Lightpick (только на шаге 3)
const calendarInput = document.querySelector(".online-calendar");
if (calendarInput) {
  new Lightpick({
    field: calendarInput,
    singleDate: true,
    inline: true,
    minDate: new Date(), // 🔒 отключает прошедшие даты
    format: "DD.MM.YYYY",
  });
}

// Шаги формы
const steps = document.querySelectorAll(".online-modal__step");
let currentStep = 1;

// Кнопки "Далее"
document.querySelectorAll(".online-modal__btn-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    // if (validateStep(currentStep)) {
    showStep(currentStep + 1);
    // }
  });
});

// Кнопки "Назад"
document.querySelectorAll(".online-modal__btn-prev").forEach((btn) => {
  btn.addEventListener("click", () => {
    showStep(currentStep - 1);
  });
});

// Показать шаг
function showStep(stepNum) {
  steps.forEach((step) => {
    step.style.display = "none";
  });
  document.querySelector(`.online-modal__step[data-step="${stepNum}"]`).style.display = "block";
  currentStep = stepNum;
}

// Валидация шага (можно расширить)
// function validateStep(step) {
// 	if (step === 1) {
// 		const value = document.querySelector('[name="online-category"]').value;
// 		if (!value) {
// 			alert('Пожалуйста, выберите филиал');
// 			return false;
// 		}
// 		return true;
// 	}
// 	if (step === 2) {
// 		const value = document.querySelector('[name="online-vrach"]').value;
// 		if (!value) {
// 			alert('Пожалуйста, выберите специализацию');
// 			return false;
// 		}
// 		return true;
// 	}
// 	return true;
// }

// Получаем все селекты на странице
const selects = document.querySelectorAll(".select");

// Проходим по каждому селекту
selects.forEach((select) => {
  const selectButton = select.querySelector(".select__button");
  const selectList = select.querySelector(".select__list");
  const selectItems = select.querySelectorAll(".select__list-item");
  const selectInput = select.querySelector(".select__input-hidden");

  // Функция для закрытия текущего селекта
  function closeSelect() {
    select.classList.remove("select--active");
    selectList.classList.remove("select__list--visible");
  }

  // Открытие/закрытие по клику на кнопку
  selectButton.addEventListener("click", function (e) {
    e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал клик по document

    if (select.classList.contains("select--active")) {
      closeSelect();
    } else {
      // Закрываем все остальные селекты
      selects.forEach((otherSelect) => {
        if (otherSelect !== select) {
          otherSelect.classList.remove("select--active");
          otherSelect.querySelector(".select__list").classList.remove("select__list--visible");
        }
      });

      // Открываем текущий
      select.classList.add("select--active");
      selectList.classList.add("select__list--visible");
    }
  });

  // Выбор элемента списка
  selectItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();

      if (!item.querySelector(".select__list-item-address")) return false;
      // Обновляем текст кнопки
      const address = item.querySelector(".select__list-item-address").textContent || "";
      const text = item.querySelector(".select__list-item-text").textContent || "";
      console.log(address);
      console.log(text);
      selectButton.querySelector(".select__button-address").textContent = address;
      selectButton.querySelector(".select__button-text").textContent = text;

      // Обновляем скрытое поле
      selectInput.value = item.getAttribute("data-value");

      // Закрываем
      closeSelect();
    });
  });

  // Обработка Tab внутри селекта (опционально)
  select.addEventListener("keydown", function (e) {
    if (e.code === "Tab" && selectItems.length > 0) {
      const focusedElement = document.activeElement;
      if (focusedElement === selectItems[selectItems.length - 1]) {
        closeSelect();
      }
    }
  });
});

// Закрытие всех селектов по клику вне их
document.addEventListener("click", function () {
  selects.forEach((select) => {
    select.classList.remove("select--active");
    select.querySelector(".select__list").classList.remove("select__list--visible");
  });
});

// Закрытие всех селектов по нажатию Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    selects.forEach((select) => {
      select.classList.remove("select--active");
      select.querySelector(".select__list").classList.remove("select__list--visible");
    });
  }
});

// Получаем все элементы списка анализов
const analysItems = document.querySelectorAll(".analys-item");
analysItems.forEach((el) => {
  el.addEventListener("click", handleAnalysItem);
});

// Функция-обработчик клика по анализу
function handleAnalysItem(e) {
  const item = e.currentTarget;
  const id = item.dataset.analysId;
  const title = item.dataset.analysTitle;
  const price = item.dataset.analysPrice;

  const newItem = {
    id,
    title,
    price,
  };

  // Получаем текущий массив из localStorage
  let storedItems = getSelectedAnalyses();

  // Ищем индекс элемента с таким же id
  const existingIndex = storedItems.findIndex((i) => i.id === id);

  if (existingIndex !== -1) {
    // Удаляем, если уже есть
    storedItems.splice(existingIndex, 1);
  } else {
    // Добавляем, если нет
    storedItems.push(newItem);
  }

  // Сохраняем обновлённый массив
  saveSelectedAnalyses(storedItems);

  // Обновляем визуальное состояние
  item.classList.toggle("selected");

  // Обновляем блок калькулятора
  updateSidebarCalc();
}

// Получить сохранённые анализы из localStorage
function getSelectedAnalyses() {
  const data = localStorage.getItem("select_analys_items");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.warn("Ошибка при чтении select_analys_items из localStorage");
    return [];
  }
}

// Сохранить анализы в localStorage
function saveSelectedAnalyses(items) {
  localStorage.setItem("select_analys_items", JSON.stringify(items));
}

// Обновить блок калькулятора
function updateSidebarCalc() {
  const sidebarCalc = document.querySelector(".sidebar-calc");
  if (!sidebarCalc) return;

  const priceEl = sidebarCalc.querySelector(".sidebar-calc__price");

  const items = getSelectedAnalyses();
  const count = items.length;
  const total = items.reduce((sum, item) => sum + (parseInt(item.price) || 0), 0);

  // Форматируем цену по-русски: 2500 → "2 500"
  const formattedPrice = total
    .toLocaleString("ru-RU", {
      minimumFractionDigits: 0,
    })
    .replace(",", " ");

  sidebarCalc.querySelector(".calc__count").textContent = count;
  priceEl.textContent = `${formattedPrice} ₽`;
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  updateSidebarCalc();

  // Восстанавливаем визуальное состояние выбранных элементов
  const selectedItems = getSelectedAnalyses();
  const selectedIds = new Set(selectedItems.map((item) => item.id));

  document.querySelectorAll(".analys-item").forEach((el) => {
    const id = el.dataset.analysId;
    if (selectedIds.has(id)) {
      el.classList.add("selected");
    } else {
      el.classList.remove("selected");
    }
  });
});

// Обработчик сброса выбранных анализов
function handleResetAnalyses() {
  // Очищаем данные в localStorage
  localStorage.removeItem("select_analys_items");

  // Снимаем визуальное выделение со всех элементов
  document.querySelectorAll(".analys-item").forEach((el) => {
    el.classList.remove("selected");
  });

  // Обновляем блок калькулятора
  updateSidebarCalc();
}

// Назначаем обработчик по клику на элемент с классом .analys__reset
document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.querySelector(".analys__reset");
  if (resetButton) {
    resetButton.addEventListener("click", handleResetAnalyses);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".search-item-js");
  const searchInput = document.getElementById("searchbox");
  const reset = document.querySelector(".analys__reset");

  // Выход, если нет ни карточек, ни поля поиска
  if (!cards.length || !searchInput) {
    return;
  }

  function liveSearch() {
    const searchQuery = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(searchQuery)) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  }

  if (reset) {
    reset.addEventListener("click", () => {
      searchInput.value = "";
      liveSearch();
    });
  }

  // Дебаунсинг
  let typingTimer;
  const typeInterval = 500;

  searchInput.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(liveSearch, typeInterval);
  });

  // Запуск поиска при инициализации (например, если в поле уже есть значение)
  liveSearch();
});

// Обработчики для кнопок выбора состава
document.querySelectorAll(".checkup-single-sostav__btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Удаляем активный класс у всех кнопок (безопасно)
    document.querySelectorAll(".checkup-single-sostav__btn.active").forEach((el) => {
      el.classList.remove("active");
    });

    let trg = e.currentTarget; // Используем currentTarget вместо target для надежности
    let sostav = trg.dataset.sostav;
    let price = document.querySelector(".checkup-single-sostav__price");
    let priceAll = document.querySelector(".checkup-single-sostav__price-not");

    // Добавляем активный класс текущей кнопке
    trg.classList.add("active");

    // Управляем отображением элементов в зависимости от выбранного состава
    if (sostav === "max") {
      document.querySelectorAll(".checkup-single-sostav__item_max").forEach((el) => {
        el.classList.add("active");
      });
      document.querySelectorAll(".checkup-single-sostav__if-item_max").forEach((el) => {
        el.classList.add("active");
      });
      priceAll.querySelector("span").textContent = Number(priceAll.dataset.priceAllMaxi).toLocaleString("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } else {
      document.querySelectorAll(".checkup-single-sostav__item_max").forEach((el) => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".checkup-single-sostav__if-item_max").forEach((el) => {
        el.classList.remove("active");
      });
      priceAll.querySelector("span").textContent = Number(priceAll.dataset.priceAllMini).toLocaleString("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }

    // Обновляем цену после изменения состава
    updatePrice();
  });
});

// Обработчик для чекбокса
const checkbox = document.querySelector("#checkup-single-sostav-checkbox");
if (checkbox) {
  checkbox.addEventListener("change", function () {
    updatePrice();
  });
}

// Функция обновления цены
function updatePrice() {
  const price = document.querySelector(".checkup-single-sostav__price");
  if (!price) return;

  const dopSumElement = document.querySelector(".checkup-single-sostav__sum");
  const activeBtn = document.querySelector(".checkup-single-sostav__btn.active");
  const checkbox = document.querySelector("#checkup-single-sostav-checkbox");

  // Получаем базовую цену в зависимости от активной кнопки
  let basePrice = 0;
  if (activeBtn && activeBtn.dataset.sostav === "max") {
    basePrice = Number(price.dataset.priceMax || 0);
  } else {
    basePrice = Number(price.dataset.priceMin || 0);
  }

  // Добавляем доплату если чекбокс отмечен
  let totalPrice = basePrice;
  if (checkbox && checkbox.checked && dopSumElement) {
    const dopPrice = Number(dopSumElement.dataset.dopSum || 0);
    totalPrice = basePrice + dopPrice;
  }

  // Форматируем и выводим цену
  const formatted = totalPrice.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const priceSpan = price.querySelector("span");
  if (priceSpan) {
    priceSpan.textContent = formatted;
  }
}

// Инициализация цены при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  updatePrice();
});

document.querySelectorAll(".vakansia-family-item-add").forEach((button) => {
  let count = 0;
  const maxClicks = 2; // макс. 2 дополнительных блока → всего 3 (0,1,2)
  const type = button.dataset.type; // 'education' или 'work'

  button.addEventListener("click", function () {
    if (count >= maxClicks) return;

    const container = this.closest(".vakansia-education__col");
    const items = container.querySelectorAll(".vakansia-education-item");
    const lastItem = items.length ? items[items.length - 1] : null;
    if (!lastItem) return;

    // Определяем следующий индекс
    const nextIndex = items.length; // первый блок — [0], второй — [1], и т.д.

    // Клонируем
    const clone = lastItem.cloneNode(true);

    // Обновляем атрибуты name: заменяем [любой индекс] на [nextIndex]
    clone.querySelectorAll("[name]").forEach((field) => {
      let name = field.getAttribute("name");
      // Регулярное выражение: находит [цифра] сразу после job-education или job-work
      if (type === "education") {
        name = name.replace(/(job-education)\[\d+\]/, `$1[${nextIndex}]`);
      } else if (type === "work") {
        name = name.replace(/(job-work)\[\d+\]/, `$1[${nextIndex}]`);
      }
      field.setAttribute("name", name);
    });

    // Очищаем значения
    clone.querySelectorAll("input, textarea").forEach((field) => {
      field.value = "";
    });

    // Вставляем клон
    lastItem.parentNode.insertBefore(clone, lastItem.nextSibling);

    count++;

    // Блокируем кнопку при достижении лимита
    if (count >= maxClicks) {
      this.setAttribute("disabled", "disabled");
      this.style.opacity = "0.5";
      this.style.pointerEvents = "none";
    }
  });
});

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const showAllBtn = document.getElementById("showAllServicesBtn");
  if (!showAllBtn) return;

  showAllBtn.addEventListener("click", function () {
    const hiddenCols = document.querySelectorAll(".inner-service__col--hidden");
    hiddenCols.forEach((col) => {
      col.style.display = "block";
    });
    showAllBtn.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const showAllDoctorsBtn = document.getElementById("showAllDoctorsBtn");
  if (!showAllDoctorsBtn) return;

  showAllDoctorsBtn.addEventListener("click", function () {
    const hiddenCols = document.querySelectorAll(".doctor__col_hidden");
    hiddenCols.forEach((col) => {
      col.style.display = "block"; // или 'flex', если используется flexbox
    });
    showAllDoctorsBtn.style.display = "none";
  });
});

const docSlider = () => {
  let slider = new Swiper(".doc-slider", {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
      el: ".slider-pagination",
      type: "bullets",
      clickable: true,
    },
    // navigation: {
    // 	nextEl: '.video-review-next',
    // 	prevEl: '.video-review-prev',
    // },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
        // pagination: false,
      },
      576: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
};
docSlider();

const firstSlider = () => {
  let slider = new Swiper(".fisrt-slider", {
    slidesPerView: 1,
    spaceBetween: 12,
    pagination: {
      el: ".fisrt-pagination",
      type: "bullets",
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".first-next",
      prevEl: ".first-prev",
    },
  });
};
firstSlider();

const howSlider = () => {
  // Инициализация слайдера
  let slider = new Swiper(".how-slider", {
    slidesPerView: 1,
    spaceBetween: 12,
    navigation: {
      nextEl: ".how-slider-next",
      prevEl: ".how-slider-prev",
    },
    on: {
      // При изменении слайда обновляем активный лейбл
      slideChange: function () {
        updateActiveLabel(this.realIndex);
      },
      // При инициализации устанавливаем первый лейбл активным
      init: function () {
        updateActiveLabel(0);
      },
    },
  });

  // Функция обновления активного лейбла
  function updateActiveLabel(index) {
    const labels = document.querySelectorAll(".how__labels-item");
    labels.forEach((label, i) => {
      if (i === index) {
        label.classList.add("active");
      } else {
        label.classList.remove("active");
      }
    });
  }

  // Добавляем обработчики кликов на лейблы
  const labels = document.querySelectorAll(".how__labels-item");
  labels.forEach((label, index) => {
    label.addEventListener("click", function () {
      // Переключаем слайдер на соответствующий индекс
      slider.slideTo(index);
      // Обновляем активный лейбл
      updateActiveLabel(index);
    });
  });

  return slider;
};

// Инициализация
howSlider();

function getCookie(name) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

const aboutSlider = () => {
  let sliderNoReverse = new Swiper(".about-slider", {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 12,
    // speed: 1000,
    // allowTouchMove: true,
    pagination: {
      el: ".about-slider__pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      576: {
        spaceBetween: 24,
      },
    },
  });
};

aboutSlider();

const doctorSlider = () => {
  let sliderDocOptions = {
    slidesPerView: 1.5,
    loop: false,
    spaceBetween: 12,
    speed: 1000,
    allowTouchMove: true,
    navigation: {
      nextEl: ".main-doctors__next",
      prevEl: ".main-doctors__prev",
    },

    breakpoints: {
      576: {
        spaceBetween: 18,
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2.5,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3.5,
      },
      1440: {
        slidesPerView: 4.2,
      },
    },
  };

  let sliderDoc = new Swiper(".main-doctors", sliderDocOptions);
};

doctorSlider();

const alergologiaReviewSlider = () => {
  let slider = new Swiper(".alergologia-review-slider", {
    slidesPerView: 2,
    spaceBetween: 16,
    pagination: {
      el: ".alergologia-review-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    // navigation: {
    // 	nextEl: '.video-review-next',
    // 	prevEl: '.video-review-prev',
    // },
    breakpoints: {
      0: {
        slidesPerView: 1,
        // pagination: false,
      },
      // 576: {
      // 	slidesPerView: 1.5,
      // },
      992: {
        slidesPerView: 2,
      },
      // 992: {
      // 	slidesPerView: 3,
      // },
    },
  });
};
alergologiaReviewSlider();

document.addEventListener("DOMContentLoaded", function () {
  const reviewTexts = document.querySelectorAll(".review-alergologia__text");
  const reviewModal = document.getElementById("modal-review");
  if (!reviewModal || !reviewTexts.length) return;

  const reviewModalTitle = reviewModal.querySelector(".modal-review__title");
  const reviewModalDoctor = reviewModal.querySelector(".modal-review__doctor");
  const reviewModalDate = reviewModal.querySelector(".modal-review__date");
  const reviewModalText = reviewModal.querySelector(".modal-review__text");

  function toggleReviewBtns() {
    reviewTexts.forEach((text) => {
      const btn = text.nextElementSibling;
      if (!btn || !btn.classList.contains("review-alergologia__btn")) return;
      if (text.scrollHeight <= text.clientHeight) {
        btn.style.display = "none";
      } else {
        btn.style.display = "inline-flex";
      }
    });
  }

  toggleReviewBtns();
  window.addEventListener("resize", toggleReviewBtns);

  document.querySelectorAll(".review-alergologia__btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".review-alergologia");
      // const title = card.querySelector(".review-alergologia__title").textContent.trim();
      const doctor = card.querySelector(".review-alergologia__doctor").textContent.trim();
      // const date = card.querySelector(".review-alergologia__date").textContent.trim();
      const text = card.querySelector(".review-alergologia__text").textContent.trim();
      // reviewModalTitle.textContent = title;
      reviewModalDoctor.textContent = doctor;
      // reviewModalDate.textContent = date;
      reviewModalText.textContent = text;
      let wsb = widthScrollBar();
      fadeIn(reviewModal, 300, "flex");
      document.body.classList.add("noscroll");
      document.querySelector(".header").style.paddingRight = wsb + "px";
      document.querySelector(".footer").style.paddingRight = wsb + "px";
      document.querySelector(".main").style.paddingRight = wsb + "px";
    });
  });
});
