const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstOperand = "";
let secondOperand = "";
let operator;

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
  }
}

const display = document.querySelector("#display");

function pressNumber(number) {
  if (operator) {
    secondOperand += number;
  } else {
    firstOperand += number;
  }
}

function pressOperator(pressedOperator) {
  if (!secondOperand.length && !isNaN(+firstOperand)) {
    operator = pressedOperator;
  }
}

function pressBack() {
  if (secondOperand.length) {
    secondOperand = secondOperand.slice(0, -1);
  } else if (operator) {
    operator = null;
  } else {
    firstOperand = firstOperand.slice(0, -1);
  }
}

function pressEquals() {
  if (!isNaN(+firstOperand) && !isNaN(+secondOperand) && operator) {
    firstOperand = operate(operator, +firstOperand, +secondOperand);
    secondOperand = "";
    operator = null;
  }
}

function pressDot() {
  if (operator) {
    if (secondOperand.indexOf(".") === -1) {
      secondOperand += ".";
    }
  } else {
    if (firstOperand.indexOf(".") === -1) {
      firstOperand += ".";
    }
  }
}

function pressClear() {
  firstOperand = "";
  secondOperand = "";
  operator = null;
}

function updateDisplay(pressedValue) {
  switch (pressedValue) {
    case "=":
      pressEquals();
      break;
    case ".":
      pressDot();
      break;
    case "Clear":
      pressClear();
      break;
    case "←":
      pressBack();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      pressOperator(pressedValue);
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      pressNumber(pressedValue);
  }
  display.textContent = `${firstOperand} ${operator || ""} ${secondOperand}`;
}

document.querySelector("#buttonsContainer").addEventListener("click", (e) => {
  if (e.target.id === "buttonsContainer") return;
  updateDisplay(e.target.textContent);
});

document.addEventListener("keydown", (e) => {
  let pressedValue = e.key;
  if (pressedValue === "Backspace") pressedValue = "←";
  if (pressedValue === "Enter") pressedValue = "=";
  if (pressedValue === "Delete") pressedValue = "Clear";
  updateDisplay(pressedValue);
});
