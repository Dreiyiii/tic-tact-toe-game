import { useState } from "react";

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));

  const [isXTurn, setIsXTurn] = useState(true);

  const combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,4,8],
    [2,4,6],
  ]

  function getWinner(squares){
    for (let winningcombinations of combinations){
      const[a,b,c] = winningcombinations;

      if(
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ){
        return squares[a];
      }
    }
    return null;
  }

  function squareClick(index){
    if(board[index] || getWinner(board)) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? 'X' : 'O';

    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  }

  function getGameStatus(){
    const winner = getWinner(board);

    if(winner) return `Winner: ${winner}`;
    
    if(board.every((square)=> square !== null)){
      return "Draw"
    }
    return `Next Player: ${isXTurn ? 'X' : 'O'}`
  }

  function reset(){
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }
  

  return (
  <main className="main-container min-h-screen bg-red-800 flex items-center justify-center">
    <section className="max-w-md w-full mx-5">
      <h1 className="text-red-50 text-5xl font-semibold m-8 text-center">Tic Tac Toe</h1>
      <section className={`text-center mb-6 ${getWinner(board) ? "text-2xl font-bold text-green-400 animate-bounce" : "text-xl text-white"}` }>
        {getGameStatus()}
      </section>
      <section className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
        {board.map((square, index) => (
          <button key={index} 
          onClick={()=> squareClick(index)}
          className={`h-32 w-full bg-red-300 rounded-md text-6xl font-bold transition-colors duration-500 hover:bg-red-500 ${square === 'X' ? "text-black" : 
            "text-white"
          }`}>
            {square}
          </button>
          ))}

      </section>
      <button className="text-white text-lg w-full p-3 border rounded-xl hover:bg-red-200 hover:text-red-700 transition-colors duration-300"
      onClick={reset}>
        NEW GAME
      </button>


    </section>


  </main>
 
  );
}

export default App
