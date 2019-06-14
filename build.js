"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "format",
        value: function format() {
            return this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                setInterval(function () {

                    if (_this2.state.running) {
                        _this2.setState({
                            times: _this2.calculate(_this2.state.times)
                        });
                    }
                }, 10);
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({
                running: false
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: "addToList",
        value: function addToList() {
            document.querySelector(".stopwatch").classList.add("this-score");
            var element = document.createElement('li');
            element.innerText = this.format(this.state.times);
            document.querySelector('.results').appendChild(element);
            setTimeout(function () {
                return document.querySelector(".stopwatch").classList.remove("this-score");
            }, 500);
        }
    }, {
        key: "clearList",
        value: function clearList() {
            var scoresList = document.querySelector('.results');
            scoresList.innerText = '';
        }
    }, {
        key: "calculate",
        value: function calculate(times) {
            var result = times;
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
    }, {
        key: "pad0",
        value: function pad0(value) {
            var result = value.toString();

            if (result.length < 2) {
                result = "0" + result;
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("container", { className: "container" }, React.createElement("a", { onClick: this.start.bind(this), className: "start" }, "Start"), React.createElement("a", { onClick: this.stop.bind(this), className: "stop" }, "Stop"), React.createElement("a", { onClick: this.reset.bind(this), className: "reset" }, "Reset"), React.createElement("a", { onClick: this.addToList.bind(this), className: "add-score" }, "Add score"), React.createElement("a", { onClick: this.clearList.bind(this), className: "clear" }, "Clear scores"), React.createElement("div", { className: "stopwatch" }, this.format(this.state.times)), React.createElement("ul", { className: "results" }));
        }
    }]);

    return Stopwatch;
}(React.Component);

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
