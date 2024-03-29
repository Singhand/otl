import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import getFontSize from "../../../utils/getFontSize";

import * as ItemDAO from "../../../sqlite/item";

import TextInputLine from "../../common/TextInputLine";

import { common } from "../../../style/style";
import { appLang, appThemeColor } from "../../../utils/appSetting";

export default function EditItemModal({
  item,
  folderId,
  itemIdx,
  show,
  showMove,
}) {
  // Redux
  const dispatch = useDispatch();
  let items = useSelector((state) => state.item.items[`${folderId}`]);

  let [title, setTitle] = useState(item.title);

  function edit(param) {
    ItemDAO.edit(items[itemIdx].id, title, folderId, dispatch);
  }

  function remove() {
    Alert.alert(
      appLang == 0 ? "아이템 삭제" : "Delete Item",
      appLang == 0
        ? "아이템을 삭제하면 기록들이 모두 삭제됩니다."
        : "All Histories in the item are deleted.",
      [
        {
          text: appLang == 0 ? "취소" : "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: appLang == 0 ? "삭제" : "Delete",
          onPress: () => {
            console.log("OK Pressed");
            ItemDAO.remove(items[itemIdx].id, folderId, dispatch);
            show(false);
          },
          style: "destructive",
        },
      ]
    );
  }

  function move(parameter) {
    let itemsTemp = [...items];

    if (itemIdx < 0 || itemIdx >= itemsTemp.length) {
      console.log("itemIdx is out of bounds.");
      return itemsTemp; // Return the original array unchanged
    }

    switch (parameter) {
      case 1: // Move item to the left once
        if (itemIdx > 0) {
          const temp = itemsTemp[itemIdx];
          itemsTemp[itemIdx] = itemsTemp[itemIdx - 1];
          itemsTemp[itemIdx - 1] = temp;
        }
        break;

      case 2: // Move item to first
        if (itemIdx > 0) {
          const temp = itemsTemp[itemIdx];
          itemsTemp.splice(itemIdx, 1); // Remove element at itemIdx
          itemsTemp.unshift(temp); // Add element to the beginning
        }
        break;

      case 3: // Move item to the right once
        if (itemIdx < itemsTemp.length - 1) {
          const temp = itemsTemp[itemIdx];
          itemsTemp[itemIdx] = itemsTemp[itemIdx + 1];
          itemsTemp[itemIdx + 1] = temp;
        }
        break;

      case 4: // Move item to last
        if (itemIdx < itemsTemp.length - 1) {
          const temp = itemsTemp[itemIdx];
          itemsTemp.splice(itemIdx, 1); // Remove element at itemIdx
          itemsTemp.push(temp); // Add element to the end
        }
        break;

      default:
        console.log("Invalid parameter. Please use 1, 2, 3, or 4.");
        break;
    }

    ItemDAO.updateOrder(itemsTemp, folderId, dispatch);
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
            {appLang == 0 ? "아이템 수정" : "Edit Item"}
          </Text>
        </View>
        <View style={[styles.e, { marginVertical: 20 }]}>
          <TextInputLine
            placeholder={appLang == 0 ? "이름을 입력하세요" : "Enter a title"}
            value={title}
            set={setTitle}
          ></TextInputLine>
        </View>

        <View
          style={[
            styles.fxr,
            {
              justifyContent: "flex-end",
              flexDirection: "row",
              flexWrap: "wrap",
            },
          ]}
        >
          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              move(2);
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
              {appLang == 0 ? "맨 앞" : "Move Start"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              move(4);
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
              {appLang == 0 ? "맨 뒤" : "Move End"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              move(1);
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
              {appLang == 0 ? "위로" : "Move Up"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              move(3);
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
              {appLang == 0 ? "아래로" : "Move Down"}
            </Text>
          </TouchableHighlight>
        </View>

        <View
          style={[
            styles.fxr,
            {
              justifyContent: "flex-end",
              flexDirection: "row",
              flexWrap: "wrap",
            },
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
              remove();
            }}
          >
            <Text
              style={[
                common.text,
                { color: appThemeColor.text },
                { fontWeight: "bold", padding: getFontSize(10) },
              ]}
            >
              {appLang == 0 ? "삭제" : "Delete"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              showMove(true);
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
              {appLang == 0 ? "폴더 이동" : "Move Folder"}
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.modalButtonClk}
            onPress={() => {
              if (title.length > 0 && title.length <= 100) {
                edit();
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
              {appLang == 0 ? "수정" : "Edit"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
