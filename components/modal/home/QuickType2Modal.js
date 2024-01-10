import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import getFontSize from "../../../utils/getFontSize";

import { common } from "../../../style/style";
import { appLang, appThemeColor } from "../../../utils/appSetting";

import { showQuickType2Modal } from "../../../redux/slices/user";

import Toast from "react-native-root-toast";
import TextInputLine from "../../common/TextInputLine";

import * as HistoryDAO from "../../../sqlite/history";

export default function QuickType2Modal({}) {
  // Redux
  const dispatch = useDispatch();
  let item = useSelector((state) => state.user.quickItem);

  let [content, setcontent] = useState("");

  // ref
  const inputRef = useRef(null);

  function show(params) {
    dispatch(showQuickType2Modal(params));
  }

  function focusTextInput() {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  }

  focusTextInput();

  function add(content) {
    // 접두사 접미사 합성
    let combined = item.prefix + " " + content + " " + item.suffix;
    HistoryDAO.add(item.itemId, combined.trim(), dispatch);
    toast();
  }

  function toast() {
    // Add a Toast on screen.
    let toast = Toast.show(appLang == 0 ? "기록되었습니다" : "History saved", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      backgroundColor: "#222",
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  }

  return (
    <View style={[common.modalBg, { flexDirection: "row" }]}>
      <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
        <View style={[styles.fxr, { flexDirection: "row" }]}>
          <Text
            style={[
              common.text,
              { color: appThemeColor.text },
              { fontWeight: "bold" },
            ]}
          >
            {appLang == 0 ? "기록 추가" : "Add History"}
          </Text>
        </View>
        <View style={[styles.e, { marginVertical: 20 }]}>
          <TextInputLine
            placeholder={appLang == 0 ? "내용을 입력하세요" : "Enter a content"}
            value={content}
            set={setcontent}
            forRef={inputRef}
          ></TextInputLine>
        </View>

        <View
          style={[
            styles.fxr,
            { justifyContent: "flex-end", flexDirection: "row" },
          ]}
        >
          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              show(false);
            }}
          >
            <Text
              style={[
                common.text,
                { color: appThemeColor.text },
                { fontWeight: "bold", padding: getFontSize(10) },
              ]}
            >
              {appLang == 0 ? "닫기" : "Close"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              if (content.length > 0 && content.length <= 100) {
                add(content);
              }
              show(false);
            }}
          >
            <Text
              style={[
                common.text,
                { color: appThemeColor.text },
                { fontWeight: "bold", padding: getFontSize(10) },
              ]}
            >
              {appLang == 0 ? "추가" : "Add"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
