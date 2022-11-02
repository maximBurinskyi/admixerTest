import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //squares: Array(9).fill(Math.floor(Math.random() * 4) + 1),
      squares: Array(9)
        .fill()
        .map(() => Math.round(Math.random() * 3)),
      xIsNext: true,
      todos: [
        'learn react',
        'learn react props',
        'learn react state',
        'drink vodka',
      ],
    };
  }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   // squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  sorting(arr) {
    let result = arr.sort((a, b) => {
      return a - b;
    });
    return result;
  }
  count(arr) {
    Math.max(
      ...arr.reduce(
        (acc, n, i, a) => (
          n !== a[i - 1] && acc.push(0), acc[acc.length - 1]++, acc
        ),
        [0]
      )
    );
  }

  count2(arr) {
    Math.max(
      ...arr.reduce(
        (prev, item, index, array) => {
          return (
            item !== array[index - 1] && prev.push(0),
            prev[prev.length - 1]++,
            prev
          );
        },
        [0]
      )
    );
  }

  count3(arr) {
    const finalRes = calculateWinner(arr);
    console.log(finalRes);
    const arr2 = arr.splice(finalRes[1][0], 3);
    console.log(arr2);
    console.log(arr);
  }

  onTodoDelete(todoText) {
    //const updatedView = this.state.squares.filter((el) => el !== todoText);

    const newSquares = [...this.state.squares];
    const updatedView = this.count3(newSquares);
    console.log(updatedView);
    this.setState({
      squares: updatedView,
    });
  }

  renderSquare(i) {
    const variable = Math.floor(Math.random() * 3) + 1;
    // if (!this.state.squares) {
    //   this.setState({ squares: variable });
    // }

    //const squares = this.state.squares.slice();
    // if (calculateWinner(this.state.squares) || this.state.squares[i]) {
    //   return;
    // }
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.onTodoDelete(this.state.squares)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    console.log(this.state.squares);
    //console.log(winner[0]);

    let status;
    if (winner) {
      //status = 'Numbers matched in row: ' + winner;
      status = `Numbers under number ${winner[0]} have matched in a row and we deleted them. You need to refresh the page now to see new numbers`;
      const finalRes = winner;
      console.log(finalRes);
      const arr2 = this.state.squares.splice(finalRes[1][0], 3);
      console.log(arr2);
      //console.log(arr);
    } else {
      status = 'Please try again to refresh the page: ';
      //  + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={this.onTodoDelete}> refresh</button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

function calculateWinner(squares) {
  // const lines = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // [0, 4, 8],
    // [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}
