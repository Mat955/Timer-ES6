class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
    }

    format() {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {

        if (!this.state.running) {
            this.setState({
                running: true
            });
            setInterval(() => {

                if (this.state.running) {
                    this.setState({
                        times: this.calculate(this.state.times)
                    })
                }
            }, 10)
        }
    }

    stop() {
        this.setState({
            running: false
        })
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    addToList() {
        this.display.classList.add('this-score');
        let element = document.createElement('li');
        element.innerText = this.print();

        document.querySelector('.results').appendChild(element);
        setTimeout(() => this.display.classList.remove('this-score'), 500);
    }

    clearList() {
        let scoresList = document.querySelector(".results");
        while (scoresList.hasChildNodes()) {
            scoresList.removeChild(scoresList.lastChild)
        }
    }

    calculate(times) {
        let result = times;
        result.miliseconds += 1;

        if (result.miliseconds >= 100) {
            result.seconds += 1;
            result.miliseconds = 0;
        }

        if (result.seconds >= 60) {
            result.minutes += 1;
            result.seconds = 0;
        }
        return result;
    }

    pad0(value) {
        let result = value.toString();

        if (result.length < 2) {
            result = `0${result}`;
        }
        return result;
    }

    render() {
        return (
            React.createElement("container", { className: "container" },
                React.createElement("button", { onClick: this.start, id: "start" }, "Start"),
                React.createElement("button", { onClick: this.stop, id: "stop" }, "Stop"),
                React.createElement("button", { onClick: this.reset, id: "reset" }, "Reset"),
                React.createElement("button", { onClick: this.addToList, id: "add-score" }, "Add score"),
                React.createElement("button", { onClick: this.ClearList, id: "clear" }, "Clear scores"),
                React.createElement("div", { className: "stopwatch" }, this.format(this.state.times)),
                React.createElement("ul", { className: "results" })
            )
        )
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));
