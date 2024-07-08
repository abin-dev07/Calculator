const inputValue = document.getElementById("user-input");


// EventListenrs for Number Buttons and append to Display
const number = document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function appendToDisplay(e) {
        if (inputValue.innerText === "NaN") {
            inputValue.innerText = "";
        }
        if (inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

const regex = /([-+\d.]+)([+\-*/%])([-+\d.]+)/g;
const percentageRegex = /([-+\d.]+)(%?)/g;
let match;
const calculate = document.querySelectorAll(".operations")
    .forEach(function (item) {
        item.addEventListener("click", function (e) {
            let lastValue = inputValue.innerText.substring(inputValue.innerText.length, inputValue.innerText.length - 1);

            if (!isNaN(lastValue) && e.target.innerHTML === "=") {
                try {
                    const result = evaluateExpression(inputValue.innerText);
                    inputValue.innerText = result;
                } catch (error) {
                    console.log("Error:", error.message);
                }
            } //% usecase
            else if (isNaN(lastValue) && e.target.innerHTML === "=") {
                // considering only % 
                match = percentageRegex.exec(inputValue.innerText)
                inputValue.innerText = ((parseFloat(match[1])) / 100)
                console.log(inputValue.innerText)
            }
            else if (e.target.innerHTML === "AC") {
                inputValue.innerText = 0;
            } else if (e.target.innerHTML === "DEL") {
                inputValue.innerText = inputValue.innerText.substring(0, inputValue.innerText.length - 1);
                if (inputValue.innerText.length == 0) {
                    inputValue.innerText = 0;
                }
            } else {
                if (!isNaN(lastValue)) {
                    inputValue.innerText += e.target.innerHTML;
                }
            }
        });

    });

function evaluateExpression(expression) {
    let result = 0;
    let currentNumber = '';
    let currentOperator = '+';

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (/\d|\./.test(char)) {
            currentNumber += char;
        } else if (/[+\-*/%]/.test(char)) {
            if (currentNumber) {
                result = applyOperation(result, parseFloat(currentNumber), currentOperator);
                currentNumber = '';
            }
            currentOperator = char;
        }
    }

    if (currentNumber) {
        result = applyOperation(result, parseFloat(currentNumber), currentOperator);
    }

    return result;
}

function applyOperation(accumulator, number, operator) {
    switch (operator) {
        case '+':
            return accumulator + number;
        case '-':
            return accumulator - number;
        case '*':
            return accumulator * number;
        case '/':
            return accumulator / number;
        case '%':
            return accumulator * (number / 100);
        default:
            console.log("Unsupported operator: " + operator);
    }
}
