import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import getFontSize from '../utils/getFontSize'

import { common, text } from '../style';

import { showQuickType2Modal, setQuickItem } from '../redux/slices/user'

import Toast from 'react-native-root-toast';
import TextInputLine from './TextInputLine';

import * as HistoryDAO from '../sqlite/history';


export default function QuickType2Modal({ }) {
    // Redux
    const dispatch = useDispatch()
    let item = useSelector(state => state.user.quickItem)

    let [content, setcontent] = useState('')

    function show(params) {
        dispatch(showQuickType2Modal(params))
    }

    function add(content) {
        HistoryDAO.add(item.itemId, content, dispatch)
        toast()
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
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, {}]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>기록 추가</Text>
                </View>
                <View style={[styles.e, { marginVertical: 20 }]}>
                    <TextInputLine placeholder='내용을 입력하세요' value={content} set={setcontent}></TextInputLine>
                </View>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>닫기</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            if (content.length > 0 && content.length <= 100) {
                                add(content);
                            }
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>추가</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({


})