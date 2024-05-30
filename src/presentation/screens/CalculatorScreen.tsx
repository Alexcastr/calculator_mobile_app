import {View, Text} from 'react-native';
import {colors, styles} from '../config/theme/app-theme';
import {CalculatorButton} from '../components/CalculatorButton';
import {useCalculator} from '../hooks/useCalculator';

export default function CalculatorScreen() {
  const {
    number,
    formula,
    prevNumber,
    buildNumber,
    toggleSign,
    clean,
    deleteOperator,
    addOperator,
    divideOperator,
    multiplyOperator,
    subtractOperator,
    calculatorResult,
  } = useCalculator();
  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.mainResult}>
          {formula}
        </Text>
        {
          ( formula === prevNumber )
            ? <Text style={ styles.subResult }> </Text>
            : (
              <Text
                adjustsFontSizeToFit
                numberOfLines={ 1 }
                style={ styles.subResult }>
                {  prevNumber }
              </Text>
            )
        }
      </View>

      <View style={styles.row}>
        <CalculatorButton
          onPress={clean}
          label="C"
          blackText={true}
          color={colors.lightGray}
        />
        <CalculatorButton
          onPress={toggleSign}
          label="+/-"
          blackText={true}
          color={colors.lightGray}
        />
        <CalculatorButton
          onPress={deleteOperator}
          label="del"
          blackText={true}
          color={colors.lightGray}
        />
        <CalculatorButton
          onPress={divideOperator}
          label="÷"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => buildNumber('7')} label="7" />
        <CalculatorButton onPress={() => buildNumber('8')} label="8" />
        <CalculatorButton onPress={() => buildNumber('9')} label="9" />
        <CalculatorButton
          onPress={multiplyOperator}
          label="x"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => buildNumber('4')} label="4" />
        <CalculatorButton onPress={() => buildNumber('5')} label="5" />
        <CalculatorButton onPress={() => buildNumber('6')} label="6" />
        <CalculatorButton
          onPress={subtractOperator}
          label="-"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => buildNumber('1')} label="1" />
        <CalculatorButton onPress={() => buildNumber('2')} label="2" />
        <CalculatorButton onPress={() => buildNumber('3')} label="3" />
        <CalculatorButton
          onPress={addOperator}
          label="+"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton
          onPress={() => buildNumber('0')}
          label="0"
          doubleSize={true}
        />
        <CalculatorButton onPress={() => buildNumber('.')} label="." />
        <CalculatorButton
          onPress={calculatorResult}
          label="="
          color={colors.orange}
        />
      </View>
    </View>
  );
}
