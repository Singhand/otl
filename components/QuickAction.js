import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { common } from '../style';

import * as HistoryDAO from '../sqlite/history';


export default function QuickAction({ item }) {
    // Redux
    const dispatch = useDispatch();

    function add(params) {
        if (item.type == 1) {
            HistoryDAO.add(item.itemId, " ", dispatch);
        }
    }

    return (
        <View style={[common.fxr, { paddingVertical: 5 }]}>
            <Text style={[common.text, { color: 'gray' }]}>└  </Text>
            <TouchableHighlight
                underlayColor="#333"
                onPress={() => {
                    add();
                }}>
                <Text style={[common.text, {}]}>{item.title}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({})