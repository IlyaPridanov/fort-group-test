'use strict'

// select

const SELECT_LIST = [
  {
    caption: 'Первый',
    dataName: '1',
  },{
    caption: 'Второй',
    dataName: '2',
  },{
    caption: 'Третий',
    dataName: '3',
  },{
    caption: 'Четвертый',
    dataName: '4',
  },{
    caption: 'Пятый',
    dataName: '5',
  },{
    caption: 'Шестой',
    dataName: '6',
  },{
    caption: 'Седьмой',
    dataName: '7',
  },
]

const CARD_LIST = [
  {
    caption: 'Первый',
    dataName: '1',
    src: "img/1.jpg"
  },{
    caption: 'Второй',
    dataName: '2',
    src: "img/2.jpg"
  },{
    caption: 'Третий',
    dataName: '3',
    src: "img/3.jpg"
  },{
    caption: 'Четвертый',
    dataName: '4',
    src: "img/4.jpg"
  },{
    caption: 'Пятый',
    dataName: '5',
    src: "img/5.jpg"
  },{
    caption: 'Шестой',
    dataName: '6',
    src: "img/6.jpg"
  },{
    caption: 'Седьмой',
    dataName: '7',
    src: "img/7.jpg"
  },
]

const body = document.querySelector('body');

const selectItem = () => {
  let result = '';
  SELECT_LIST.forEach(element => {
    result += `<li class="select__item" data-card="${element.dataName}">${element.caption}</li>`;
  });
  return result;
}

const cardItem = () => {
  let result = '';
  CARD_LIST.forEach(element => {
    result += `
      <li class="block__item card" data-card="${element.dataName}">
        <div class="card__img">
          <img src="${element.src}" alt="card-img">
        </div>
        <div class="card__caption">${element.caption}</div>
        <button class="card__close">x</button>
      </li>
    `;
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

body.insertAdjacentHTML('afterbegin', layout());