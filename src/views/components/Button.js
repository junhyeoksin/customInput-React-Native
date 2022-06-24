import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import COLORS from '../../conts/colors';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7} //깜빡임을 조절
      onPress={onPress}
      style={styles.btnStyle}>
      <Text style={styles.textStyle}>
        REGISTER
        {/*{title}*/}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: {
    height: 55,
    width: '100%',
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
