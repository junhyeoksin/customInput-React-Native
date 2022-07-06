import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import colors from '../../conts/colors';

const TransferLimitCustomInput = ({
  label,
  error,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{marginBottom: 6}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.ACC_02
              : colors.TXT_04,
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(false);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: 'darkBlue', flex: 1}}
          {...props}
        />
      </View>
      {error && (
        <Text style={{color: colors.error, fontSize: 12, marginTop: 7}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default TransferLimitCustomInput;

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: colors.TXT_03,
  },
  inputContainer: {
    height: 54,
    borderColor: colors.BGLINE_01,
    flexDirection: 'row',
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
  },
});
