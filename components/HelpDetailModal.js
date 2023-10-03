import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import React from 'react'
import { common, colors } from '../style';

import HelpImg from '../assets/imgs/Help2.jpg'

export default function HelpDetailModal({ show }) {
    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, { height: '90%' }]}>
                <View style={[styles.fxr, { flexDirection: 'row' }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>도움말</Text>
                </View>

                <Image source={HelpImg} style={[styles.e, { width: "100%", flex: 1, marginVertical: 10 }]} resizeMode='contain'></Image>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row' }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: 10, }]}>닫기</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})