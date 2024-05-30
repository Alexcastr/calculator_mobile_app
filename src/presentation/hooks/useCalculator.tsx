import {useState} from 'react';

export const useCalculator = () => {
  const [number, setNumber] = useState('0');

  function clean() {
    setNumber('0');
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

    setNumber( '-' + number );
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
  return {
    // properties
    number,
    // methods
    buildNumber,
    clean,
    deleteOperator,
    toggleSign,
  };
};
