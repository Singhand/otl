import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useDispatch } from "react-redux";

import { common } from '../style';
import { appLang, appThemeColor } from '../utils/appSetting';

import { setQuickItem, showQuickType2Modal } from '../redux/slices/user';

import * as HistoryDAO from '../sqlite/history';

import Toast from 'react-native-root-toast';


export default function QuickAction({ item }) {
    // Redux
    const dispatch = useDispatch();

    function add(params) {
        if (item.type == 1) {
            // 고정 텍스트
            HistoryDAO.add(item.itemId, item.title, dispatch);
            toast()
        } else if (item.type == 2) {
            // 직접 입력
            dispatch(showQuickType2Modal(true))
            dispatch(setQuickItem(item))
        }
    }

    function toast() {
        // Add a Toast on screen.
        let toast = Toast.show(appLang == 0 ? '기록되었습니다' : 'History saved',
            {
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
            <Text style={[common.text, { color: appThemeColor.text }, { color: 'gray', paddingVertical: 5 }]}>└ </Text>
            <TouchableHighlight
                underlayColor={appThemeColor.buttonClk}
                onPress={() => {
                    add();
                }}>
                <Text style={[common.text, { color: appThemeColor.text }, { fontSize: 14, padding: 5 }]}>{item.title}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({})