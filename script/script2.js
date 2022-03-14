'use strict'

const filterValue = document.querySelector(".filter__value");
const filterBlock = document.querySelector(".filter__block");
const input = filterBlock.querySelectorAll("input");
const filterBtn = document.querySelectorAll(".filter__btn");
const filterTabBlock = document.querySelectorAll(".filter__tab-block");

// Переключение списка

filterValue.addEventListener("click" , () => {
  filterValue.classList.toggle("active");
  filterBlock.classList.toggle("active");
})

// Выбор инпута
let diameter = ``;
let type = ``;
let application = ``;
let other = ``;
let resultStr = ``;

input.forEach((item) => {
  item.addEventListener("input" , function () {
    filterBtn.forEach((element) => {
      if (item.parentNode.parentNode.dataset.tab === element.dataset.tab) {
        element.classList.add("filled");
      }
    })
    if (item.name === "diameter") {
      diameter = `Диаметр ${item.value}`;
    } else if (item.name === "type-radio") {
      type = item.value.toLowerCase();
    } else if (item.name === "application-radio") {
      application = item.value.toLowerCase();
    } else {
      other = item.value.toLowerCase();
    }
    let arrResult = [];
    [diameter,type,application,other].forEach((element) => {
      if (element) {
        arrResult.push(element);
      }
    })
    resultStr = arrResult.join(", ");
    resultStr = resultStr[0].toUpperCase() + resultStr.slice(1);
    filterValue.querySelector(".text").textContent = resultStr;
  })
})

// Переключение табов

filterBtn.forEach((btn) => {
  btn.addEventListener("click" , function () {
    filterBtn.forEach((item) => {
      item.classList.remove("open");
    })
    btn.classList.add("open");
    filterTabBlock.forEach((item) => {
      item.classList.remove("open");
      if (item.dataset.tab === btn.dataset.tab) {
        item.classList.add("open");
      }
    })
  })
})

// scroll

function scroll () {
  const container = document.querySelectorAll('.filter__scroll');
  container.forEach((item) => {
    const ps = new PerfectScrollbar(
        item,
        {
          wheelPropagation: false,
        }
    );
    ps.update();
  });
};

scroll();