import { Button, Text, View } from "react-native";
import React from 'react';

const student = ({name}) => {
  return (
    <>
      <Text> {name}</Text>
      <Button title={'삭제'}/>
    </>
  );
};
export default student;
