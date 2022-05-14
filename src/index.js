import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}


function Square({ cellNumber, turn, setTurn, cellsClicked, setCellsClicked, winner, setWinner} ) {

  // Creates an array with 9 elements, each containing an empty string
  // const [cellsClicked, setCellsClicked] = useState(Array(9).fill(""))

  const checkWin = (tempCellsClicked) => {
    console.log("tempCellsClicked:")
    // console.log(tempCellsClicked)
    const combinations = {
        horizontal: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ],
        vertical: [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ],
        diagonal: [
            [0, 4, 8],
            [2, 4, 6],
        ],
    }

    for(let combination in combinations){
      combinations[combination].forEach((pattern) => {
          if(
              tempCellsClicked[pattern[0]] === "" ||
              tempCellsClicked[pattern[1]] === "" ||
              tempCellsClicked[pattern[2]] === "")
              {
                  // do nothing
              }
          else if(tempCellsClicked[pattern[0]] === tempCellsClicked[pattern[1]] &&
                  tempCellsClicked[pattern[1]] === tempCellsClicked[pattern[2]])
                  {
                      setWinner(tempCellsClicked[pattern[0]])
                  }

      })
    }

  }


  const handleClick = (cellNumber) => {

    if(cellsClicked[cellNumber] !== ""){
      alert("Square already clicked");
      return
    }

    let tempCellsClicked = [...cellsClicked];

    // When a cell is clicked, save its value to the current turn and save to array
    if(turn === "X"){
      tempCellsClicked[cellNumber] = "X"
      setTurn("O")
    }
    else {
      tempCellsClicked[cellNumber] = "O"
      setTurn("X");
    }

    checkWin(tempCellsClicked)

    setCellsClicked(tempCellsClicked);
  }


  return (
    <div
      turn={turn}
      winner={winner}
      onClick={() => handleClick(cellNumber)}
      className="square"
      style={squareStyle}>

      {cellsClicked[cellNumber]}
    </div>
  );
}



function Board() {

  const [turn, setTurn] = useState("X");

  // Creates an array with 9 elements, each containing an empty string
  const [cellsClicked, setCellsClicked] = useState(Array(9).fill(""))

  const [winner, setWinner] = useState();

  const resetGame = () => {
    setWinner(null);
    setCellsClicked(Array(9).fill(""))
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{turn}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{!winner && "None"} {winner && (winner)}</span></div>
      <button onClick={() => resetGame()} style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square cellNumber={0} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
          <Square cellNumber={1} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
          <Square cellNumber={2} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square cellNumber={3} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
          <Square cellNumber={4} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
          <Square cellNumber={5} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square cellNumber={6} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
          <Square cellNumber={7} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
          <Square cellNumber={8} turn={turn} setTurn={setTurn} cellsClicked={cellsClicked} setCellsClicked={setCellsClicked} winner={winner} setWinner={setWinner}/>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);