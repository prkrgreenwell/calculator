import { useState } from "react";
import "./App.css";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [currFunction, setCurrFunction] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(0);

  const clearDisplay = () => {
    setDisplay("0");
    setCurrFunction(null);
    setCalculating(0);
  };

  const addNumber = (num: string) => {
    if (currFunction !== null) {
      setCalculating(Number(display));
      setDisplay(num);
      return;
    }

    if (display !== "Error") {
      if (display.length > 12) {
        setDisplay("Error");
        return;
      }

      if (display === "0") {
        setDisplay(num);
        return;
      }

      setDisplay(display + num);
      return;
    }
  };

  const changeSign = () => {
    display[0] === "-"
      ? setDisplay(display.slice(1))
      : display === "0"
      ? setDisplay("0")
      : setDisplay("-" + display);
  };

  const addDecimal = () => {
    if (display.includes(".")) return;
    setDisplay(display + ".");
  };

  const evaluate = () => {
    if (display === "Error") {
      clearDisplay();
      return;
    }

    let result;

    switch (currFunction) {
      case "+":
        result = calculating + Number(display);
        break;
      case "-":
        result = calculating - Number(display);
        break;
      case "×":
        result = calculating * Number(display);
        break;
      case "÷":
        if (display === "0") {
          setDisplay("Error");
          setCurrFunction(null);
          setCalculating(0);
          return;
        } else {
          result = calculating / Number(display);
        }
        break;
      case "^":
        result = Math.pow(calculating, Number(display));
        break;
      default:
        return;
    }

    // Set a limit for the result
    const resultLimit = 999999999999; // Adjust the limit as needed

    if (Math.abs(result) > resultLimit) {
      setDisplay("Error");
    } else {
      setDisplay(String(result));
    }

    setCurrFunction(null);
    setCalculating(0);
  };

  return (
    <>
      <div className="calculator">
        <div className="display-box">
          <div className="display">{display}</div>
          <div className="function">{currFunction}</div>
        </div>
        <div className="buttons">
          <div className="row">
            <button id="clear" onClick={clearDisplay}>
              AC
            </button>
            <button id="change-sign" onClick={changeSign}>
              +/-
            </button>
            <button className="function" onClick={() => setCurrFunction("^")}>
              ^
            </button>
            <button className="function" onClick={() => setCurrFunction("÷")}>
              ÷
            </button>
          </div>
          <div className="row">
            <button className="number" onClick={() => addNumber("7")}>
              7
            </button>
            <button className="number" onClick={() => addNumber("8")}>
              8
            </button>
            <button className="number" onClick={() => addNumber("9")}>
              9
            </button>
            <button onClick={() => setCurrFunction("×")}>×</button>
          </div>
          <div className="row">
            <button className="number" onClick={() => addNumber("4")}>
              4
            </button>
            <button className="number" onClick={() => addNumber("5")}>
              5
            </button>
            <button className="number" onClick={() => addNumber("6")}>
              6
            </button>
            <button onClick={() => setCurrFunction("-")}>-</button>
          </div>
          <div className="row">
            <button className="number" onClick={() => addNumber("1")}>
              1
            </button>
            <button className="number" onClick={() => addNumber("2")}>
              2
            </button>
            <button className="number" onClick={() => addNumber("3")}>
              3
            </button>
            <button onClick={() => setCurrFunction("+")}>+</button>
          </div>
          <div className="row">
            <button onClick={addDecimal}>.</button>
            <button className="number" onClick={() => addNumber("0")}>
              0
            </button>

            <button className="equals" onClick={evaluate}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
