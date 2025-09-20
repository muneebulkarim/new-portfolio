class calcFunctions {
    pressedBtn;
    #replacedValue;
    lastAns;
    constructor() {
        this.pressedBtn = "";
        this.#replacedValue = "";
        this.lastAns = "0";
    }

    set currentBtn(btnValue) {
        this.pressedBtn = this.pressedBtn + btnValue;
    }

    removeAll() {
        this.pressedBtn = "";
    }
    removeLast() {
        let previousValue = this.pressedBtn;
        this.pressedBtn = previousValue.slice(0, -1);
    }
    displayValue() {
        this.#replacedValue = this.pressedBtn;
        while (this.#replacedValue.includes('*')) {
            this.#replacedValue = this.#replacedValue.replace('*', "×");
        }
        while (this.#replacedValue.includes('/')) {
            this.#replacedValue = this.#replacedValue.replace('/', '÷');
        }
        document.getElementById('main-output').value = this.#replacedValue;
    }
    point() {
        let check = this.pressedBtn.includes('.');
        if (check == true) {
            this.pressedBtn = this.pressedBtn;
        } else {
            this.pressedBtn = this.pressedBtn + '.';
        }
    }
    addOperator(operator) {
        this.pressedBtn = this.pressedBtn + operator;
    }
    calculate() {
        let equation = eval((this.pressedBtn));
        equation = Math.round(equation);
        this.lastAns = Number.parseInt(equation);
        this.#replacedValue = equation;
        Calculator.removeAll();
        if ((this.#replacedValue == undefined) || (this.#replacedValue == NaN)) {
            this.#replacedValue = "";
        }
        document.getElementById('main-output').value = this.#replacedValue;
    }

    lastValue() {
        this.#replacedValue = this.#replacedValue + Number.parseInt(this.lastAns);
        document.getElementById('main-output').value = this.#replacedValue;
    }
}

let Calculator = new calcFunctions();


function onBtnPressed(eleVal) {
    if (eleVal === 'AC') {
        Calculator.removeAll();
        Calculator.displayValue();
    } else if (eleVal === 'DC') {
        Calculator.removeLast();
        Calculator.displayValue();
    } else if (eleVal === '.') {
        Calculator.point();
        Calculator.displayValue();
    } else if (eleVal === 'x') {
        Calculator.addOperator('*');
        Calculator.displayValue();
    }
    else if (eleVal === '/') {
        Calculator.addOperator('/');
        Calculator.displayValue();
    }
    else if (eleVal === '=') {
        Calculator.addOperator('');
        Calculator.calculate();
    }
    else if (eleVal === 'a') {
        Calculator.lastValue();
    }
    else {
        Calculator.currentBtn = eleVal;
        Calculator.displayValue();
    }
}





