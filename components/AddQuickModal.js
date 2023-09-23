import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { common, colors } from '../style';
import getFontSize from '../utils/getFontSize'

import ModalButton from './ModalButton';

export default function AddQuickModal({ show, click }) {
    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, {}]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>빠른 기록 추가</Text>
                </View>

                <ModalButton text='고정 텍스트'> </ModalButton>
                <ModalButton text='직접 입력'> </ModalButton>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>닫기</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})