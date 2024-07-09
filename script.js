let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

const inputValue = document.getElementById("user-input");
function updateDisplay(){
    inputValue.innerText=displayValue;
    // inputValue.innerHTML.trim()
}
updateDisplay();
// EventListenrs for Number Buttons and append to Display
function clickHandler(){
    const number = document.querySelectorAll("button").forEach(function (item) {
        item.addEventListener("click", function (e) {
            if (item.classList.contains("numbers")) {
                operandHandler(item.innerText);
                updateDisplay()
        }
        else if(item.classList.contains("key-operate")){
                operatorHandler(item.innerText)
        }
        else if(item.classList.contains("key-equal")){
                inputEquals();
                updateDisplay();
        }
        else if(item.classList.contains("decimal")){
            inputDecimal(item.innerText)
            updateDisplay();
        }
        else if(item.classList.contains("key-equal")){
            inputPercent(displayValue);
            updateDisplay();
        }
        else if(item.innerHTML=="AC"){
            clearDisplay()
            updateDisplay();
        }
        
      });
    });
}
clickHandler()


function operandHandler(operand){
    if(firstOperator === null){
        if(inputValue.innerText==='0' || inputValue.innerText===0){
            displayValue=operand;
            console.log(displayValue)
        }
        else if(displayValue === firstOperand){
            displayValue=operand;
        }
        else{
            displayValue+=operand;
        }
    }else {
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }

}

function operatorHandler(operator){
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}


function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return 'lmao';
        } else {
        return x / y;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}
// const regex = /([-+\d.]+)([+\-*/%])([-+\d.]+)/g;
// const percentageRegex = /([-+\d.]+)(%?)/g;
// let match;
// const calculate = document.querySelectorAll(".operations")
//     .forEach(function (item) {
//   item.addEventListener("click", function (e) {
//             let lastValue = inputValue.innerText.substring(inputValue.innerText.length, inputValue.innerText.length - 1);

//             if (!isNaN(lastValue) && e.target.innerHTML === "=") {
//                 try {
//                     const result = evaluateExpression(inputValue.innerText);
//                     inputValue.innerText = result;
//                 } catch (error) {
//                     console.log("Error:", error.message);
//                 }
//             } //% usecase
//             else if (isNaN(lastValue) && e.target.innerHTML === "=") {
//                 // considering only % 
//                 match = percentageRegex.exec(inputValue.innerText)
//                 inputValue.innerText = ((parseFloat(match[1])) / 100)
//                 console.log(inputValue.innerText)
//             }
//             else if (e.target.innerHTML === "AC") {
//                 inputValue.innerText = 0;
//             } else if (e.target.innerHTML === "DEL") {
//                 inputValue.innerText = inputValue.innerText.substring(0, inputValue.innerText.length - 1);
//                 if (inputValue.innerText.length == 0) {
//                     inputValue.innerText = 0;
//                 }
//             } else {
//                 if (!isNaN(lastValue)) {
//                     inputValue.innerText += e.target.innerHTML;
//                 }
//             }
//         });

//     });

// function evaluateExpression(expression) {
//     let result = 0;
//     let currentNumber = '';
//     let currentOperator = '+';

//     for (let i = 0; i < expression.length; i++) {
//         const char = expression[i];

//         if (/\d|\./.test(char)) {
//             currentNumber += char;
//         } else if (/[+\-*/%]/.test(char)) {
//             if (currentNumber) {
//                 result = applyOperation(result, parseFloat(currentNumber), currentOperator);
//                 currentNumber = '';
//             }
//             currentOperator = char;
//         }
//     }

//     if (currentNumber) {
//         result = applyOperation(result, parseFloat(currentNumber), currentOperator);
//     }

//     return result;
// }

// function applyOperation(accumulator, number, operator) {
//   switch (operator) {
//     case '+':
//             return accumulator + number;
//     case '-':
//             return accumulator - number;
//     case '*':
//             return accumulator * number;
//     case '/':
//             return accumulator / number;
//     case '%':
//             return accumulator * (number / 100);
//     default:
//             console.log("Unsupported operator: " + operator);
//   }
// }
