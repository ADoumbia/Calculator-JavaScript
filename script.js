//Creating the Calculator constructor that will hold values of our current and previous operand
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
//The clear function/method will return nothing for the operands and the operation will be undefined
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
//The delete function/method will remove one value from the current operand. It does this by using a slice method
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    pi(){
        var π = parseFloat(Math.PI.toString()).toFixed(8)
        this.currentOperand = π
    }

    percent(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = this.currentOperand/100
    }

    negative(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = -(this.currentOperand)
    }

    sin(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = Math.sin(this.currentOperand)
    }

    cos(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = Math.cos(this.currentOperand)
    }

    tan(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = Math.tan(this.currentOperand)
    }

    root(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = Math.sqrt(this.currentOperand)
    }

    ln(){
        if (isNaN(this.currentOperand)) return
        this.currentOperand = Math.log(this.currentOperand)
    }



//The appendNumber function/method otherwise known as the add number function will pass a number and will add the operand and the number in a String format
//this is important because if we just added the operand and the number we would get 1 + 1 = 11 instead of 2
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
//Choose operator method that passes operation and will compute if the current operand is empty while the previous operand holds a value
//this will ensure that if we have a x + y an operation will be executed 
    chooseOperation(operation){
       if (this.currentOperand === '') return
       if(this.previousOperand !== ''){
           this.compute()
       }
       this.operation = operation
       this.previousOperand = this.currentOperand
       this.currentOperand = ''

    }
    //Our compute method first declares prev and current variables as parsefloat values for the previous and current operand respectiely
    //Float is important to retain decimal values. The method then checks if either value is not a number and will return if this is the case
    //Otherwise, a switch statement will run with cases for each operation (+ - / or *)
    compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '×':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        case 'EXP':
            computation = Math.pow(prev, current)
            break
        default: 
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    //This method ensures that our numbers will display properly by creating an array for both integers and decimals and 
    //the if statement will determine how the number will be displayed
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
            }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    //The update display method simply ensures that the value of the display field is updated depending on whether an operation is executed
    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''

        }
    }
    
}
//Declaring our button variables so that they can be attached to EventListeners
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearAllButton = document.querySelector('[data-clear-all]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const piButton = document.querySelector('[data-pi]')
const percentButton = document.querySelector('[data-percent]')
const negativeButton = document.querySelector('[data-negative]')
const sinButton = document.querySelector('[data-sin]')
const cosButton = document.querySelector('[data-cos]')
const tanButton = document.querySelector('[data-tan]')
const rootButton = document.querySelector('[data-root]')
const lnButton = document.querySelector('[data-ln]')

//Creating our calculator to attach the buttons
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//Adding actions to the buttons in the event of a click
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

piButton.addEventListener('click', button => {
    calculator.pi()
    calculator.updateDisplay()
   
})

percentButton.addEventListener('click', button => {
    calculator.percent()
    calculator.updateDisplay()
   
})

negativeButton.addEventListener('click', button => {
    calculator.negative()
    calculator.updateDisplay()
   
})

sinButton.addEventListener('click', button => {
    calculator.sin().toString
    calculator.updateDisplay()
   
})

cosButton.addEventListener('click', button => {
    calculator.cos()
    calculator.updateDisplay()
   
})

tanButton.addEventListener('click', button => {
    calculator.tan()
    calculator.updateDisplay()
   
})

rootButton.addEventListener('click', button => {
    calculator.root()
    calculator.updateDisplay()
   
})

lnButton.addEventListener('click', button => {
    calculator.ln()
    calculator.updateDisplay()
   
})