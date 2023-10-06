import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'
import getFontSize from '../utils/getFontSize'

import TextInputLine from './TextInputLine';

import * as HistoryDAO from '../sqlite/history';



export default function EditHistoryModal({ idx, item, show }) {

    // Redux
    const dispatch = useDispatch();

    const [content, setContent] = useState(item.content)

    function editHistory(history) {
        HistoryDAO.edit(history, dispatch)
    }

    function deleteHistory(history) {
        HistoryDAO.remove(history, dispatch)
    }

    return (
        <View style={[common.modalBg, {}]}>
            <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', }]}>기록 수정</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>
                    <TextInputLine placeholder='내용을 입력하세요' value={content} set={setContent}></TextInputLine>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>닫기</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            if (content.length > 0 && content.length <= 100) {
                                let itemCopy = { ...item }
                                itemCopy.content = content;
                                editHistory(itemCopy);
                            }
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>수정</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            deleteHistory(item);
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>삭제</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})