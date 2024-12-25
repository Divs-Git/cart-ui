import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from './theme';

type buttonProps = {
  id: number;
  buttonText: string;
  buttonType: string;
  handleButtonClick: (type: string, quantity: number) => void;
};

export default function Button({
  id,
  buttonText,
  buttonType,
  handleButtonClick,
}: buttonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonType === 'remove'
          ? { backgroundColor: theme.lightRed }
          : { backgroundColor: theme.lightblue },
      ]}
      onPress={() => handleButtonClick(buttonType, id)}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
