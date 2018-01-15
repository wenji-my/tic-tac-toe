import React, { Component } from 'react';
import Board from "./Board";
class Game extends Component {

    constructor() {
        super();
        this.state = {
            history: [{
                //Array(9)创建一个包含9个undefined元素的数组，fill填充所有元素
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    calculateWinner(squares) {
        //胜利的所有组合
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let i = 0; i < lines.length; i++) {
            //解构
            let [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i) {
        const history = this.state.history;
        //获取最新一步的记录
        const current = history[history.length-1];
        //为了实现悔棋功能，要使用浅拷贝，避免直接改变history里的squares对象
        const squares = current.squares.slice();
        //当前格子已经落子或者有一方胜利就无法继续下棋
        if(squares[i] || this.calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X':'O';
        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        const history = this.state.history.slice(0,step + 1);
        this.setState({
            history: history,
            xIsNext: !(step % 2)
        })
    }

    render() {
        const history = this.state.history;
        const current = history[history.length-1];
        const squares = current.squares;
        const winner = this.calculateWinner(squares);
        let status;
        const moves = history.map((step,move) => {
            const desc = 'Move to #' + move;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        if(winner) {
            status = 'Winner is ' + winner;
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
