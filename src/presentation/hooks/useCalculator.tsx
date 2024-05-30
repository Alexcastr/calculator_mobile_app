import {useRef, useState} from 'react';


enum Operator{
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>(); // to store the last operation

  function clean() {
    setNumber('0');
    setPrevNumber("0")
  }

  function deleteOperator() {
    let currentSign = '';
    let temporalNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1); // quitar el signo
    }

    if (temporalNumber.length > 1) {
      return setNumber(
        currentSign + temporalNumber.substring(0, temporalNumber.length - 1),
      ); // quitar el ultimo caracter
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
        return setNumber(number);
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  function setLastNumber() {
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
    const num1 = Number(number);
    const num2 = Number(prevNumber);
    switch (lastOperation.current) {

      case Operator.add:
         setNumber(`${num1 + num2}`);
        break;
      case Operator.subtract:
        setNumber(`${num2 - num1}`);
        break;
      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operator.divide:
        if (num1 === 0) {
          setNumber('Error');
        } else {
          setNumber(`${num2 / num1}`);
        }
        break;

      default:
        throw new Error('Operation not implemented');
    }

    setPrevNumber('0');
  }
  return {
    // properties
    number,
    prevNumber,
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
