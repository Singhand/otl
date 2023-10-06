import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import getFontSize from '../utils/getFontSize';
import React from 'react'

import { appThemeColor, appLang } from '../utils/appSetting'

export default function FolderTitle({ title, click }) {
    return (
        <TouchableHighlight
            underlayColor={appThemeColor.buttonClk}
            onPress={() => {
                click();
            }}>
            <View >
                <Text style={{ color: '#fff', fontSize: getFontSize(24) }}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({})