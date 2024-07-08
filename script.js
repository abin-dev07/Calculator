const inputValue = document.getElementById("user-input");


// EventListenrs for Number Buttons and append to Display
const number = document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click",function appendToDisplay(e){
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
        console.log(typeof(inputValue.innerText))

        while((match = regex.exec(inputValue.innerText)) !== null){
        const firstOperand=parseFloat(match[1]);
        const operator =match[2];
        const secondOperand=parseFloat(match[3]);
        console.log(match);
        console.log("Num1:",firstOperand,"Num2: ",secondOperand);
        switch(operator){
            case "+": inputValue.innerText= (firstOperand+secondOperand);
            console.log("Addition",firstOperand+secondOperand)
                        break;
            case "-":inputValue.innerText= (firstOperand-secondOperand);
            break;
            case "*":inputValue.innerText= (firstOperand*secondOperand);
            break;
            case "/":inputValue.innerText= (firstOperand/secondOperand);
            break;
            case "%":inputValue.innerText= (firstOperand/100);
            break;
            default:console.log("Not a valid Entry")
        }
    }
      } //% usecase
      else if(isNaN(lastValue) && e.target.innerHTML === "="){
        console.log(inputValue.innerText)
            console.log((match = regex.exec(inputValue.innerText)) !== null)
        // considering only % 
        match = percentageRegex.exec(inputValue.innerText)
        inputValue.innerText=((parseFloat(match[1]))/100)
        console.log(inputValue.innerText)
      }
       else if (e.target.innerHTML === "AC") {
          inputValue.innerText = 0;
      } else if (e.target.innerHTML === "DEL") {
          inputValue.innerText = inputValue.innerText.substring(0,inputValue.innerText.length - 1);
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

