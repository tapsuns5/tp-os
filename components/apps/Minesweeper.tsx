
import React, { useState, useEffect } from 'react';

const GRID_SIZE = 10;
const MINES_COUNT = 15;

const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<any[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const initGrid = () => {
    let newGrid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ 
        isMine: false, 
        revealed: false, 
        neighborMines: 0,
        flagged: false
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (r + dr >= 0 && r + dr < GRID_SIZE && c + dc >= 0 && c + dc < GRID_SIZE) {
                if (newGrid[r + dr][c + dc].isMine) count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }
    setGrid(newGrid);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    initGrid();
  }, []);

  const reveal = (r: number, c: number) => {
    if (gameOver || won || grid[r][c].revealed || grid[r][c].flagged) return;

    const newGrid = [...grid.map(row => [...row])];
    if (newGrid[r][c].isMine) {
      setGameOver(true);
      // Reveal all mines
      newGrid.forEach(row => row.forEach(cell => { if (cell.isMine) cell.revealed = true; }));
    } else {
      const revealRecursive = (row: number, col: number) => {
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || newGrid[row][col].revealed || newGrid[row][col].isMine) return;
        newGrid[row][col].revealed = true;
        if (newGrid[row][col].neighborMines === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              revealRecursive(row + dr, col + dc);
            }
          }
        }
      };
      revealRecursive(r, c);
    }

    setGrid(newGrid);
    checkWin(newGrid);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won || grid[r][c].revealed) return;
    const newGrid = [...grid.map(row => [...row])];
    newGrid[r][c].flagged = !newGrid[r][c].flagged;
    setGrid(newGrid);
  };

  const checkWin = (currentGrid: any[][]) => {
    const allNonMinesRevealed = currentGrid.every(row => 
      row.every(cell => cell.isMine || cell.revealed)
    );
    if (allNonMinesRevealed) setWon(true);
  };

  return (
    <div className="flex flex-col items-center bg-[#c0c0c0] p-4 h-full select-none">
      <div className="retro-border-inset p-2 bg-black text-[#ff0000] font-mono text-2xl flex justify-between w-full max-w-[240px] mb-4">
        <span>{won ? 'WIN' : gameOver ? 'DIE' : '015'}</span>
        <button onClick={initGrid} className="retro-border-outset px-2 bg-[#c0c0c0] text-black text-sm font-bold active:retro-border-inset">
          {won ? '😎' : gameOver ? '😵' : '🙂'}
        </button>
        <span>0:00</span>
      </div>

      <div className="retro-border-inset p-1 bg-gray-400">
        <div className="grid grid-cols-10 gap-0">
          {grid.map((row, r) => row.map((cell, c) => (
            <div 
              key={`${r}-${c}`}
              onClick={() => reveal(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
              className={`w-6 h-6 flex items-center justify-center text-xs font-bold border ${cell.revealed ? 'bg-gray-200 border-gray-400' : 'bg-[#c0c0c0] retro-border-outset'}`}
            >
              {cell.revealed ? (
                cell.isMine ? '💣' : (cell.neighborMines > 0 ? cell.neighborMines : '')
              ) : (
                cell.flagged ? '🚩' : ''
              )}
            </div>
          )))}
        </div>
      </div>

      <div className="mt-4 text-[10px] uppercase text-gray-600 font-bold">
        Right click to flag mines!
      </div>
    </div>
  );
};

export default Minesweeper;
