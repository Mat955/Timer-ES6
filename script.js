class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
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
        setTimeout(() => document.querySelector(".stopwatch").classList.remove("this-score"), 500);
        const formattedTime = this.format(this.state.times);
        this.setState({
            results: this.state.results.concat([formattedTime])
        });
    }

    clearList() {
        this.setState({
            results: []
        })
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
            <div className={'container'}>
                <a className={'start'} onClick={this.start.bind(this)}>Start</a>
                <a className={'stop'} onClick={this.stop.bind(this)}>Stop</a>
                <a className={'reset'} onClick={this.reset.bind(this)}>Reset</a>
                <a className={'add-score'} onClick={this.addToList.bind(this)}>Add Score</a>
                <a className={'clear'} onClick={this.clearList.bind(this)}>Clear Scores</a>
                <div className={'stopwatch'}>{this.format(this.state.times)}</div>
                <ul className={'results'}>{this.state.results.map(result => <li>{(result)}</li>)}</ul>
            </div>
        )
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));