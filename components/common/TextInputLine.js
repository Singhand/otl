import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { common } from "../../style/style";
import { appThemeColor } from "../../utils/appSetting";

export default function TextInputLine({ placeholder, value, set, forRef }) {
  const [focus, setFocus] = useState(false);

  return (
    <View>
      <TextInput
        style={[common.text, { color: appThemeColor.text }, common.normal, {}]}
        value={value}
        placeholder={placeholder}
        onChangeText={set}
        placeholderTextColor={"gray"}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        ref={forRef}
      ></TextInput>
      {focus && (
        <View
          style={[
            styles.e,
            { height: 1, backgroundColor: appThemeColor.inputFocus },
          ]}
        ></View>
      )}
      {!focus && (
        <View
          style={[
            styles.e,
            { height: 1, backgroundColor: appThemeColor.inputBlur },
          ]}
        ></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
