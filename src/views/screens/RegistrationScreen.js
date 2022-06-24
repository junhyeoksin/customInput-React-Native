import React, {useState} from 'react';
import {
  Alert,
  AsyncStorage,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import COLORS from '../../conts/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const RegistrationScreen = ({navigation}) => {
  const [inputs, setInput] = useState({
    email: '',
    fullname: '',
    phone: '',
    Password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    // email
    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input valid email', 'email');
      valid = false;
    }
    // fullname
    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      valid = false;
    }
    if (!inputs.phone) {
      handleError('Please input phone', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('Please input length of 5', 'password');
      valid = false;
    }
    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 3000);
  };
  const handleOnChange = (text, input) => {
    setInput(prevState => ({
      ...prevState,
      [input]: text,
    }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 5,
          paddingHorizontal: 20,
        }}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Register
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            placeholder="Enter your email address"
            iconName="email-outline"
            label="Email"
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={text => handleOnChange(text, 'email')}
            // error="Input email"
          />
          <Input
            placeholder="Enter your fullname"
            iconName="account-outline"
            label="Fullname"
            error={errors.fullname}
            onFocus={() => {
              handleError(null, 'fullname');
            }}
            onChangeText={text => handleOnChange(text, 'fullname')}
          />
          <Input
            keyboardType="numeric"
            placeholder="Enter phone number"
            iconName="phone-outline"
            label="phone number"
            error={errors.phone}
            onFocus={() => {
              handleError(null, 'phone');
            }}
            onChangeText={text => handleOnChange(text, 'phone')}
          />
          <Input
            placeholder="Enter your password"
            iconName="lock-outline"
            label="Password"
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={text => handleOnChange(text, 'password')}
            password
          />
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Already have account ? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
