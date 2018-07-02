import React, { Component } from "react";

const Problematic = () => {
  throw new Error("버그 발생");
};

class Counter extends Component {
  state = {
    number: 0,
    error: false
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    if (nextState.number === nextProps.number) return false;
    return true;
  }

  _handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  };

  _handleDecrease = () => {
    this.setState(({ number }) => ({
      number: number - 1
    }));
  };

  render() {
    console.log("render");
    const { number, error } = this.state;

    if (error) {
      return <h1>error ...발생</h1>;
    }

    return (
      <div>
        <h1>Counter</h1>
        <div>value: {number}</div>
        {number === 4 && <Problematic />}
        <button onClick={this._handleIncrease}>+</button>
        <button onClick={this._handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
