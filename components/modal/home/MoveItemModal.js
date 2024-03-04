import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ItemDAO from "../../../sqlite/item";
import { common } from "../../../style/style";
import { appLang, appThemeColor } from "../../../utils/appSetting";
import getFontSize from "../../../utils/getFontSize";

import ModalButton from "../../common/ModalButton";

export default function MoveItemModal({ item, folderId, folders, show }) {
  // Redux
  const dispatch = useDispatch();

  function move(idx) {
    let folder = folders[idx];

    if (folder.id !== folderId) {
      ItemDAO.moveFolder(item.id, folderId, folder.id, dispatch);
    }
    show(false);
  }

  return (
    <View style={[common.modalBg, { flexDirection: "row" }]}>
      <View
        style={[
          common.modal,
          { backgroundColor: appThemeColor.modal },
          { maxHeight: "50%" },
        ]}
      >
        <View style={[styles.fxr, { flexDirection: "row" }]}>
          <Text
            style={[
              common.text,
              { color: appThemeColor.text },
              { fontWeight: "bold" },
            ]}
          >
            {appLang == 0 ? "아이템 이동" : "Move Item"}
          </Text>
        </View>

        <ScrollView
          style={[
            styles.e,
            {
              paddingVertical: 10,
            },
          ]}
          contentContainerStyle={common.listGap}
        >
          {folders.map((folder, index) => (
            <ModalButton
              key={index}
              idx={index}
              click={move}
              text={folder.title}
            ></ModalButton>
          ))}
        </ScrollView>

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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
