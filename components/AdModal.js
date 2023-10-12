import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { common, text } from '../style';

export default function AdModal() {
    return (
        <View style={[common.modalBg, { flexDirection: 'row', backgroundColor: "#000" }]}>
            <Text style={[styles.e, { color: 'white' }]}>광고 시청 후 기록이 저장됩니다</Text>
        </View>
    )
}

const styles = StyleSheet.create({})