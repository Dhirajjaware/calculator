'use strict';

const containerBtns = document.querySelector('.container__buttons');
const input = document.querySelector('.input__numbers');
const equal = document.querySelector('.equal');
const btnBackSpace = document.querySelector('.btn__backspace');
const canvasContainer = document.querySelector('.offcanvas-body');
const btnClearHistory = document.querySelector('.btn-clear');

// creating date
const now = new Date();
const date = Intl.DateTimeFormat(navigator.language, {
  year: 'numeric',
  day: 'numeric',
  month: 'long',
}).format(now);

class History {
  constructor(calculation, result) {
    this.date = date;
    this.calculation = calculation;
    this.result = result;
  }
}

class App extends History {
  history = [];
  constructor() {
    super();
    containerBtns.addEventListener('click', this.showBtnValue.bind(this));
    equal.addEventListener('click', this.calculateValue.bind(this));
    btnBackSpace.addEventListener('click', this.backSpaceValue.bind(this));
    this.getLocalStorage();
    btnClearHistory.addEventListener('click', this.clearHistory.bind(this));
  }

  showBtnValue(e) {
    if (!e.target.value) return;

    const btnValue = e.target.value;

    input.value += btnValue;

    if (btnValue === 'AC') {
      input.value = '';
    }
  }

  calculateValue() {
    let holdHistory = [];

    holdHistory.push(input.value);

    setTimeout(() => {
      if (!input.value) return;

      const result = eval(input.value);

      input.value = result;

      const dataHistory = new History(...holdHistory, result);

      this.history.push(dataHistory);

      // Set localStorage
      this.setlocalStorage();

      this.reanderHistory(dataHistory);
    }, 100);
  }

  backSpaceValue() {
    const str = input.value;
    input.value = str.slice(0, -1);
  }

  reanderHistory(history) {
    const html = `
    <div class="d-flex justify-content-between">
     <p>${history.calculation}</p>
     <p>Date:${history.date}</p>
      </div>
     <h4> =${history.result}</h4>
     <hr> `;

    canvasContainer.insertAdjacentHTML('beforeend', html);
  }

  setlocalStorage() {
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('history'));

    if (!data) return;

    this.history = data;

    this.history.forEach((his) => this.reanderHistory(his));
  }

  clearHistory() {
    localStorage.clear();
    canvasContainer.innerHTML = '';
  }
}

const app = new App();
