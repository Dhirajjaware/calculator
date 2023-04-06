"use strict";

const containerBtns = document.querySelector(".container__buttons");

const input = document.querySelector(".input__numbers");

const equal = document.querySelector(".equal");

const btnBackSpace = document.querySelector(".btn__backspace");

// Play Sound

containerBtns.addEventListener("click", function (e) {
  if (!e.target.value) return;

  const btnValue = e.target.value;

  //   Display number
  input.value += btnValue;

  if (btnValue === "AC") {
    input.value = "";
  }

  if (btnValue === "back") {
    console.log("i");
  }
});

equal.addEventListener("click", function () {
  if (!input.value) return;

  const result = eval(input.value);

  input.value = result;
});

// Remove last character
btnBackSpace.addEventListener("click", function () {
  const str = input.value;

  input.value = str.slice(0, -1);
});
