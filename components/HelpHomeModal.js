import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'

import HelpImg from '../assets/imgs/Help1.jpg'
import HelpImg2 from '../assets/imgs/Help1ENG.jpg'

export default function HelpHomeModal({ show }) {
    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, { height: '90%', backgroundColor: appThemeColor.modal }]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', }]}>{appLang == 0 ? '도움말' : 'Help'}</Text>
                </View>

                <Image source={appLang == 0 ? HelpImg : HelpImg2} style={[styles.e, { width: "100%", flex: 1, marginVertical: 10 }]} resizeMode='contain'></Image>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: 10, }]}>{appLang == 0 ? '닫기' : 'Close'}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})