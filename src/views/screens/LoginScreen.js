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
    }
    if (!inputs.password) {
      valid = false;
      handleError('Please input password', 'password');
    }
    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let useData = await AsyncStorage.getItem('user');
      if (useData) {
        useData = JSON.parse(useData);
        if (
          inputs.email == useData.email &&
          inputs.password == useData.password
        ) {
           AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...useData, loggedIn: true }),
          );
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exist');
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
          Login
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter your Details to Login
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
          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Dont have an account ? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
