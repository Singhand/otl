import { StyleSheet, Text, PixelRatio, View, Pressable, ScrollView, Button, TouchableHighlight, Image, BackHandler } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useMemo, useCallback } from 'react'

import { useDispatch, useSelector } from "react-redux";

import * as FolderDAO from '../sqlite/folder';
import * as ItemDAO from '../sqlite/item';

import { showQuickType2Modal, setQuickItem } from '../redux/slices/user'


import getFontSize from '../utils/getFontSize';

import Folder from './Folder';
import AddFolderModal from './AddFolderModal';
import EditFolderModal from './EditFolderModal';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import QuickType2Modal from './QuickType2Modal';


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

    // Redux
    const dispatch = useDispatch();
    let folders = useSelector(state => state.folder.folders);
    let isShowQuickType2Modal = useSelector(state => state.user.quickType2Modal);

    useEffect(() => {
        console.log('useEffect-Home');
        FolderDAO.init(dispatch);
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
                } else {
                    return false;
                }
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [showAdd, showEdit, showAddItem, showEditItem, isShowQuickType2Modal])
    );

    // 폴더 추가
    function add(title) {
        FolderDAO.add(title, dispatch);
    }

    // 아이템 추가
    function addItem(title) {
        ItemDAO.add(title, folders[selected].id, dispatch);
    }

    return (
        <View style={{ backgroundColor: '#222', flex: 1, color: '#fff' }}>
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
                            underlayColor="#333"
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
                            underlayColor="#333"
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
                            underlayColor="#333"
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
                            underlayColor="#333"
                            onPress={() => {
                                setShowAdd(true);
                            }}>
                            <Text style={[styles.add, {}]}>+</Text>
                        </TouchableHighlight>}
                </View>
            </View>

            {showAdd && <AddFolderModal add={add} setShowAdd={setShowAdd}></AddFolderModal>}
            {showEdit && <EditFolderModal idx={selected} folder={folders[selected]} setShow={setShowEdit}></EditFolderModal>}
            {showAddItem && <AddItemModal add={addItem} show={setShowAddItem}></AddItemModal>}
            {showEditItem && <EditItemModal item={item} folderId={folders[selected].id} itemIdx={selectedItem} show={setShowEditItem}></EditItemModal>}
            {isShowQuickType2Modal && <QuickType2Modal></QuickType2Modal>}
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
        height: '50%',
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
    }
})

