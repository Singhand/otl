import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { common } from "../../../style/style";
import { appThemeColor } from "../../../utils/appSetting";

export default function History({ item, idx, showEdit }) {
  let date = new Date(item.created);
  const time = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(
    2,
    "0"
  )}`;
  return (
    <TouchableHighlight
      underlayColor={appThemeColor.buttonClk}
      onPress={() => {
        showEdit(item);
      }}
    >
      <View>
        <View style={[common.fxr, { paddingVertical: 10 }]}>
          <Text
            style={[common.text, { color: appThemeColor.text }, { flex: 1 }]}
            numberOfLines={1}
          >
            {item.content}
          </Text>
          <Text
            style={[
              common.text,
              { color: appThemeColor.text },
              { color: "gray" },
            ]}
            numberOfLines={1}
          >
            {time}
          </Text>
        </View>
        <View
          style={[styles.e, { height: 1, backgroundColor: "#323232" }]}
        ></View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({});
