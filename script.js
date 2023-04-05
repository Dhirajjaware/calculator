"use strict";

const containerBtns = document.querySelector(".container__buttons");

const input = document.querySelector(".input__numbers");

const equal = document.querySelector(".equal");

containerBtns.addEventListener("click", function (e) {
  if (!e.target.value) return;

  const btnValue = e.target.value;

  //   Display number
  input.value += btnValue;

  if (btnValue === "AC") {
    input.value = "";
  }
});

equal.addEventListener("click", function () {
  if (!input.value) return;

  const result = eval(input.value);

 
  input.value = result;
});
