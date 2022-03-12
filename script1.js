'use strict'

const DATA_ERROR = {
  "cardArr": [
    {
      "caption": "Первый",
      "dataName": "1",
      "src": "img/1.jpg"
    },{
      "caption": "Второй",
      "dataName": "2",
      "src": "img/2.jpg"
    },{
      "caption": "Третий",
      "dataName": "3",
      "src": "img/3.jpg"
    },{
      "caption": "Четвертый",
      "dataName": "4",
      "src": "img/4.jpg"
    },{
      "caption": "Пятый",
      "dataName": "5",
      "src": "img/5.jpg"
    },{
      "caption": "Шестой",
      "dataName": "6",
      "src": "img/6.jpg"
    },{
      "caption": "Седьмой",
      "dataName": "7",
      "src": "img/7.jpg"
    }
  ]
}

// Какие карточки показанны изначально

let cardFlag = {
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": true,
  "6": false,
  "7": false,
}

const startBuild = (dataStart) => {
  // Построение
  const root = document.querySelector('#root');

  const build = (data) => {
    const selectItem = () => {
      let result = '';
      data.cardArr.forEach(element => {
        if (!cardFlag[element.dataName]) {
          result += `<li class="select__item" data-card="${element.dataName}">${element.caption}</li>`;
        }
      });
      return result;
    }
    
    const cardItem = () => {
      let result = '';
      data.cardArr.forEach(element => {
        if (cardFlag[element.dataName]) {
          result += `
            <li class="block__item card" data-card="${element.dataName}">
              <div class="card__img">
                <img src="${element.src}" alt="card-img">
              </div>
              <div class="card__caption">${element.caption}</div>
              <button class="card__close">x</button>
            </li>
          `;
        }
      });
      return result;
    }
    
    const layout = () => (
      `
      <div class="block">
        <div class="block__column">
          <div class="block__select select">
            <div class="select__caption">Добавить карточку</div>
            <ul class="select__list">
            ${selectItem()}
            </ul>
          </div>
        </div>
        <ul class="block__list">
          ${cardItem()}
        </ul>
      </div>
      <div class="popup">Произошло удаление...</div>
      `
    );
    
    root.insertAdjacentHTML('afterbegin', layout());
  }

  build(dataStart);

  // Показ попапа

  const getPopup = () => {
    const popup = document.querySelector(".popup");
    popup.classList.add('active');

    setTimeout(() => {
      popup.classList.remove('active');
    }, 700);
  }

  let cardCloseBtn = document.querySelectorAll(".card__close");
  let selectItem = document.querySelectorAll(".select__item");

  // Удаление карточки

  const closeCard = function () {
    let element = this;
    let numberCard = element.parentElement.dataset.card;
    cardCloseBtn.forEach(element => {
      element.removeEventListener('click', closeCard);
    });
    selectItem.forEach(element => {
      element.removeEventListener('click', closeCard);
    });
    cardFlag[numberCard] = !cardFlag[numberCard];
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    build(dataStart);
    getPopup();
    cardCloseBtn = document.querySelectorAll(".card__close");
    selectItem = document.querySelectorAll(".select__item");
    cardListener();
    selectListener();
  }

  function cardListener () {
    cardCloseBtn.forEach(element => {
      element.addEventListener('click', closeCard);
    });
  }

  cardListener();

  // Добавление карточки

  const openCard = function () {
    let element = this;
    let numberCard = element.dataset.card;
    selectItem.forEach(element => {
      element.removeEventListener('click', closeCard);
    });
    cardCloseBtn.forEach(element => {
      element.removeEventListener('click', closeCard);
    });
    cardFlag[numberCard] = !cardFlag[numberCard];
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    build(dataStart);
    cardCloseBtn = document.querySelectorAll(".card__close");
    selectItem = document.querySelectorAll(".select__item");
    selectListener();
    cardListener();
  }
  
  function selectListener () {
    selectItem.forEach(element => {
      element.addEventListener('click', openCard);
    });
  }

  selectListener();
}

fetch("./data.json")
  .then(response => response.json())
  .then(json => startBuild(json))
  .catch(() => startBuild(DATA_ERROR));

