import {useEffect, useRef, useState} from 'react';


enum Operator{
  add = "+",
  subtract = "-",
  multiply = "*",
  divide = "÷",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState<string>(''); // to store the formula [prevNumber, operator, number
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>(); // to store the last operation

  useEffect(() => {
    if(lastOperation.current){
      const firstFormulaPart = formula.split(" ").at(0); 
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(`${number}`);
    }

  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
   
  },[formula]  );

  function clean() {
    setNumber('0');
    setPrevNumber("0")
    lastOperation.current = undefined;
    setFormula("");
  }

  function deleteOperator() {
    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1); // quitar el signo
    }

    if ( temporalNumber.length > 1 ) {
      return setNumber( currentSign + temporalNumber.slice( 0, -1 ) ); // 
    }

    setNumber('0');
  }

  const toggleSign = () => {
    if ( number.includes( '-' ) ) {
      return setNumber( number.replace( '-', '' ) );
    }

    setNumber( '-' + number ); // add or remove the "-" sign
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;
    setNumber(number + numberString);

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal(0.)
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      // Evaluar si es diferente de cero y no tiene punto decimal (0.1)

      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }
      // Evaluar si es diferente de cero y no tiene punto decimal(1) quitar el 0

      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      // Evitar el 0000.0
      if (numberString === '0' && !number.includes('.')) {
        return 
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  function setLastNumber() {
    calculatorResult();
    // cortar el puntico para que no haya problemas con el parse
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1)); // remove the last character
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  }

  function divideOperator() {
    setLastNumber();
    lastOperation.current = Operator.divide;
  }
  function multiplyOperator() {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  }
  function subtractOperator() {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  }
  function addOperator() {
    setLastNumber();
    lastOperation.current = Operator.add;
  }

  function calculatorResult(){
    const result = calculateSubResult();
    setFormula(`${result}`)
    lastOperation.current = undefined;
    setPrevNumber('0');

    setPrevNumber('0');
  }

  function calculateSubResult(): number {
    const [firstValue, operation, secondValue] = formula.split(' ');
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;
    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
        case Operator.divide:
          return num1 / num2;
  
        default:
          throw new Error( 'Operation not implemented' );
    }
  }
  return {
    // properties
    number,
    prevNumber,
    formula,
    // methods
    buildNumber,
    clean,
    deleteOperator,
    toggleSign,
    multiplyOperator,
    divideOperator,
    subtractOperator,
    addOperator,
    calculatorResult
  };
};
