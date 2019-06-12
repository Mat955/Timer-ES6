class StopWatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    print() {
        return this.display.innerText = this.format(this.times);
    }
    addToList() {
        this.display.classList.add('this-score');
        let element = document.createElement('li');
        element.innerText = this.print();

        document.querySelector('.results').appendChild(element);
        setTimeout(() => this.display.classList.remove('this-score'), 500);
    }
    clearList() {
        let timeList = document.querySelector('.results');
        while (timeList.hasChildNodes()) {
            timeList.removeChild(timeList.lastChild);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    resetTimer() {
        this.reset();
        this.print();
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new StopWatch(
    document.querySelector('.stopwatch'));
let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

let clearButton = document.getElementById('clear-score');
clearButton.addEventListener('click', () => stopwatch.clearList());

let addButton = document.getElementById('add-score');
addButton.addEventListener('click', () => stopwatch.addToList());