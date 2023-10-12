import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import getFontSize from '../utils/getFontSize'

import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'

import * as QuickDAO from '../sqlite/quick';

import TextInputLine from './TextInputLine';


export default function EditQuickModal({ item, idx, show }) {
    // Redux
    const dispatch = useDispatch();
    let quicks = useSelector(state => state.quick.items[`${item.itemId}`]);

    const [type, setType] = useState(item.type)
    const [title, setTitle] = useState(item.title)

    function edit(param) {
        let itemTemp = { ...item }
        itemTemp.title = title
        QuickDAO.edit(itemTemp, dispatch);
    }

    function remove() {
        QuickDAO.remove(item, dispatch);
        show(false);
    }

    function move(parameter) {
        let quicksTemp = [...quicks];

        if (idx < 0 || idx >= quicksTemp.length) {
            console.log("idx is out of bounds.");
            return quicksTemp; // Return the original array unchanged
        }

        switch (parameter) {
            case 1: // Move item to the left once
                if (idx > 0) {
                    const temp = quicksTemp[idx];
                    quicksTemp[idx] = quicksTemp[idx - 1];
                    quicksTemp[idx - 1] = temp;
                }
                break;

            case 2: // Move item to first
                if (idx > 0) {
                    const temp = quicksTemp[idx];
                    quicksTemp.splice(idx, 1); // Remove element at idx
                    quicksTemp.unshift(temp);   // Add element to the beginning
                }
                break;

            case 3: // Move item to the right once
                if (idx < quicksTemp.length - 1) {
                    const temp = quicksTemp[idx];
                    quicksTemp[idx] = quicksTemp[idx + 1];
                    quicksTemp[idx + 1] = temp;
                }
                break;

            case 4: // Move item to last
                if (idx < quicksTemp.length - 1) {
                    const temp = quicksTemp[idx];
                    quicksTemp.splice(idx, 1);  // Remove element at idx
                    quicksTemp.push(temp);      // Add element to the end
                }
                break;

            default:
                console.log("Invalid parameter. Please use 1, 2, 3, or 4.");
                break;
        }

        QuickDAO.updateOrder(quicksTemp, item.itemId, dispatch);
    }

    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', }]}>{appLang == 0 ? '빠른 기록 수정' : 'Edit Quick Action'}</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>

                    {type == 1 && <TextInputLine placeholder={appLang == 0 ? '고정 텍스트를 입력하세요' : 'Enter a fixed text'} value={title} set={setTitle}></TextInputLine>}
                    {type == 2 && <TextInputLine placeholder={appLang == 0 ? '표시될 이름을 입력하세요' : 'Enter a title of quick action'} value={title} set={setTitle}></TextInputLine>}
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row', flexWrap: 'wrap' }]}>
                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            move(2);
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '맨 앞' : 'Move Start'}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            move(4);
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '맨 뒤' : 'Move End'}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            move(1);
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '왼쪽' : 'Move Left'}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            move(3);
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '오른쪽' : 'Move Right'}</Text>
                    </TouchableHighlight>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '닫기' : 'Close'}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            remove();
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '삭제' : 'Delete'}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            if (title.length > 0 && title.length <= 100) {
                                edit();
                            }
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '수정' : 'Edit'}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})