import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'

import FolderTitle from './FolderTitle';
import MainItem from './MainItem';

import { useDispatch, useSelector } from "react-redux";

import { common } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'

import * as ItemDAO from '../sqlite/item';


export default function Folder({ folders, idx, setSelected, setSelectedItem, setItem,
    setShowEdit, showAddItem, setShowEditItem }) {
    // Redux
    const dispatch = useDispatch();
    let items = useSelector(state => state.item.items[`${folders[idx].id}`]);

    useEffect(() => {
        console.log('useEffect-Folder');
        ItemDAO.init(folders[idx].id, dispatch)
    }, []);

    function click() {
        setSelected(idx);
        setShowEdit(true);
    }

    function itemClick(itemIdx) {
        setSelected(idx);
        setSelectedItem(itemIdx)
        setItem(items[itemIdx])
        setShowEditItem(true);
    }

    return (
        <ScrollView style={[styles.e, {
            width: '100%',
            height: '100%',
        }]}>
            <FolderTitle title={folders[idx].title} click={click} ></FolderTitle>

            {items != undefined && items.map((_, index) => (
                <MainItem key={index} idx={index} item={items[index]} click={itemClick}></MainItem>
            ))}

            <TouchableHighlight
                underlayColor={appThemeColor.buttonClk}
                onPress={() => {
                    setSelected(idx);
                    showAddItem(true);
                }}
                style={[styles.e, { justifyContent: 'center' }]}>
                <Text style={[common.text, { fontSize: 36 }]}>+
                </Text>
            </TouchableHighlight>

        </ScrollView>
    )
}

const styles = StyleSheet.create({})