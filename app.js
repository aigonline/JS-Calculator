// Initialize variables
let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '0';
let operation = null;
let shouldResetDisplay = false;

// Helper functions
function updateDisplay() {
    display.value = currentInput;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
}

function handleOperand(value) {
    appendToDisplay(value);
}

function handleOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

function handleEquals() {
    calculate();
    operation = null;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    updateDisplay();
    shouldResetDisplay = true;
}

function handleClear() {
    currentInput = '0';
    previousInput = '0';
    operation = null;
    updateDisplay();
}

function handleInvert() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        appendToDisplay('.');
    }
}

// Event listeners
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        const type = button.dataset.type;

        switch(type) {
            case 'operand':
                handleOperand(value);
                break;
            case 'operator':
                if (value === 'invert') {
                    handleInvert();
                } else if (value === '.') {
                    handleDecimal();
                } else {
                    handleOperator(value);
                }
                break;
            case 'equals':
                handleEquals();
                break;
            case 'clear':
                handleClear();
                break;
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/\d/.test(key)) {
        handleOperand(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        handleEquals();
    } else if (key === 'Escape') {
        handleClear();
    } else if (key === '.') {
        handleDecimal();
    }
});

// Initialize display
updateDisplay();