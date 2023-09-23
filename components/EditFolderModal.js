import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

import { useDispatch, useSelector } from "react-redux";

import getFontSize from '../utils/getFontSize'

import TextInputLine from './TextInputLine';

import * as FolderDAO from '../sqlite/folder';

import { common } from '../style';

export default function EditFolderModal({ idx, folder, setShow }) {
    let [title, setTitle] = useState(folder.title);

    // Redux
    const dispatch = useDispatch();
    let folders = useSelector(state => state.folder.folders);

    function edit(param) {
        FolderDAO.edit(folder.id, title, dispatch);
    }

    function remove() {
        Alert.alert('폴더 삭제', '폴더를 삭제하면 폴더 안의 아이템과 기록들이 모두 삭제됩니다.', [
            {
                text: '취소',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '삭제', onPress: () => {
                    console.log('OK Pressed');
                    FolderDAO.remove(folder.id, dispatch);
                    setShow(false);
                }, style: 'destructive',
            },
        ]);

        FolderDAO.remove(folder.id, dispatch);
        setShow(false);
    }

    function move(parameter) {
        let foldersTemp = [...folders];

        if (idx < 0 || idx >= foldersTemp.length) {
            console.log("idx is out of bounds.");
            return foldersTemp; // Return the original array unchanged
        }

        switch (parameter) {
            case 1: // Move item to the left once
                if (idx > 0) {
                    const temp = foldersTemp[idx];
                    foldersTemp[idx] = foldersTemp[idx - 1];
                    foldersTemp[idx - 1] = temp;
                }
                break;

            case 2: // Move item to first
                if (idx > 0) {
                    const temp = foldersTemp[idx];
                    foldersTemp.splice(idx, 1); // Remove element at idx
                    foldersTemp.unshift(temp);   // Add element to the beginning
                }
                break;

            case 3: // Move item to the right once
                if (idx < foldersTemp.length - 1) {
                    const temp = foldersTemp[idx];
                    foldersTemp[idx] = foldersTemp[idx + 1];
                    foldersTemp[idx + 1] = temp;
                }
                break;

            case 4: // Move item to last
                if (idx < foldersTemp.length - 1) {
                    const temp = foldersTemp[idx];
                    foldersTemp.splice(idx, 1);  // Remove element at idx
                    foldersTemp.push(temp);      // Add element to the end
                }
                break;

            default:
                console.log("Invalid parameter. Please use 1, 2, 3, or 4.");
                break;
        }

        FolderDAO.updateOrder(foldersTemp, dispatch);
    }

    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, {}]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>폴더 수정</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>
                    <TextInputLine placeholder='폴더명을 입력하세요' value={title} set={setTitle}></TextInputLine>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(2);
                            setShow(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>맨 앞</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(4);
                            setShow(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>맨뒤</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(1);
                            setShow(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>왼쪽</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(3);
                            setShow(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>오른쪽</Text>
                    </TouchableHighlight>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            setShow(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>닫기</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            remove();
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>삭제</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            if (title.length > 0 && title.length <= 100) {
                                edit();
                            }
                            setShow(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>수정</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({


})