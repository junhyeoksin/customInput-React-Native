import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  Alert,
  Button,
} from 'react-native';

import colors from '../../conts/colors';
import Input from '../components/Input';
import GloablStyle from '../../theme/globalStyle';

const TransferLimit = () => {
  const [data, setData] = useState({
    oneDayLimitAmount: '0',
    oneCountLimitAmount: '0',
  });

  const [input, setInput] = useState({
    dayTransferLimit: '',
    transferLimit: '',
  });
  const [errors, setErrors] = useState({});

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  const handleOnChange = (text, input) => {
    setInput(prestate => ({
      ...prestate,
      [input]: text,
    }));
  };
  const [modalChange, setModelChange] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (input.dayTransferLimit.length > '5') {
      handleError('1일 이체한도 금액이 초과되었습니다. ', 'dayTransferLimit');
      valid = false;
    }
    if (input.transferLimit.length > '5') {
      handleError('1회 이체한도 금액이 초과되었습니다. ', 'transferLimit');
      valid = false;
    }
    if (input.transferLimit >= input.dayTransferLimit) {
      handleError(
        '1회 이체한도가 1일 이체한도보다 많습니다. 다시 입력해주세요 ',
        'transferLimit',
      );
      handleError(
        '1일 이체한도가 1회 이체한도보다 적습니다. 다시 입력해주세요',
        'dayTransferLimit',
      );
      valid = false;
    }
    if (input.dayTransferLimit === input.transferLimit) {
      handleError(
        '1일 이체한도와 1회 이체한도가 동일합니다. 다시 입력해주세요',
        'transferLimit',
      );
      handleError(
        '1일 이체한도와 1회 이체한도가 동일합니다. 다시 입력해주세요',
        'dayTransferLimit',
      );
      Alert.alert('', '금액이 동일합니다. 다시 입력해주세요. ');
      valid = false;
    }
    if (input.dayTransferLimit === '') {
      handleError('값을 입력해주세요', 'dayTransferLimit');
      valid = false;
    }
    if (input.transferLimit === '') {
      handleError('값을 입력해주세요 ', 'transferLimit');
      valid = false;
    }
    if (valid) {
      // Alert.alert('', '성공적으로 입력되었습니다. ');
      setModelChange(true);
      console.log(' 성공된 1회 이체한도 금액 값 ', input.transferLimit);
      console.log(' 성공된 1일 이체한도 금액 값 ', input.dayTransferLimit);
    }
  };

  const resultData = () => {
    let validateData = true;

    if (input.transferLimit > '100000') {
      console.log(' 증액되었습니다.  ');
      validateData = false;
    }
    if (input.transferLimit === '100000') {
      console.log(' 금액이 같습니다.  ');
      Alert.alert('', '금액이 같습니다. ');
      validateData = false;
    }
    if (input.dayTransferLimit < '500000') {
      console.log(' 감액되었습니다.  ');
      validateData = false;
    }
    if (input.dayTransferLimit === '500000') {
      Alert.alert('', '금액이 같습니다. ');
      validateData = false;
    }
    if (input.dayTransferLimit > '50000' && input.transferLimit > '10000') {
      console.log('혼합 증감되었습니다. ');
      validateData = true;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.BGLINE_02,
      }}>
      <ScrollView style={{paddingHorizontal: GloablStyle.padding.horizontal}}>
        <View
          style={{
            marginTop: 24,
          }}>
          <View>
            <Text style={{fontSize: 29, marginBottom: 30}}>
              {' '}
              이체한도 관리{' '}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.BGLINE_01,
              borderRadius: 6,
              flex: 1,
              marginBottom: 36,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.boxTextOne}>현재 1회 이체 한도</Text>
              <Text style={styles.boxTextOne}>
                {' '}
                {data.oneDayLimitAmount} 원
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.boxTextTwo}>현재 1일 이체 한도</Text>
              <Text style={styles.boxTextTwo}>
                {' '}
                {data.oneCountLimitAmount} 원
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.boxTextThree}>현재 보안매체</Text>
              <Text style={styles.boxTextThree}>mOTP</Text>
            </View>
          </View>
          {/**/}
          <View style={{marginBottom: 36}}>
            <View>
              <Input
                keyboardType="numeric"
                placeholder="변경 1일 이체한도"
                error={errors.dayTransferLimit}
                onFocus={() => {
                  handleError(null, 'dayTransferLimit');
                }}
                label="1일 이체한도"
                dayTransferLimit
                onChangeText={text => {
                  handleOnChange(text, 'dayTransferLimit');
                  console.log('1일 이체한도  값=> ', input.dayTransferLimit);
                }}
              />
              <View style={{flexDirection: 'row'}}>
                {/*<Image source={require('~/assets/icons/ico_Tip.png')} />*/}
                <Text
                  style={{
                    marginBottom: 18,
                    color: colors.TXT_03,
                    fontSize: 14,
                  }}>
                  {' '}
                  변경 1일 이체한도 : 5000만원 이하{' '}
                </Text>
              </View>
            </View>
            <View>
              <Input
                keyboardType="numeric"
                placeholder="변경 1회 이체한도"
                error={errors.transferLimit}
                onFocus={() => {
                  handleError(null, 'transferLimit');
                }}
                label="1회 이체한도"
                transferLimit
                onChangeText={text => {
                  handleOnChange(text, 'transferLimit');
                  console.log('1회 이체한도  값=> ', input.transferLimit);
                }}
              />
              <View style={{flexDirection: 'row'}}>
                {/*<Image source={require('~/assets/icons/ico_Tip.png')} />*/}
                <Text
                  style={{
                    marginBottom: 18,
                    color: colors.TXT_03,
                    fontSize: 14,
                  }}>
                  {' '}
                  변경 1회 이체한도 : 1000 만원 이하{' '}
                </Text>
              </View>
            </View>
          </View>
          {/**/}
          {/**/}
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              backgroundColor: colors.ACC_02,
            }}>
            <Text style={styles.securityText}> 보안매체별 이체한도</Text>
          </View>
          {/**/}
          {/*<View style={{ borderWidth: 2,  borderRadius: 4,}}>*/}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                paddingHorizontal: 18,
                fontSize: 19,
                fontFamily: GloablStyle.fontFamily.medium,
              }}>
              <Text style={styles.securityTextFont}>보안 매체 </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                paddingHorizontal: 18,
                fontSize: 19,
              }}>
              <Text style={styles.securityTextFont}>1회</Text>
            </View>
            <View
              style={{
                flex: 1,

                paddingTop: 20,
                paddingHorizontal: 18,
                fontSize: 19,
              }}>
              <Text style={styles.securityTextFont}>1일</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                paddingTop: 12,
                paddingHorizontal: 18,
                fontSize: 19,
                fontFamily: GloablStyle.fontFamily.medium,
              }}>
              <Text>OTP </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 12,
                paddingHorizontal: 18,
                fontSize: 19,
              }}>
              <Text>1억원</Text>
            </View>
            <View
              style={{
                flex: 1,

                paddingTop: 12,
                paddingHorizontal: 18,
                fontSize: 19,
              }}>
              <Text>5억원</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                paddingTop: 12,
                paddingHorizontal: 18,
                fontSize: 19,
                fontFamily: GloablStyle.fontFamily.medium,
              }}>
              <Text>mOTP </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 12,
                paddingHorizontal: 18,
                fontSize: 19,
              }}>
              <Text>1천만원</Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingTop: 12,
                paddingHorizontal: 18,
                fontSize: 19,
              }}>
              <Text>5천만원</Text>
            </View>
          </View>

          {/**/}
          <View style={{borderWidth: 1, borderColor: colors.ACC_02}} />
          {/**/}

          <View style={{flexDirection: 'row', paddingTop: 12}}>
            {/*<Image source={require('~/assets/icons/ico_Listdot.png')} />*/}
            <Text tyle={styles.textDetail}>
              이체한도 감액은 OTP/mOTP 인증과 공동인증서 인증 완료후 변경
              가능합니다.{' '}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', paddingTop: 12, paddingBottom: 36}}>
            {/*<Image source={require('~/assets/icons/ico_Listdot.png')} />*/}
            <Text tyle={styles.textDetail}>
              이체한도 증액은 휴대폰 인증과 신분증 인증,계좌 인증 완료 후 변경
              가능합니다.{' '}
            </Text>
          </View>
          {/*</View>*/}
          {/*  */}
        </View>
        {/*<TouchableOpacity*/}
        {/*    style={{*/}
        {/*        borderTopWidth: 1,*/}
        {/*        borderColor: colors.BGLINE_01,*/}
        {/*        alignItems: 'center',*/}
        {/*        paddingTop: 15,*/}
        {/*        paddingBottom: 45*/}
        {/*    }}*/}
        {/*    onpress={() => {*/}
        {/*        console.log('press')*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <Text style={{*/}
        {/*        color: colors.primary,*/}
        {/*        fontFamily: GloablStyle.fontFamily.medium,*/}
        {/*        fontSize: 21*/}
        {/*    }}>다음</Text>*/}
        {/*</TouchableOpacity>*/}

        <Button title="요청" onPress={validate} />
      </ScrollView>

      {/*<DialogPicker*/}
      {/*  // visible={}*/}
      {/*  visible={modalChange}*/}
      {/*  ContentComponent={() => (*/}
      {/*    <View style={{paddingHorizontal: 32}}>*/}
      {/*      <View*/}
      {/*        style={{alignItems: 'center', marginTop: 44, marginBottom: 16}}>*/}
      {/*        <Text*/}
      {/*          style={{*/}
      {/*            fontSize: 16,*/}
      {/*            letterSpacing: -0.5,*/}
      {/*            textAlign: 'center',*/}
      {/*            fontFamily: GloablStyle.fontFamily.medium,*/}
      {/*          }}>*/}
      {/*          {true ? '증액' : true ? '혼합' : '감액'}*/}
      {/*          <Text*/}
      {/*            style={{*/}
      {/*              fontFamily: GloablStyle.fontFamily.medium,*/}
      {/*              color: colors.ACC_01,*/}
      {/*            }}>*/}
      {/*            {' '}*/}
      {/*            입니다.*/}
      {/*          </Text>*/}
      {/*        </Text>*/}
      {/*      </View>*/}
      {/*      <Divider width={6} color={colors.primary} />*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontSize: 16,*/}
      {/*          letterSpacing: -0.5,*/}
      {/*          textAlign: 'center',*/}
      {/*          fontFamily: GloablStyle.fontFamily.medium,*/}
      {/*        }}>*/}
      {/*        {}*/}
      {/*      </Text>*/}

      {/*      <View*/}
      {/*        style={{*/}
      {/*          borderWidth: 2,*/}
      {/*          marginTop: 20,*/}
      {/*          borderColor: colors.BGLINE_01,*/}
      {/*          borderRadius: 6,*/}
      {/*          paddingTop: 24,*/}
      {/*          paddingBottom: 24,*/}
      {/*        }}>*/}
      {/*        <View*/}
      {/*          style={{*/}
      {/*            flexDirection: 'row',*/}
      {/*            marginBottom: 10,*/}
      {/*            paddingHorizontal: 18,*/}
      {/*          }}>*/}
      {/*          <View style={{flex: 1}}>*/}
      {/*            <Text> 1일 즉시 이체 한도</Text>*/}
      {/*          </View>*/}
      {/*          <View style={{flex: 1}}>*/}
      {/*            <Text> {input.dayTransferLimit}</Text>*/}
      {/*          </View>*/}
      {/*        </View>*/}
      {/*        <View*/}
      {/*          style={{*/}
      {/*            flexDirection: 'row',*/}
      {/*            marginBottom: 10,*/}
      {/*            paddingHorizontal: 18,*/}
      {/*          }}>*/}
      {/*          <View style={{flex: 1}}>*/}
      {/*            <Text> 1회 즉시 이체 한도</Text>*/}
      {/*          </View>*/}
      {/*          <View style={{flex: 1}}>*/}
      {/*            <Text> {input.transferLimit} 원 </Text>*/}
      {/*          </View>*/}
      {/*        </View>*/}
      {/*      </View>*/}

      {/*      <View style={{flexDirection: 'row', marginTop: 24}}>*/}
      {/*        <TouchableOpacity*/}
      {/*          style={{*/}
      {/*            flex: 1,*/}
      {/*            backgroundColor: colors.secondary,*/}
      {/*            borderTopWidth: 1,*/}
      {/*            borderColor: colors.BGLINE_01,*/}
      {/*            alignItems: 'center',*/}
      {/*            paddingTop: 15,*/}
      {/*            paddingBottom: 45,*/}
      {/*            flexDirection: 'row',*/}
      {/*            justifyContent: 'center',*/}
      {/*            paddingHorizontal: 30,*/}
      {/*          }}>*/}
      {/*          <Text*/}
      {/*            style={{*/}
      {/*              color: colors.background,*/}
      {/*              fontFamily: GloablStyle.fontFamily.medium,*/}
      {/*              fontSize: 21,*/}
      {/*              textAlign: 'center',*/}
      {/*            }}>*/}
      {/*            취소*/}
      {/*          </Text>*/}
      {/*        </TouchableOpacity>*/}
      {/*        <View style={{width: 15}} />*/}
      {/*        <TouchableOpacity*/}
      {/*          style={{*/}
      {/*            flex: 1,*/}
      {/*            backgroundColor: colors.primary,*/}
      {/*            borderTopWidth: 1,*/}
      {/*            borderColor: colors.BGLINE_01,*/}
      {/*            alignItems: 'center',*/}
      {/*            paddingTop: 15,*/}
      {/*            paddingBottom: 45,*/}
      {/*            flexDirection: 'row',*/}
      {/*            justifyContent: 'center',*/}
      {/*            paddingHorizontal: 30,*/}
      {/*          }}>*/}
      {/*          <Text*/}
      {/*            style={{*/}
      {/*              color: colors.background,*/}
      {/*              fontFamily: GloablStyle.fontFamily.medium,*/}
      {/*              fontSize: 21,*/}

      {/*              textAlign: 'center',*/}
      {/*            }}>*/}
      {/*            가입*/}
      {/*          </Text>*/}
      {/*        </TouchableOpacity>*/}
      {/*      </View>*/}
      {/*      /!*    *!/*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

export default TransferLimit;

const styles = StyleSheet.create({
  boxTextOne: {
    paddingTop: 20,
    paddingHorizontal: 18,
  },
  boxTextTwo: {
    paddingTop: 10,
    paddingHorizontal: 18,
  },
  boxTextThree: {
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 18,
  },
  securityText: {
    color: colors.background,
    fontFamily: GloablStyle.fontFamily.medium,
    fontSize: 17,
  },
  buttonPush: {
    height: '100%',
    width: '100%',
  },
  securityTextFont: {
    color: colors.ACC_02,
  },
  textDetail: {
    fontSize: 14,
    fontFamily: GloablStyle.fontFamily.regular,
  },
  fixToText: {
    justifyContent: 'space-between',
  },
});
