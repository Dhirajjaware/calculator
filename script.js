"use strict";

const containerBtns = document.querySelector(".container__buttons");

const input = document.querySelector(".input__numbers");

const equal = document.querySelector(".equal");

// Play Sound

const playSound = function (sound) {
  new Audio(sound).play();
};

containerBtns.addEventListener("click", function (e) {
  if (!e.target.value) return;

  e.target.addEventListener(
    "click",
    playSound(
      "sounds/zapsplat_office_calculator_button_single_press_003_81853.mp3"
    )
  );

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

  console.log(result);
  input.value = `=${result}`;
});
