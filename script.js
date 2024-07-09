let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
const inputValue = document.getElementById("user-input");

function updateDisplay() {
    inputValue.innerText = displayValue;
}
updateDisplay();
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("numbers")) {
            handleOperand(button.innerText);
        } else if (button.classList.contains("key-operate")) {
            handleOperator(button.innerText);
        } else if (button.classList.contains("key-equal")) {
            handleEquals();
        } else if (button.classList.contains("decimal")) {
            handleDecimal(button.innerText);
        } else if (button.classList.contains("key-percent")) {
            handlePercent();
        } else if (button.innerHTML === "AC") {
            clearDisplay();
        }
        else if (button.innerHTML === "DEL") {
            inputBackspace()
            updateDisplay()
        }
        updateDisplay();
    });
});
function handleOperand(operand) {
    if (operator === null) {
        displayValue = (displayValue === '0') ? operand : displayValue + operand;
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}
function handleOperator(op) {
    if (operator === null) {
        firstOperand = displayValue;
        operator = op;
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), operator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        operator = op;
    }
}
function handleEquals() {
    if (operator !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), operator);
        displayValue = (result === 'lmao') ? 'lmao' : roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        operator = null;
    }
}
function handleDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}
function handlePercent() {
    displayValue = (parseFloat(displayValue) / 100).toString();
}
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    result = null;
}

function inputBackspace() {
    displayValue = inputValue.innerText.substring(0, inputValue.innerText.length - 1);
    console.log("The click",inputValue.innerText.length)
    if (inputValue.innerText.length ==1 ) {
        displayValue = 0;
    }
}

function operate(x, y, op) {
    switch (op) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/': return y === 0 ? 'lmao' : x / y;
        default: return null;
    }
}
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}