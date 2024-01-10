import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { common, colors } from "../../../style/style";
import { appThemeColor, appLang } from "../../../utils/appSetting";
import getFontSize from "../../../utils/getFontSize";

import ModalButton from "../../common/ModalButton";
import TextInputLine from "../../common/TextInputLine";

import * as QuickDAO from "../../../sqlite/quick";

export default function AddQuickModal({ show, click, itemId }) {
  // Redux
  const dispatch = useDispatch();

  // state
  const [showPage, setShowPage] = useState(0); // 선택 타입
  const [type1title, setType1title] = useState("");
  const [type2title, setType2title] = useState("");
  const [type2prefix, setType2prefix] = useState("");
  const [type2suffix, setType2suffix] = useState("");

  function add() {
    let quickAdd = {
      itemId,
      prefix: "",
      suffix: "",
    };

    if (showPage == 1) {
      if (type1title.length > 0 && type1title.length <= 100) {
        quickAdd["title"] = type1title;
        quickAdd["type"] = 1;
        QuickDAO.add(quickAdd, dispatch);
      }
    } else if (showPage == 2) {
      if (
        type2title.length > 0 &&
        type2title.length <= 100 &&
        type2prefix.length >= 0 &&
        type2prefix.length <= 100 &&
        type2suffix.length >= 0 &&
        type2suffix.length <= 100
      ) {
        quickAdd["title"] = type2title;
        quickAdd["prefix"] = type2prefix;
        quickAdd["suffix"] = type2suffix;
        quickAdd["type"] = 2;
        QuickDAO.add(quickAdd, dispatch);
      }
    }
  }

  return (
    <View style={[common.modalBg, { flexDirection: "row" }]}>
      <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
        <View style={[styles.fxr, { flexDirection: "row", marginBottom: 10 }]}>
          <Text
            style={[
              common.text,
              { color: appThemeColor.text },
              { fontWeight: "bold" },
            ]}
          >
            {appLang == 0 ? "빠른 기록 추가" : "Add Quick Action"}
          </Text>
        </View>

        {showPage == 0 && (
          <View>
            <ModalButton
              text={appLang == 0 ? "고정 텍스트" : "Fixed Text"}
              idx={1}
              click={setShowPage}
            >
              {" "}
            </ModalButton>
            <View style={[styles.w, { height: 10 }]}></View>
            <ModalButton
              text={appLang == 0 ? "직접 입력" : "Manual Input"}
              idx={2}
              click={setShowPage}
            >
              {" "}
            </ModalButton>
          </View>
        )}

        {showPage == 1 && (
          <View>
            <TextInputLine
              value={type1title}
              set={setType1title}
              placeholder={
                appLang == 0 ? "고정 텍스트를 입력하세요" : "Enter a fixed text"
              }
            ></TextInputLine>
          </View>
        )}

        {showPage == 2 && (
          <View style={[styles.e, { gap: 10 }]}>
            <TextInputLine
              value={type2title}
              set={setType2title}
              placeholder={
                appLang == 0
                  ? "표시될 이름을 입력하세요"
                  : "Enter a title of quick action"
              }
            ></TextInputLine>
            <TextInputLine
              value={type2prefix}
              set={setType2prefix}
              placeholder={
                appLang == 0
                  ? "접두사를 입력하세요 (미입력 가능)"
                  : "Enter a prefix (It is ok to not type)"
              }
            ></TextInputLine>
            <TextInputLine
              value={type2suffix}
              set={setType2suffix}
              placeholder={
                appLang == 0
                  ? "접미사를 입력하세요 (미입력 가능)"
                  : "Enter a suffix (It is ok to not type)"
              }
            ></TextInputLine>
          </View>
        )}

        <View
          style={[
            styles.fxr,
            { justifyContent: "flex-end", flexDirection: "row", marginTop: 10 },
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

          {showPage != 0 && (
            <TouchableHighlight
              underlayColor={appThemeColor.modalButtonClk}
              onPress={() => {
                add();
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
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
