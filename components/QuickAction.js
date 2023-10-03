import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { common, text } from '../style';

import { showQuickType2Modal, setQuickItem, showAdModal } from '../redux/slices/user'

import * as HistoryDAO from '../sqlite/history';

import Toast from 'react-native-root-toast';


export default function QuickAction({ item }) {
    // Redux
    const dispatch = useDispatch();

    function add(params) {
        if (item.type == 1) {
            // 고정 텍스트
            setAd()
        } else if (item.type == 2) {
            // 직접 입력
            dispatch(showQuickType2Modal(true))
            dispatch(setQuickItem(item))
        }
    }

    function setAd(params) {
        dispatch(showAdModal(true))
        setTimeout(() => {
            HistoryDAO.add(item.itemId, item.title, dispatch);
            dispatch(showAdModal(false))
            toast()
        }, 5000);
    }

    function toast() {
        // Add a Toast on screen.
        let toast = Toast.show(text.historySaved, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#222',
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
    }

    return (
        <View style={[common.fxr, {}]}>
            <Text style={[common.text, { color: 'gray', paddingVertical: 5 }]}>└ </Text>
            <TouchableHighlight
                underlayColor="#333"
                onPress={() => {
                    add();
                }}>
                <Text style={[common.text, { padding: 5 }]}>{item.title}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({})