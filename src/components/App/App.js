import { useState } from "react";
import Button from "../Button/Button";
import { sliceNumber } from "../../utils/string.utils.js";
import styles from "./App.module.css";

const OPERATORS = {
  div: "÷",
  multi: "×",
  sub: "−",
  sum: "+",
  equal: "=",
};

const App = () => {
  const [firstOperand, setFirstOperand] = useState();
  const [secondOperand, setSecondOperand] = useState();

  const [operator, setOperator] = useState("");
  const [total, setTotal] = useState();

  const resultToDisplay =
    operator && secondOperand !== undefined ? secondOperand : firstOperand;

  const handleClickNumber = (number) => {
    if (operator) {
      setSecondOperand((prev) => +((prev || 0) + number));
    } else {
      if (total) {
        setFirstOperand();
        setTotal();
      }
      setFirstOperand((prev) => +((prev || 0) + number));
    }
  };

  const handleChangeOperator = (operator) => {
    const result = calculateResult();

    if (operator === OPERATORS.equal) {
      setFirstOperand(result);
      setSecondOperand();
      setOperator("");
    } else {
      setOperator(operator);
      if (secondOperand) {
        const result = calculateResult();

        setFirstOperand(result);
        setSecondOperand();
      }
    }

    setTotal(result);
  };

  const handleClear = () => {
    setFirstOperand();
    setSecondOperand();
    setOperator("");
    setTotal();
  };

  const calculateResult = () => {
    const firOperand = firstOperand || 0;
    const secOperand = secondOperand ?? firOperand;
    switch (operator) {
      case OPERATORS.div:
        return firOperand / secOperand;
      case OPERATORS.multi:
        return firOperand * secOperand;
      case OPERATORS.sub:
        return firOperand - secOperand;
      case OPERATORS.sum:
        return firOperand + secOperand;
      default:
        return firOperand;
    }
  };

  console.log(firstOperand, secondOperand);

  return (
    <div className={styles.wrapper}>
      <div className={styles.display}>
        <p className={styles.expression}>{`${
          total !== undefined && operator ? sliceNumber(total) : ""
        } ${operator}`}</p>
        <p className={styles.result}>{sliceNumber(resultToDisplay)}</p>
      </div>
      <div className={styles.btnsContainer}>
        <div className={styles.mainBtns}>
          <Button className={styles.button} theme="dark" onClick={handleClear}>
            AC
          </Button>
          {Array(10)
            .fill(" ")
            .map((_, number, arr) => {
              const value = (arr.length - 1 - number).toString();
              return (
                <Button
                  key={value}
                  className={styles.button}
                  onClick={() => handleClickNumber(value)}
                  disabled={value === "0" && operator === OPERATORS.div}
                >
                  {value}
                </Button>
              );
            })}
        </div>
        <div className={styles.operatorBtns}>
          {Object.values(OPERATORS).map((operator) => (
            <Button
              key={operator}
              className={styles.button}
              theme="orange"
              onClick={() => handleChangeOperator(operator)}
            >
              {operator}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
