import React, {useEffect, useState} from 'react';
import {AsyncStorage, Text, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    getUserDetail();
  }, []);
  const getUserDetail = async () => {
    const useData = AsyncStorage.getItem('users');
    if (useData) {
      setUserDetail(JSON.parse(useData));
    }
    navigation.navigate('LoginScreen');
  };
  const logout = () => {
    AsyncStorage.setItem('user', JSON.stringify({...userDetail, loggedIn: false}));
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>
      <Text st={{fontSize: 20, fontWeight: 'bold'}}>
        {' '}
        Welcome{userDetail?.fullname}
      </Text>
      <button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
