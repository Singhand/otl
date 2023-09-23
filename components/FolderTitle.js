import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import getFontSize from '../utils/getFontSize';
import React from 'react'


export default function FolderTitle({ title, click }) {
    return (
        <TouchableHighlight
            underlayColor="#333"
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