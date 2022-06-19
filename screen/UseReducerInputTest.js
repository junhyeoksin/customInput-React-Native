import React, { useReducer, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Student from "./Student";

const reducer = (state, action) => {
};

const initialState = {
  count: 0,
  students: [
    {
      id: Date.now(),
      name: 'jun',
      isHereP: false,
    },
  ],
};


const UseReducerInputTest = () => {

  const [name, setName] = useState('');
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <View>
      <Text> 출석부</Text>
      <Text> 총 학생수 : {studentsInfo.count} </Text>

      {/*<View>*/}
      {/*  <TextInput*/}
      {/*    placeholder="주민등록번호"*/}
      {/*    style={styles.input}*/}
      {/*  />*/}
      {/*  <Button  title={'추가'}/>*/}

      {/*</View>*/}

      <View style={styles.inputPhoneNumBox}>
        <View style={{flex: 3}}>
          <TextInput
            style={styles.inputPhoneNum}

            placeholder="휴대폰 번호 11자리 입력하세요. "
            keyboardType={'numeric'}
            maxLength={11}
          />
        </View>
        <View style={styles.buttonPush}>
          <Button
            style={[styles.pushButton]}
            title={'요청'}
            onPress={() => {
              console.log('--------button log------------');
            }}
          />
        </View>
      </View>
      {studentsInfo.students.map(student => {
        return (<Student name={student.name}/>)
      })}
    </View>
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


export default UseReducerInputTest;
