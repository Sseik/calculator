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
  display.textContent = `${firstOperand} ${operator || ""} ${secondOperand}`;
}

function pressOperator(pressedOperator) {
  if (!secondOperand.length && !isNaN(+firstOperand)) {
    operator = pressedOperator;
    display.textContent = `${firstOperand} ${operator || ""}`;
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
  display.textContent = `${firstOperand} ${operator || ""} ${secondOperand}`;
}

function pressEquals() {
  if (!isNaN(+firstOperand) && !isNaN(+secondOperand) && operator) {
    display.textContent = operate(operator, +firstOperand, +secondOperand);
    firstOperand = "";
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
  display.textContent = `${firstOperand} ${operator || ""} ${secondOperand}`;
}

function pressClear() {
  firstOperand = "";
  secondOperand = "";
  operator = null;
  display.textContent = "";
}

document.querySelector("#buttonsContainer").addEventListener("click", (e) => {
  if (e.target.id === "buttonsContainer") return;
  switch (e.target.textContent) {
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
      pressOperator(e.target.textContent);
      break;
    default:
      pressNumber(e.target.textContent);
  }
});
