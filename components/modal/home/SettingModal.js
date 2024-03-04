import * as DocPick from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { close, open } from "../../../sqlite/database";
import { common } from "../../../style/style";
import { appThemeColor } from "../../../utils/appSetting";

import ModalButton from "../../common/ModalButton";

import Toast from "react-native-root-toast";

import * as UserDAO from "../../../sqlite/user";

export default function SettingModal({ show, reload }) {
  // Redux
  const dispatch = useDispatch();
  let appTheme = useSelector((state) => state.user.theme);
  let appLang = useSelector((state) => state.user.lang);

  // 백업
  async function exportDb(params) {
    if (Platform.OS === "android") {
      console.log("hi android");
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const content = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "SQLite/main.db",
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "main.db",
          "application/octet-stream"
        )
          .then(async (uri) => {
            console.log(uri);
            await FileSystem.writeAsStringAsync(uri, content, {
              encoding: FileSystem.EncodingType.Base64,
            });
            toast();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/main.db");
    }
  }

  async function importDb(params) {
    let result = await DocPick.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    console.log(result);

    if (result != undefined && result.assets != null) {
      console.log("ok");
      if (
        !(
          await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")
        ).exists
      ) {
        console.log("no dir");
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "SQLite"
        );
      }

      console.log(result.assets[0].uri);

      const content = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await close();
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "SQLite/main.db",
        content,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      open();

      Alert.alert(
        appLang == 0 ? "백업 완료" : "Backup Complete",
        appLang == 0 ? "앱을 새로고침해 주세요." : "Please reload app.",
        [
          {
            text: appLang == 0 ? "새로고침" : "Reload",
            onPress: () => {
              reload();
            },
            style: "destructive",
          },
        ]
      );
    }
  }

  function changeTheme(params) {
    UserDAO.updateTheme(appTheme == 0 ? 1 : 0, dispatch);
    show(false);
  }

  function changeLang(params) {
    UserDAO.updateLang(appLang == 0 ? 1 : 0, dispatch);
    show(false);
  }

  function openStore(params) {
    if (Platform.OS === "ios") {
      Linking.openURL(`https://apps.apple.com/app/id123456789`);
    } else if (Platform.OS === "android") {
      Linking.openURL(`market://details?id=com.kfstudio.onetouchlifeprm`);
    }
  }

  function toast() {
    // Add a Toast on screen.
    let toast = Toast.show(
      appLang == 0 ? "데이터를 내보냈습니다" : "Data exported",
      {
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
      }
    );
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
            {appLang == 0 ? "설정" : "Settings"}
          </Text>
        </View>

        <ModalButton
          text={appLang == 0 ? "데이터 내보내기" : "Export data"}
          idx={1}
          click={exportDb}
        >
          {" "}
        </ModalButton>
        <View style={[styles.w, { height: 10 }]}></View>
        <ModalButton
          text={appLang == 0 ? "데이터 가져오기" : "Import data"}
          idx={2}
          click={importDb}
        >
          {" "}
        </ModalButton>
        <View style={[styles.w, { height: 10 }]}></View>
        <ModalButton
          text={
            appLang == 0 ? "다크모드 / 라이트모드" : "Dark Mode / Light Mode"
          }
          idx={3}
          click={changeTheme}
        >
          {" "}
        </ModalButton>
        <View style={[styles.w, { height: 10 }]}></View>
        <ModalButton text="한국어 / English" idx={4} click={changeLang}>
          {" "}
        </ModalButton>
        <View style={[styles.w, { height: 10 }]}></View>
        <ModalButton
          text={appLang == 0 ? "별점 주기" : "Rate this app"}
          idx={5}
          click={openStore}
        >
          {" "}
        </ModalButton>

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
                { fontWeight: "bold", padding: 10 },
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
