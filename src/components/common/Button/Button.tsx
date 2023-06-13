import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export const Button = ({ onPress, text, size, theme, disabled = false }: { onPress: () => void, text?: string, size?: number, theme?: string, disabled?: boolean }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];
  if (text === 'C') {
    // @ts-ignore
    buttonStyles.push(styles.buttonSecondary);
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyles}>
        <FontAwesome5 name="backspace" size={24} color="black" />
      </TouchableOpacity>
    )
  }
  if (text === '=') {
    // @ts-ignore
    buttonStyles.push(styles.buttonPrimary);
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyles}>
        <AntDesign name="enter" size={24} color="black" />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonWidth - 25),
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  buttonSecondary: {
    backgroundColor: "#a6a6a6",
  },
  buttonPrimary: {
    backgroundColor: 'orange'
  }

});
