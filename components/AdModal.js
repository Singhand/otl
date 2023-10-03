import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { common, text } from '../style';

export default function AdModal() {
    return (
        <View style={[common.modalBg, { flexDirection: 'row', backgroundColor: "#000" }]}>
            <Text>AdModal</Text>
        </View>
    )
}

const styles = StyleSheet.create({})