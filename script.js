'use strict';

const btnContainer = document.querySelector('.container__buttons');
const input = document.querySelector('.input__numbers');
const equal = document.querySelector('.equal');
const btnBackSpace = document.querySelector('.btn__backspace');
const canvasContainer = document.querySelector('.offcanvas-body');
const btnClearHistory = document.querySelector('.btn-clear');

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
    btnContainer.addEventListener('click', this.renderNumber.bind(this));
    equal.addEventListener('click', this.calculate.bind(this));
    btnBackSpace.addEventListener('click', this.backspace.bind(this));
    this.getLocalStorage();
    btnClearHistory.addEventListener('click', this.clearHistory.bind(this));
  }

  renderNumber(e) {
    if (!e.target.value) return;

    const btnValue = e.target.value;

    //render num
    input.value += btnValue;

    //Clear input fields
    if (btnValue === 'AC') input.value = '';
  }

  calculate() {
    let holdHistory = [];
    holdHistory.push(input.value);

    setTimeout(() => {
      if (!input.value) return;

      const result = eval(input.value);
      input.value = result;

      const dataHistory = new History(...holdHistory, result);

      this.history.push(dataHistory);

      // Set localStorage
      this.setLocalStorage();

      this.renderHistory(dataHistory);
    }, 0);
  }

  backspace() {
    const str = input.value;
    input.value = str.slice(0, -1);
  }

  renderHistory(history) {
    const html = `
    <div class="d-flex justify-content-between">
     <p>${history.calculation}</p>
     <p>Date:${history.date}</p>
      </div>
     <h4> =${history.result}</h4>
     <hr> `;

    canvasContainer.insertAdjacentHTML('beforeend', html);
  }

  setLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('history'));
    if (!data) return;

    this.history = data;

    this.history.forEach((el) => this.renderHistory(el));
  }

  clearHistory() {
    localStorage.clear();
    canvasContainer.innerHTML = '';
  }
}

const app = new App();
