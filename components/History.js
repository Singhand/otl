import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'

import { common } from '../style';

export default function History({ item, idx, showEdit }) {
    let date = new Date(item.created);
    const time = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    return (
        <TouchableHighlight
            underlayColor="#333"
            onPress={() => {
                showEdit(item)
            }}>
            <View>
                <View style={[common.fxr, { paddingVertical: 10 }]}>
                    <Text style={[common.text, { flex: 1 }]} numberOfLines={1}>{item.content}</Text>
                    <Text style={[common.text, { color: 'gray' }]} numberOfLines={1}>{time}</Text>
                </View>
                <View style={[styles.e, { height: 1, backgroundColor: "#323232" }]}></View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({})