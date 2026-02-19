const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a,b) {
  return a * b;
};

const divide = function (a,b) {
  return a / b;
};

function operate(operator, num1, num2) {
    const a = Number(num1);
    const b = Number(num2);
    let result; 

    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        if (b === 0) {
            return "Undefined"; 
        }       
        result = divide(a, b);
    } 

    return Math.round(result * 1000) / 1000;
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const allClear = document.querySelector("#allClear");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const historyDisplay = document.querySelector("#history");
const backspace = document.querySelector("#clear");
const sign = document.querySelector("#sign");
const percent = document.querySelector("#percent");


let displayValue = "";
let shouldResetScreen = false; 


numbers.forEach(function(button) {
    button.addEventListener("click", function(){
        if (shouldResetScreen) {
            displayValue = ""
            shouldResetScreen = false;
        }
        const input = button.dataset.number;

        if (input === "." && displayValue.includes(".")){
            return;
        }
        if (display.textContent === firstNumber && currentOperator === null) {
            if (input === ".") {
                displayValue = "0.";
            } else {
                displayValue = input;
            }
        }
        else if (displayValue === "") {
            if (input === ".") {
                displayValue = "0.";
            } else {
                displayValue = input;
            }
        }
        else {
            displayValue += input;
        }
        display.textContent = displayValue;
    });
});

operators.forEach(function(button) {
    button.addEventListener("click", function(){
        if (button.dataset.operator === "%") return;
        if (firstNumber !== "" && currentOperator !== null && displayValue !== "") {
        const result = operate(currentOperator, firstNumber, displayValue);
        display.textContent = result;
        firstNumber = result.toString();
        } else if (displayValue !== "") {
            firstNumber = displayValue ;
        }
        currentOperator = button.dataset.operator;
        historyDisplay.textContent = `${firstNumber} ${currentOperator}`;
        displayValue = "";
        shouldResetScreen = true;
    });
});

equals.addEventListener("click", function() {
    if (currentOperator === null || displayValue === "") return;

    secondNumber = displayValue;
    const result = operate(currentOperator, firstNumber, secondNumber);

    historyDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;

    display.textContent = result;
    
    if (result === "Undefined") {
        displayValue = "";
        firstNumber = "";
        currentOperator = null;
    } else {
        displayValue = result.toString();
        firstNumber = displayValue;
        currentOperator = null;
    }
    
    shouldResetScreen = true;
});


allClear.addEventListener("click", function(){
    displayValue = "";
    display.textContent = "0";
    historyDisplay.textContent = "";
    firstNumber = "";
    currentOperator = null;
    shouldResetScreen = false;
});

backspace.addEventListener("click", function (){
    displayValue = displayValue.toString().slice(0, -1);

    if (displayValue === "") {
        display.textContent = "0";
    } else {
        display.textContent = displayValue;
    }
});

sign.addEventListener("click", () => {
    if (displayValue === "" || displayValue === "0") return;

    if (displayValue.includes("-")) {
        displayValue = displayValue.replace("-", "");
    } else {
        displayValue = "-" + displayValue;
    }
    display.textContent = displayValue;
});

window.addEventListener('keydown', function(e) {
    console.log(e.key);

    const button = document.querySelector(`button[data-number="${e.key}"], button[data-operator="${e.key}"]`);

    if (e.key === "Enter") document.querySelector("#equals").click();
    if (e.key === "Backspace") document.querySelector("#clear").click();
    if (e.key === "Escape") document.querySelector("#allClear").click();

    if (button) button.click();
});

percent.addEventListener("click", () => {
    if (displayValue === "" || displayValue === "0") return;
    let result = Number(displayValue) / 100;
    displayValue = (Math.round(result * 1000000) / 1000000).toString();
    display.textContent = displayValue;
});





