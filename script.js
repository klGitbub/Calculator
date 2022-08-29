class Script {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        // Checks if there is a decimal point
        if (number === '.' && this.currentOperand.includes('.')) return
        // Converts inputs to strings for concatenation
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // checks to see if there are two numbers to operate
        if (this.currentOperand === '') return
        // computes if there is two operands
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
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
        case 'x':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return 
        }
        this.currentOperand = computation
        historyArray.push(`${prev} ${this.operation} ${current} = ${computation} </br>`)
        let historyText = historyArray.join("")
        document.getElementById('history-text').innerHTML = historyText
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            }
            else {
                return integerDisplay
            }
        }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const hamburgerMenuElement = document.getElementsByClassName('hamburger-menu')
const fontsModal = document.getElementsByClassName('fonts-menu')
const closeMenu = document.getElementById('close')
const fontMenuContainer = document.getElementById('modal-fonts')
const historyModal = document.getElementById('history-menu')
const closeMenuHistory = document.getElementById('close-history')
const themeButton = document.querySelector('[data-theme-button]')
let historyArray = []

const calculator = new Script(previousOperandTextElement, 
    currentOperandTextElement)

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

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

hamburgerMenuElement[0].addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal')
    if (displayMenuElement.className === 'no-display') {
        displayMenuElement.classList.remove('no-display')
        displayMenuElement.classList.add('show-modal')
    }
    else {
        displayMenuElement.classList.remove('show-modal')
        displayMenuElement.classList.add('no-display')
    }
})

fontsModal[0].addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-fonts')
    if (displayMenuElement.className === 'no-display') {
        displayMenuElement.classList.remove('no-display')
        displayMenuElement.classList.add('show-modal-fonts')
    }
    else {
        displayMenuElement.classList.remove('show-modal-fonts')
        displayMenuElement.classList.add('no-display')
    }
})

closeMenu.addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-fonts')
    displayMenuElement.classList.remove('show-modal-fonts')
    displayMenuElement.classList.add('no-display')
})

fontMenuContainer.addEventListener('click', e => {
    const r = document.querySelector(':root')
    // e.target is the path of the event that leads to the
    // element that was clicked.
    if (e.target.id === "times") {
        r.style.setProperty('--main-font', '"Times New Roman"')
    }
    if (e.target.id === "default") {
        r.style.setProperty('--main-font', '"Open Sans"')
    }
    if (e.target.id === "arial") {
        r.style.setProperty('--main-font', '"Arial"')
    }
   if (e.target.id === "helvetica") {
     r.style.setProperty('--main-font', '"Helvetica"')
   }
    if (e.target.id === "default-theme") {
        r.style.setProperty('--main-bg-color', 'rgb(46,57,138)')
        r.style.setProperty('--header-bg-color', 'rgb(86,89,166)')
        r.style.setProperty('--button-number-color', 'rgb(135,141,188)')
        r.style.setProperty('--operator-color', 'rgb(250,219,75)')
        r.style.setProperty('--number-color', 'rgb(171,175,208)')
    }
    if (e.target.id === "dark") {
        r.style.setProperty('--main-bg-color', 'black')
        r.style.setProperty('--header-bg-color', 'grey')
        r.style.setProperty('--button-number-color', 'white')
        r.style.setProperty('--operator-color', 'grey')
        r.style.setProperty('--number-color', 'white')
    }
    if (e.target.id === "pink") {
        r.style.setProperty('--main-bg-color', 'pink')
        r.style.setProperty('--header-bg-color', 'hotpink')
        r.style.setProperty('--button-number-color', 'white')
        r.style.setProperty('--operator-color', 'white')
        r.style.setProperty('--number-color', 'white')
    }
    if (e.target.id === "green") {
        r.style.setProperty('--main-bg-color', 'green')
        r.style.setProperty('--header-bg-color', 'limegreen')
        r.style.setProperty('--button-number-color', 'white')
        r.style.setProperty('--operator-color', 'white')
        r.style.setProperty('--number-color', 'white')
    }
})


historyModal.addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-history')
    displayMenuElement.classList.remove('no-display')
    displayMenuElement.classList.add('show-modal-fonts')
})

closeMenuHistory.addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-history')
    displayMenuElement.classList.remove('show-modal-fonts')
    displayMenuElement.classList.add('no-display')
})
