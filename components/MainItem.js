import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import getFontSize from '../utils/getFontSize';

import * as QuickDAO from '../sqlite/quick';

import { common } from '../style';
import { appThemeColor } from '../utils/appSetting';

import QuickAction from './QuickAction';


export default function MainItem({ idx, item, click }) {
    const navigation = useNavigation();

    // Redux
    const dispatch = useDispatch();
    let quicks = useSelector(state => state.quick.items[`${item.id}`]);

    if (quicks == undefined) {
        QuickDAO.init(item.id, dispatch)
    }

    useEffect(() => {
        console.log('main item use eff');
    }, []);

    return (
        <View style={[styles.ctn, {}]}>
            <TouchableHighlight
                underlayColor={appThemeColor.buttonClk}
                onPress={() => {
                    navigation.navigate('Details', {
                        itemId: item.id,
                        title: item.title,
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