import React, { useState, useEffect, useRef } from "react";
import "./game.css";

const Game = () => {
  const [n, setN] = useState();
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [squarePosition, setSquarePosition] = useState({
    x: Math.floor(Math.random() * n),
    y: Math.floor(Math.random() * n),
  });
  const [keyStrokes, setKeyStrokes] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const newCirclePosition = { ...circlePosition };
      switch (e.key) {
        case "ArrowUp":
          if (newCirclePosition.y > 0) newCirclePosition.y--;
          break;
        case "ArrowDown":
          if (newCirclePosition.y < n - 1) newCirclePosition.y++;
          break;
        case "ArrowLeft":
          if (newCirclePosition.x > 0) newCirclePosition.x--;
          break;
        case "ArrowRight":
          if (newCirclePosition.x < n - 1) newCirclePosition.x++;
          break;
        default:
          break;
      }
      setKeyStrokes(keyStrokes + 1);
      setCirclePosition(newCirclePosition);

      if (
        newCirclePosition.x === squarePosition.x &&
        newCirclePosition.y === squarePosition.y
      ) {
        setSquarePosition({
          x: Math.floor(Math.random() * n),
          y: Math.floor(Math.random() * n),
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [circlePosition, squarePosition, n, keyStrokes]);

  const handleInputChange = () => {
    const newValue = parseInt(inputRef.current.value, 10);
    if (!isNaN(newValue)) {
      setN(newValue);
      setSquarePosition({
        x: Math.floor(Math.random() * newValue),
        y: Math.floor(Math.random() * newValue),
      });
    }
  };

  return (
    <div className="game-container">
      <div className="key-strokes">Total Key Strokes: {keyStrokes}</div>
      <div className="game-settings">
        <label>
          Enter Grid number:{" "}
          <input
            type="number"
            value={n}
            ref={inputRef}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="game-board">
        <table>
          <tbody>
            {Array.from({ length: n }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: n }).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`cell ${
                      rowIndex === circlePosition.y &&
                      colIndex === circlePosition.x
                        ? "circle"
                        : rowIndex === squarePosition.y &&
                          colIndex === squarePosition.x
                        ? "square"
                        : ""
                    }`}
                  >
                    {/* Render the grid cell */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Game;
