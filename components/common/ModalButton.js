import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

import { common } from "../../style/style";
import { appThemeColor } from "../../utils/appSetting";

export default function ModalButton({ idx, click, text }) {
  return (
    <TouchableHighlight
      underlayColor={appThemeColor.modalButtonClk}
      onPress={() => {
        click(idx);
      }}
      style={[
        common.round,
        {
          justifyContent: "center",
          padding: 10,
          borderColor: "#4c4c4c",
          borderWidth: 1,
        },
      ]}
    >
      <Text
        style={[
          common.text,
          { color: appThemeColor.text },
          { textAlign: "center" },
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({});
