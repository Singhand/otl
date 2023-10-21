import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native';

import FolderTitle from './FolderTitle';
import MainItem from './MainItem';

import { useDispatch, useSelector } from "react-redux";

import { common } from '../style';
import { appThemeColor } from '../utils/appSetting';

import * as FolderDAO from '../sqlite/folder';
import * as ItemDAO from '../sqlite/item';


export default function Folder({ folders, idx, setSelected, setSelectedItem, setItem,
    setShowEdit, showAddItem, setShowEditItem }) {
    let folder = folders[idx];

    // Redux
    const dispatch = useDispatch();
    let items = useSelector(state => state.item.items[`${folder.id}`]);

    useEffect(() => {
        console.log('useEffect-Folder');
        ItemDAO.init(folder.id, dispatch)
    }, []);

    function click() {
        setSelected(idx);
        setShowEdit(true);
    }

    function longClick(params) {
        FolderDAO.fold(folder, dispatch)
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
            <FolderTitle title={folder.title} click={click} longClick={longClick}></FolderTitle>

            {folder.opened == 1 && items != undefined && items.map((_, index) => (
                <MainItem key={index} idx={index} item={items[index]} click={itemClick}></MainItem>
            ))}

            {folder.opened == 1 &&
                <TouchableHighlight
                    underlayColor={appThemeColor.buttonClk}
                    onPress={() => {
                        setSelected(idx);
                        showAddItem(true);
                    }}
                    style={[styles.e, { justifyContent: 'center' }]}>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontSize: 36 }]}>+
                    </Text>
                </TouchableHighlight>
            }


        </ScrollView>
    )
}

const styles = StyleSheet.create({})