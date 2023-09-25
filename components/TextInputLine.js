import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { common } from '../style';

export default function TextInputLine({ placeholder, value, set }) {
    const [focus, setFocus] = useState(false)
    return (
        <View>
            <TextInput style={[common.text, common.normal, {}]} value={value} placeholder={placeholder} onChangeText={set}
                placeholderTextColor={'gray'}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}>

            </TextInput>
            {focus && <View style={[styles.e, { height: 1, backgroundColor: 'white' }]}></View>}
            {!focus && <View style={[styles.e, { height: 1, backgroundColor: 'gray' }]}></View>}
        </View>
    )
}

const styles = StyleSheet.create({})