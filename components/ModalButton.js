import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

import { common, colors } from '../style';


export default function ModalButton({ idx, click, text }) {
    return (
        <TouchableHighlight
            underlayColor="#292929"
            onPress={() => {
                click(idx)
            }}
            style={[common.round, { justifyContent: 'center', padding: 10, borderColor: '#4c4c4c', borderWidth: 1 }]}>
            <Text style={[common.text, { textAlign: 'center' }]} numberOfLines={1}>{text}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({})