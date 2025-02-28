const display = document.getElementById("display");
let currentInput = ''; //Stores the current input string
//Getting all buttons with the class .btn
const buttons = document.querySelectorAll('.btn');

//Adding eventlistener to all the buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-num'); //Get value from the data-num
        
        if(value === 'C'){
            clearDisplay();  // Clear the display if the button is "C"
        }
        else if(value === '='){
            calculateResult(); // Calculate the result if the button is "="
        }
        else{
            appendToDisplay(value); // Otherwise, append the value to the display
        }
    });
});

//Append input to display
function appendToDisplay(value){
    currentInput += value;
    display.value = currentInput;
    // console.log(currentInput);
}
// Clear the display
function clearDisplay(){
    currentInput ='';
    display.value= '';
}
// Calculate the result
function calculateResult(){
    try{
        const result = parseAndCalculate(currentInput); //Parse the input and calculate the result
        display.value =result;
        // console.log("The result is before converting into-",typeof(result));
        currentInput =result.toString();
        // console.log("Post converting -",typeof(currentInput));
    }catch(error){
        display.value = error.message;
        currentInput="";
    }
}
//Parse and calculate the result
function parseAndCalculate(input){
    const tokens = input.split(/([\+\-\*\/])/); //Split input into numbers and operators
    const numbers = []; //Store numbers
    console.log("Tokens are: ",tokens);
    const operators = []; //Store operators

    //Parse tokens into numbers and operators
    for(let token of tokens){
        if(!isNaN(token)) {
            numbers.push(parseFloat(token));
        }
        else if(['+','-','*','/'].includes(token)){
            operators.push(token);
        }
    }
    //Performing multiplication and division
    for(let i=0; i < operators.length; i++){
        if(operators[i] === '*' || operators[i]=== '/'){
            const num1 = numbers[i];
            const num2 = numbers[i+1];
            const operator = operators[i];

            let result;
            if(operator === '*'){
                result = num1 * num2;
            }
            else if(operator === '/'){
                if(num2 != 0){
                    result = num1 / num2;
                }
                else{
                    throw new error ("Cannot divide by zero");
                }
            }
            
            // Replace the numbers and operators with the result
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }
    // Perform addition and subtraction
    let finalResult = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const num = numbers[i + 1];
        if (operator === '+') {
            finalResult += num;
        } else if (operator === '-') {
            finalResult -= num;
        }
  }
  return finalResult;
}


