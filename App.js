import React, { useEffect, useReducer, useState } from "react";
import type { Node } from "react";
import {
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';


const App: () => Node = () => {


  const [name, onChangeName] = useState("");
  const [agency, onChangeAgency] = useState("");
  const [identification, setIdentification] = useState("");
  //
  const [phoneNum, setPhoneNum] = useState("");
  const [codeVisible, setCodeVisible] = useState(false);
  const [openTextNum, setOpenTextNum] = useState("");
  //
  const [buttonEnable, setButtonEnable] = useState(false);
  const [buttonNext, setButtonNext] = useState(false);

  useEffect(() => {
    if (phoneNum != null && phoneNum.length >= "10") {
      setButtonEnable(true);
      Keyboard.dismiss();
    } else {
      setButtonEnable(false);
    }
  }, [phoneNum]);

  useEffect(() => {
    if (openTextNum != null && openTextNum.length >= "6") {
      Keyboard.dismiss();
      setButtonNext(true);
    } else {
      setButtonNext(false);
    }
  }, [openTextNum]);

  const checkTextInput = () => {
    if (!name.trim()) {
      alert("이름이 입력되지 않았습니다.");
      return;
    }
    if (!agency.trim()) {
      alert("통신사가 입력되지 않았습니다.");
      return;
    }
    if (!identification.trim()) {
      alert("주민등록번호가 입력되지 않았습니다.");
      return;
    }
    // if (codeVisible != null && codeVisible.length >= "6") {
    //   buttonNext(false);
    //   console.log(' checkTextInput codeVisible ')
    //   return;
    // }
    if (!phoneNum.trim()) {
      alert("휴대폰 번호가 입력되지 않았습니다. ");
      return;
    }
    if (!openTextNum.trim()) {
      alert("인증번호가 입력되지 않았습니다. ");
      return;
    }
    alert("등록되었습니다");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*이름*/}
      <Text style={styles.title}>이름</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="성함을 입력하세요"
        keypadType="{default}"
      />
      {/*통신사*/}
      <Text>통신사</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAgency}
        value={agency}
        placeholder="통신사"
      />
      {/*주민등록번호*/}
      <Text>주민등록번호</Text>
      <TextInput
        style={styles.input}
        value={identification}
        onChangeText={setIdentification}
        placeholder="주민등록번호"
        keyboardType={'numeric'}
      />
      {/*휴대폰 번호*/}
      <Text>휴대폰 번호</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.inputPhoneNumBox}>
          <View style={{ flex: 3 }}>
            <TextInput
              style={styles.inputPhoneNum}
              value={phoneNum}
              onChangeText={text => {
                setPhoneNum(text);
              }}
              placeholder="휴대폰 번호 11자리 입력하세요. "
              keyboardType={"numeric"}
              maxLength={11}
            />
          </View>
          <View style={styles.buttonPush}>
            <Button
              style={[styles.pushButton]}
              title={"요청"}
              disabled={!buttonEnable} //
              onPress={() => {
                console.log("--------button log------------");
                setCodeVisible(true);
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {codeVisible && (
        <TextInput
          style={styles.input}
          placeholder="요청된 번호 6자리를 적어주세요"
          maxLength={6}
          minLength={6}
          keyboardType="numeric"
          value={openTextNum}
          onChangeText={text => {
            console.log("요청된 6자리 input button");
            setOpenTextNum(text);
          }}
        />
      )}

      <View style={styles.btnViewNext}>
        <Button
          style={styles.btnNext}
          disabled={!buttonNext} //
          title={"다음"}
          // onPress= {() => {checkTextInput}}
          onPress={() => {
            checkTextInput();
            setButtonNext(true);
            console.log("다음 버튼 작동 => ");
          }}>
          {" "}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 5,
    marginBottom: 1,
  },
  input: {
    height: 54,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  inputPhoneNumBox: {
    height: 54,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  inputPhoneNum: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 4,
    fontSize: 10,
    padding: 0,
    margin: 0,
  },
  buttonPush: {
    height: "100%",
  },
  pushButton: {
    // color: phoneNum.length >= 5 ? 'red': 'blue',
    // // color={phoneNum.length >= 10 ? colors.MAIN_BG_01 : colors.TXT_04}
    // color: { phoneNum.length >= 10 ? colors.ACC_01 : colors.ACC_05 },
    // width: '100%',
    // height: 20,
    borderRadius: 10,
  },
  btnViewNext: {
    marginTop: "auto", // flex item에 margin-top: auto 속성을 적용하면 바깥 여백이 flex item을 위쪽에서 아래쪽으로 밀기 때문에 flex item이 아래쪽에 위치하게 된다.
  },
  btnNext: {
    width: "auto",
  },
});
export default App;
