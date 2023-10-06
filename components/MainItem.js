import { StyleSheet, Text, PixelRatio, View, Pressable, ScrollView, Button, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import getFontSize from '../utils/getFontSize';
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";

import * as QuickDAO from '../sqlite/quick';

import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'

import QuickAction from './QuickAction';


export default function MainItem({ idx, item, click }) {
    const navigation = useNavigation();

    // Redux
    const dispatch = useDispatch();
    let quicks = useSelector(state => state.quick.items[`${item.id}`]);

    useEffect(() => {
        console.log('main item use eff');
        QuickDAO.init(item.id, dispatch)
    }, []);

    return (
        <View style={[styles.ctn, {}]}>
            <TouchableHighlight
                underlayColor={appThemeColor.buttonClk}
                onPress={() => {
                    navigation.navigate('Details', {
                        itemId: item.id
                    });
                }}
                onLongPress={() => {
                    click(idx)
                }}>
                <View>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontSize: getFontSize(18), paddingVertical: getFontSize(5) }]}>{item.title}</Text>
                </View>
            </TouchableHighlight>


            {quicks != undefined && quicks.map((quick, idx) => (
                <QuickAction key={idx} item={quick}></QuickAction>
            ))}


        </View>
    )
}

const styles = StyleSheet.create({})