import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native'
import React, { useState } from 'react'

import getFontSize from '../utils/getFontSize'

import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'

import TextInputLine from './TextInputLine';

export default function AddItemModal({ add, show }) {
    let [title, setTitle] = useState('');

    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', }]}>{appLang == 0 ? '아이템 추가' : 'Add Item'}</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>
                    <TextInputLine placeholder={appLang == 0 ? '이름을 입력하세요' : 'Enter a title'} value={title} set={setTitle}></TextInputLine>
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
                            if (title.length > 0 && title.length <= 100) {
                                add(title);
                            }
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: getFontSize(10), }]}>{appLang == 0 ? '추가' : 'Add'}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({


})