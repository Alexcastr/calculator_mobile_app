import {Pressable, Text} from 'react-native';
import { colors, styles } from '../config/theme/app-theme';

interface Props {
  label: string
  color?: string
  doubleSize?: boolean
  blackText?: boolean
}

export const CalculatorButton = ({label, blackText=false, doubleSize=false, color=colors.darkGray}: Props) => {
  return (
    <Pressable style={({pressed})=> ({
      ...styles.button,
      width: doubleSize ? 180 : 80,
      opacity: pressed ? 0.8 : 1,
      backgroundColor: color,
      
    })}>
      <Text style={{
        ...styles.bottonText,
        color: blackText ? "black" : colors.textPrimary
      }}>{label}</Text>
    </Pressable>
  );
};
