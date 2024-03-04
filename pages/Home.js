import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import * as FolderDAO from "../sqlite/folder";
import * as ItemDAO from "../sqlite/item";
import * as UserDAO from "../sqlite/user";

import { showQuickType2Modal, setHelpFirst1 } from "../redux/slices/user";

import { common, darkColors, lightColors } from "../style/style";
import { appThemeColor, setLang, setTheme } from "../utils/appSetting";
import getFontSize from "../utils/getFontSize";

import AddFolderModal from "../components/modal/home/AddFolderModal";
import AddItemModal from "../components/modal/home/AddItemModal";
import EditFolderModal from "../components/modal/home/EditFolderModal";
import EditItemModal from "../components/modal/home/EditItemModal";
import MoveItemModal from "../components/modal/home/MoveItemModal";
import Folder from "../components/content/folder/Folder";
import HelpHomeModal from "../components/modal/home/HelpHomeModal";
import QuickType2Modal from "../components/modal/home/QuickType2Modal";
import SettingModal from "../components/modal/home/SettingModal";

import helpIcon from "../assets/imgs/help.png";
import leftIcon from "../assets/imgs/left.png";
import rightIcon from "../assets/imgs/right.png";
import settingIcon from "../assets/imgs/settings.png";

export default function Home() {
  const navigation = useNavigation();
  // state
  let [page, setPage] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(-1);

  const [selectedItem, setSelectedItem] = useState(-1);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showMoveItem, setShowMoveItem] = useState(false);

  const [item, setItem] = useState(0);

  const [showHelp, setShowHelp] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  // Redux
  const dispatch = useDispatch();
  let folders = useSelector((state) => state.folder.folders);
  let isShowQuickType2Modal = useSelector(
    (state) => state.user.quickType2Modal
  );
  let appTheme = useSelector((state) => state.user.theme);
  let appLang = useSelector((state) => state.user.lang);
  let helpFirst1 = useSelector((state) => state.user.helpFirst1);

  // 앱 처음 실행한 경우 도움말 열기
  if (helpFirst1 && !showHelp) {
    setShowHelp(true);
    dispatch(setHelpFirst1(false));
  }

  // 앱 테마, 언어 스타일
  setTheme(appTheme == 0 ? darkColors : lightColors);
  setLang(appLang);

  useEffect(() => {
    console.log("useEffect-Home");
    FolderDAO.init(dispatch);
    UserDAO.initSetting(dispatch);
    UserDAO.checkFirst(1, dispatch);
  }, []);

  // 뒤로가기 버튼 제어
  useFocusEffect(
    useCallback(() => {
      console.log("usecallback");
      const onBackPress = () => {
        console.log("back pressed");
        if (showAdd) {
          setShowAdd(false);
          return true;
        } else if (showEdit) {
          setShowEdit(false);
          return true;
        } else if (showAddItem) {
          setShowAddItem(false);
          return true;
        } else if (showEditItem) {
          setShowEditItem(false);
          return true;
        } else if (showMoveItem) {
          setShowMoveItem(false);
          return true;
        } else if (isShowQuickType2Modal) {
          dispatch(showQuickType2Modal(false));
          return true;
        } else if (showHelp) {
          setShowHelp(false);
          return true;
        } else if (showSetting) {
          setShowSetting(false);
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [
      showAdd,
      showEdit,
      showAddItem,
      showEditItem,
      showMoveItem,
      isShowQuickType2Modal,
      showHelp,
      showSetting,
    ])
  );

  // 폴더 추가
  function add(title) {
    FolderDAO.add(title, dispatch);
  }

  // 아이템 추가
  function addItem(title) {
    ItemDAO.add(title, folders[selected].id, dispatch);
  }

  function reloadApp(params) {
    navigation.replace("Home", null);
  }

  // 페이지 이동
  function moveBack(params) {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function moveForward(params) {
    if (parseInt(folders.length / 4) > page) {
      setPage(page + 1);
    }
  }

  return (
    <View style={{ backgroundColor: appThemeColor.bg, flex: 1 }}>
      {/* 상단폴더 */}
      <View style={[styles.fdr, styles.folderCtn, {}]}>
        <View
          style={[
            styles.folder,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {folders.length > page * 4 && (
            <Folder
              setItem={setItem}
              setShowEditItem={setShowEditItem}
              setSelectedItem={setSelectedItem}
              setSelected={setSelected}
              setShowEdit={setShowEdit}
              showAddItem={setShowAddItem}
              idx={page * 4}
              folders={folders}
            ></Folder>
          )}

          {folders.length == page * 4 && (
            <TouchableHighlight
              underlayColor={appThemeColor.buttonClk}
              onPress={() => {
                setShowAdd(true);
              }}
            >
              <Text style={[styles.add, { color: appThemeColor.text }]}>+</Text>
            </TouchableHighlight>
          )}
        </View>

        <View style={styles.folderDividerV}></View>
        <View
          style={[
            styles.folder,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {folders.length > page * 4 + 1 && (
            <Folder
              setItem={setItem}
              setShowEditItem={setShowEditItem}
              setSelectedItem={setSelectedItem}
              setSelected={setSelected}
              setShowEdit={setShowEdit}
              showAddItem={setShowAddItem}
              idx={page * 4 + 1}
              folders={folders}
            ></Folder>
          )}

          {folders.length == page * 4 + 1 && (
            <TouchableHighlight
              underlayColor={appThemeColor.buttonClk}
              onPress={() => {
                setShowAdd(true);
              }}
            >
              <Text style={[styles.add, { color: appThemeColor.text }]}>+</Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
      <View style={styles.folderDividerH}></View>

      {/* 하단 폴더 */}
      <View style={[styles.fdr, styles.folderCtn]}>
        <View
          style={[
            styles.folder,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {folders.length > page * 4 + 2 && (
            <Folder
              setItem={setItem}
              setShowEditItem={setShowEditItem}
              setSelectedItem={setSelectedItem}
              setSelected={setSelected}
              setShowEdit={setShowEdit}
              showAddItem={setShowAddItem}
              idx={page * 4 + 2}
              folders={folders}
            ></Folder>
          )}

          {folders.length == page * 4 + 2 && (
            <TouchableHighlight
              underlayColor={appThemeColor.buttonClk}
              onPress={() => {
                setShowAdd(true);
              }}
            >
              <Text style={[styles.add, { color: appThemeColor.text }]}>+</Text>
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.folderDividerV}></View>
        <View
          style={[
            styles.folder,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {folders.length > page * 4 + 3 && (
            <Folder
              setItem={setItem}
              setShowEditItem={setShowEditItem}
              setSelectedItem={setSelectedItem}
              setSelected={setSelected}
              setShowEdit={setShowEdit}
              showAddItem={setShowAddItem}
              idx={page * 4 + 3}
              folders={folders}
            ></Folder>
          )}

          {folders.length == page * 4 + 3 && (
            <TouchableHighlight
              underlayColor={appThemeColor.buttonClk}
              onPress={() => {
                setShowAdd(true);
              }}
            >
              <Text style={[styles.add, { color: appThemeColor.text }]}>+</Text>
            </TouchableHighlight>
          )}
        </View>
      </View>

      {/* footer */}
      <View
        style={[
          styles.fdr,
          {
            width: "100%",
            height: "10%",
          },
        ]}
      >
        <View
          style={[
            styles.fdr,
            {
              flex: 1,
              padding: 10,
            },
          ]}
        ></View>

        <View
          style={[
            styles.fdr,
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <TouchableHighlight
            underlayColor={appThemeColor.buttonClk}
            onPress={() => {
              moveBack();
            }}
            style={[
              styles.e,
              { justifyContent: "center", borderRadius: 100, padding: 10 },
            ]}
          >
            <Image
              source={leftIcon}
              style={[common.icon, { tintColor: appThemeColor.text }]}
            ></Image>
          </TouchableHighlight>
          <Text style={[common.text, { color: appThemeColor.text }]}>
            {page}
          </Text>
          <TouchableHighlight
            underlayColor={appThemeColor.buttonClk}
            onPress={() => {
              moveForward();
            }}
            style={[
              styles.e,
              { justifyContent: "center", borderRadius: 100, padding: 10 },
            ]}
          >
            <Image
              source={rightIcon}
              style={[common.icon, { tintColor: appThemeColor.text }]}
            ></Image>
          </TouchableHighlight>
        </View>

        <View
          style={[
            styles.fdr,
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              padding: 10,
            },
          ]}
        >
          <TouchableHighlight
            underlayColor={appThemeColor.buttonClk}
            onPress={() => {
              setShowHelp(true);
            }}
            style={[
              styles.e,
              { justifyContent: "center", borderRadius: 100, padding: 10 },
            ]}
          >
            <Image
              source={helpIcon}
              style={[common.icon, { tintColor: appThemeColor.text }]}
            ></Image>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={appThemeColor.buttonClk}
            onPress={() => {
              setShowSetting(true);
            }}
            style={[
              styles.e,
              { justifyContent: "center", borderRadius: 100, padding: 10 },
            ]}
          >
            <Image
              source={settingIcon}
              style={[common.icon, { tintColor: appThemeColor.text }]}
            ></Image>
          </TouchableHighlight>
        </View>
      </View>

      {/* <MyAdBanner></MyAdBanner> */}

      {showAdd && (
        <AddFolderModal add={add} setShowAdd={setShowAdd}></AddFolderModal>
      )}
      {showEdit && (
        <EditFolderModal
          idx={selected}
          folder={folders[selected]}
          setShow={setShowEdit}
        ></EditFolderModal>
      )}
      {showAddItem && (
        <AddItemModal add={addItem} show={setShowAddItem}></AddItemModal>
      )}
      {showEditItem && (
        <EditItemModal
          item={item}
          folderId={folders[selected].id}
          itemIdx={selectedItem}
          show={setShowEditItem}
          showMove={setShowMoveItem}
        ></EditItemModal>
      )}
      {showMoveItem && (
        <MoveItemModal
          item={item}
          folderId={folders[selected].id}
          folders={folders}
          show={setShowMoveItem}
        ></MoveItemModal>
      )}
      {isShowQuickType2Modal && <QuickType2Modal></QuickType2Modal>}
      {showHelp && <HelpHomeModal show={setShowHelp}></HelpHomeModal>}
      {showSetting && (
        <SettingModal show={setShowSetting} reload={reloadApp}></SettingModal>
      )}
      {/* {adModal && <AdModal></AdModal>}
            {adModal && <HistoryAd></HistoryAd>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
  },
  add: {
    fontSize: getFontSize(40),
  },
  folderCtn: {
    width: "100%",
    height: "45%",
  },
  folder: {
    width: "50%",
    height: "100%",
    paddingHorizontal: getFontSize(10),
    paddingTop: getFontSize(10),
  },
  folderTitle: {
    fontSize: getFontSize(24),
  },
  fdr: {
    flexDirection: "row",
  },
  folderDividerV: {
    backgroundColor: "#888",
    width: getFontSize(1),
    height: "100%",
  },
  folderDividerH: {
    backgroundColor: "#888",
    width: "100%",
    height: getFontSize(1),
  },
});
