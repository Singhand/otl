import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native'
import React, { useState } from 'react'

import getFontSize from '../utils/getFontSize'

import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'

import TextInputLine from './TextInputLine';

export default function AddFolderModal({ add, setShowAdd }) {
    let [title, setTitle] = useState('');

    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>폴더 추가</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>
                    <TextInputLine placeholder='폴더명을 입력하세요' value={title} set={setTitle}></TextInputLine>

                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            setShowAdd(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>닫기</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            if (title.length > 0 && title.length <= 100) {
                                add(title);
                            }
                            setShowAdd(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>추가</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({


})