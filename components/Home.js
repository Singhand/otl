import { StyleSheet, Text, PixelRatio, View, Pressable, ScrollView, Button, TouchableHighlight, Image, BackHandler, Platform } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useMemo, useCallback } from 'react'

import { useDispatch, useSelector } from "react-redux";

import * as FolderDAO from '../sqlite/folder';
import * as ItemDAO from '../sqlite/item';
import * as UserDAO from '../sqlite/user';

import { showQuickType2Modal, setQuickItem, showAdModal } from '../redux/slices/user'

import getFontSize from '../utils/getFontSize';
import { appThemeColor, appLang, setTheme, setLang } from '../utils/appSetting'
import { common, colors, lightColors } from '../style';

import Folder from './Folder';
import AddFolderModal from './AddFolderModal';
import EditFolderModal from './EditFolderModal';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import QuickType2Modal from './QuickType2Modal';
import HelpHomeModal from './HelpHomeModal';
import SettingModal from './SettingModal';
import AdModal from './AdModal';
// import MyAdBanner from './MyAdBanner';

import helpIcon from '../assets/imgs/help.png'
import settingIcon from '../assets/imgs/settings.png'

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

    const [item, setItem] = useState(0)

    const [showHelp, setShowHelp] = useState(false)
    const [showSetting, setShowSetting] = useState(false)

    // Redux
    const dispatch = useDispatch();
    let folders = useSelector(state => state.folder.folders);
    let isShowQuickType2Modal = useSelector(state => state.user.quickType2Modal);
    let adModal = useSelector(state => state.user.adModal);
    let appTheme = useSelector(state => state.user.theme);
    let appLang = useSelector(state => state.user.lang);

    // 앱 테마, 언어 스타일
    setTheme((appTheme == 0) ? colors : lightColors);

    useEffect(() => {
        console.log('useEffect-Home');
        FolderDAO.init(dispatch);
        UserDAO.initSetting(dispatch);
    }, []);

    // 뒤로가기 버튼 제어
    useFocusEffect(
        useCallback(() => {
            console.log('usecallback')
            const onBackPress = () => {
                console.log('back pressed')
                if (showAdd) {
                    setShowAdd(false)
                    return true;
                } else if (showEdit) {
                    setShowEdit(false)
                    return true;
                } else if (showAddItem) {
                    setShowAddItem(false)
                    return true;
                } else if (showEditItem) {
                    setShowEditItem(false)
                    return true;
                } else if (isShowQuickType2Modal) {
                    dispatch(showQuickType2Modal(false))
                    return true;
                } else if (showHelp) {
                    setShowHelp(false)
                    return true;
                } else if (showSetting) {
                    setShowSetting(false)
                    return true;
                } else if (adModal) {
                    return true;
                } else {
                    return false;
                }
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [showAdd, showEdit, showAddItem, showEditItem, isShowQuickType2Modal, showHelp, showSetting, adModal])
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
        navigation.replace('Home', null);
    }

    return (
        <View style={{ backgroundColor: appThemeColor.bg, flex: 1, color: '#fff' }}>

            <View style={[styles.fdr, styles.folderCtn, {

            }]}>
                <View style={[styles.folder, {
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {(folders.length > (page * 4)) && <Folder setItem={setItem} setShowEditItem={setShowEditItem} setSelectedItem={setSelectedItem} setSelected={setSelected} setShowEdit={setShowEdit} showAddItem={setShowAddItem} idx={(page * 4)}
                        folders={folders}></Folder>}

                    {(folders.length == (page * 4)) &&
                        <TouchableHighlight
                            underlayColor={appThemeColor.buttonClk}
                            onPress={() => {
                                setShowAdd(true);
                            }}>
                            <Text style={[styles.add, {}]}>+</Text>
                        </TouchableHighlight>}

                </View>

                <View style={styles.folderDividerV}></View>
                <View style={[styles.folder, {
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {(folders.length > (page * 4 + 1)) && <Folder setItem={setItem} setShowEditItem={setShowEditItem} setSelectedItem={setSelectedItem} setSelected={setSelected} setShowEdit={setShowEdit} showAddItem={setShowAddItem} idx={(page * 4 + 1)}
                        folders={folders}></Folder>}

                    {(folders.length == (page * 4) + 1) &&
                        <TouchableHighlight
                            underlayColor={appThemeColor.buttonClk}
                            onPress={() => {
                                setShowAdd(true);
                            }}>
                            <Text style={[styles.add, {}]}>+</Text>
                        </TouchableHighlight>}
                </View>
            </View>
            <View style={styles.folderDividerH} ></View>

            <View style={[styles.fdr, styles.folderCtn]}>
                <View style={[styles.folder, {
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {(folders.length > (page * 4 + 2)) && <Folder setItem={setItem} setShowEditItem={setShowEditItem} setSelectedItem={setSelectedItem} setSelected={setSelected} setShowEdit={setShowEdit} showAddItem={setShowAddItem} idx={(page * 4 + 2)}
                        folders={folders}></Folder>}

                    {(folders.length == (page * 4) + 2) &&
                        <TouchableHighlight
                            underlayColor={appThemeColor.buttonClk}
                            onPress={() => {
                                setShowAdd(true);
                            }}>
                            <Text style={[styles.add, {}]}>+</Text>
                        </TouchableHighlight>}
                </View>
                <View style={styles.folderDividerV}></View>
                <View style={[styles.folder, {
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}>
                    {(folders.length > (page * 4 + 3)) && <Folder setItem={setItem} setShowEditItem={setShowEditItem} setSelectedItem={setSelectedItem} setSelected={setSelected} setShowEdit={setShowEdit} showAddItem={setShowAddItem} idx={(page * 4 + 3)}
                        folders={folders}></Folder>}

                    {(folders.length == (page * 4) + 3) &&
                        <TouchableHighlight
                            underlayColor={appThemeColor.buttonClk}
                            onPress={() => {
                                setShowAdd(true);
                            }}>
                            <Text style={[styles.add, {}]}>+</Text>
                        </TouchableHighlight>}
                </View>
            </View>

            <View style={[styles.fdr, {
                width: '100%', zIndex: 1, position: 'absolute', right: 0, bottom: 0,
                alignItems: 'center', justifyContent: 'flex-end', padding: 10
            }]}>
                <TouchableHighlight
                    underlayColor={appThemeColor.buttonClk}
                    onPress={() => {
                        setShowHelp(true)
                    }}
                    style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                    <Image source={helpIcon} style={[common.icon, {}]}></Image>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor={appThemeColor.buttonClk}
                    onPress={() => {
                        setShowSetting(true)
                    }}
                    style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                    <Image source={settingIcon} style={[common.icon, {}]}></Image>
                </TouchableHighlight>

            </View>

            {/* <MyAdBanner></MyAdBanner> */}


            {showAdd && <AddFolderModal add={add} setShowAdd={setShowAdd}></AddFolderModal>}
            {showEdit && <EditFolderModal idx={selected} folder={folders[selected]} setShow={setShowEdit}></EditFolderModal>}
            {showAddItem && <AddItemModal add={addItem} show={setShowAddItem}></AddItemModal>}
            {showEditItem && <EditItemModal item={item} folderId={folders[selected].id} itemIdx={selectedItem} show={setShowEditItem}></EditItemModal>}
            {isShowQuickType2Modal && <QuickType2Modal></QuickType2Modal>}
            {showHelp && <HelpHomeModal show={setShowHelp}></HelpHomeModal>}
            {showSetting && <SettingModal show={setShowSetting} reload={reloadApp}></SettingModal>}
            {adModal && <AdModal></AdModal>}
        </View >
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
    },
    add: {
        color: '#fff',
        fontSize: getFontSize(40)
    },
    folderCtn: {
        width: '100%',
        height: '45%',
    },
    folder: {
        width: '50%',
        height: '100%',
        paddingHorizontal: getFontSize(10),
        paddingTop: getFontSize(10),
    },
    folderTitle: {
        fontSize: getFontSize(24),
    },
    fdr: {
        flexDirection: 'row'
    },
    folderDividerV: {
        backgroundColor: '#888',
        width: getFontSize(1),
        height: '100%',
    },
    folderDividerH: {
        backgroundColor: '#888',
        width: '100%',
        height: getFontSize(1),
    },

})

