
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];
const INITIAL_DIRECTION = [0, -1]; // Moving Up
const SPEED = 150;

const SnakeApp: React.FC = () => {
  const [snake, setSnake] = useState<number[][]>(INITIAL_SNAKE);
  const [food, setFood] = useState<number[]>([5, 5]);
  const [direction, setDirection] = useState<number[]>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<number | null>(null);

  const getRandomFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      // Ensure food doesn't land on snake
      const onSnake = snake.some(part => part[0] === newFood[0] && part[1] === newFood[1]);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setFood([5, 5]);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = [head[0] + direction[0], head[1] + direction[1]];

      // Check Walls
      if (
        newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 || newHead[1] >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check Self Collision
      if (prevSnake.some(part => part[0] === newHead[0] && part[1] === newHead[1])) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check Food
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(s => s + 10);
        setFood(getRandomFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, getRandomFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case 'ArrowDown':
        case 's':
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case 'ArrowRight':
        case 'd':
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, Math.max(SPEED - score / 5, 50));
    return () => clearInterval(interval);
  }, [moveSnake, score]);

  return (
    <div className="flex flex-col items-center bg-[#c0c0c0] p-4 h-full select-none terminal-font">
      <div className="retro-border-inset bg-[#8bac0f] p-4 mb-4 flex flex-col items-center">
        {/* LCD Screen Look */}
        <div className="relative border-4 border-[#306230] bg-[#9bbc0f] w-[200px] h-[200px] grid grid-cols-20 grid-rows-20">
          {/* Grid background effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#306230 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
          
          {/* Snake Rendering */}
          {snake.map((part, i) => (
            <div 
              key={i}
              className="absolute w-[10px] h-[10px] bg-[#0f380f]"
              style={{ left: `${part[0] * 10}px`, top: `${part[1] * 10}px` }}
            />
          ))}

          {/* Food Rendering */}
          <div 
            className="absolute w-[10px] h-[10px] bg-[#306230] animate-pulse"
            style={{ left: `${food[0] * 10}px`, top: `${food[1] * 10}px` }}
          />

          {/* Overlay Screens */}
          {(gameOver || isPaused) && (
            <div className="absolute inset-0 bg-[#9bbc0f]/80 flex flex-col items-center justify-center text-[#0f380f] font-bold z-10">
              {gameOver ? (
                <>
                  <div className="text-2xl mb-2">GAME OVER</div>
                  <div className="text-lg">SCORE: {score}</div>
                  <button 
                    onClick={resetGame}
                    className="mt-4 px-4 py-1 retro-border-outset bg-[#c0c0c0] text-black text-xs"
                  >
                    RETRY
                  </button>
                </>
              ) : (
                <>
                  <div className="text-xl mb-2 italic">PAUSED</div>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="px-4 py-1 retro-border-outset bg-[#c0c0c0] text-black text-xs"
                  >
                    START
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-[240px] flex justify-between items-center bg-black/10 p-2 retro-border-inset">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase text-gray-600 leading-none">High Score</span>
          <span className="text-lg font-bold text-[#0f380f]">002450</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase text-gray-600 leading-none">Score</span>
          <span className="text-lg font-bold text-[#0f380f]">{score.toString().padStart(6, '0')}</span>
        </div>
      </div>

      <div className="mt-4 text-[10px] uppercase text-gray-500 font-bold text-center">
        Use Arrow Keys or WASD to move<br/>
        Press Space to Pause
      </div>
    </div>
  );
};

export default SnakeApp;
