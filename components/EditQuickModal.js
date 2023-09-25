import { StyleSheet, Text, View, TouchableHighlight, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import getFontSize from '../utils/getFontSize'

import { common } from '../style';

import * as QuickDAO from '../sqlite/quick';


export default function EditQuickModal({ item, idx, show }) {

    // Redux
    const dispatch = useDispatch();

    const [type, setType] = useState(item.type)
    const [title, setTitle] = useState(item.title)

    function edit(param) {
        ItemDAO.edit(items[itemIdx].id, title, folderId, dispatch);
    }

    function remove() {
        ItemDAO.remove(items[itemIdx].id, folderId, dispatch);
        show(false);
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
                    itemsTemp.unshift(temp);   // Add element to the beginning
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
                    itemsTemp.splice(itemIdx, 1);  // Remove element at itemIdx
                    itemsTemp.push(temp);      // Add element to the end
                }
                break;

            default:
                console.log("Invalid parameter. Please use 1, 2, 3, or 4.");
                break;
        }

        ItemDAO.updateOrder(itemsTemp, folderId, dispatch);
    }

    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, {}]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>빠른 기록 수정</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>
                    <TextInputLine placeholder='이름을 입력하세요' value={title} set={setTitle}></TextInputLine>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(2);
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>맨 앞</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(4);
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>맨뒤</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(1);
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>왼쪽</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            move(3);
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>오른쪽</Text>
                    </TouchableHighlight>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            show(false);
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
                            show(false);
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