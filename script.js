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
        document.querySelector(".stopwatch").classList.add("this-score");
        let element = document.createElement('li');
        element.innerText = this.format(this.state.times);
        document.querySelector('.results').appendChild(element);
        setTimeout(() => document.querySelector(".stopwatch").classList.remove("this-score"), 500);
    }

    clearList() {
        let scoresList = document.querySelector('.results');
        scoresList.innerText = '';
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
                React.createElement("a", { onClick: this.start.bind(this), className: "start" }, "Start"),
                React.createElement("a", { onClick: this.stop.bind(this), className: "stop" }, "Stop"),
                React.createElement("a", { onClick: this.reset.bind(this), className: "reset" }, "Reset"),
                React.createElement("a", { onClick: this.addToList.bind(this), className: "add-score" }, "Add score"),
                React.createElement("a", { onClick: this.clearList.bind(this), className: "clear" }, "Clear scores"),
                React.createElement("div", { className: "stopwatch" }, this.format(this.state.times)),
                React.createElement("ul", { className: "results" })
            )
        )
    }
}

const app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
