import { StyleSheet, Text, View, Pressable, Image, TouchableHighlight, ScrollView } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'

import { useDispatch, useSelector } from "react-redux";

import { common, colors } from '../style';

import History from './History';
import EditHistoryModal from './EditHistoryModal';
import ModalButton from './ModalButton';
import AddQuickModal from './AddQuickModal';

import backIcon from '../assets/imgs/back.svg'
import helpIcon from '../assets/imgs/help.svg'
import searchIcon from '../assets/imgs/search.svg'
import addIcon from '../assets/imgs/add.svg'

import * as HistoryDAO from '../sqlite/history';
import * as QuickDAO from '../sqlite/quick';


export default function Detail({ route }) {
    const { itemId } = route.params;
    console.log('detail', itemId)

    // state
    const [showEditHistory, setShowEditHistory] = useState(false)
    const [selectHis, setSelectHis] = useState(0);
    const [showAddQuick, setShowAddQuick] = useState(false)

    // Redux
    const dispatch = useDispatch();
    let items = useSelector(state => state.history.items[`${itemId}`]);
    let quicks = useSelector(state => state.quick.items[`${itemId}`]);


    useEffect(() => {
        console.log('useEffect-Detail');
        HistoryDAO.init(itemId, dispatch)
    }, []);

    function openEditHistory(item) {
        setSelectHis(item);
        setShowEditHistory(true)
    }

    function openEditQuick(params) {
    }

    const iter = Array(20).fill(null);
    return (
        <View style={{ backgroundColor: '#222', flex: 1, alignItems: 'center' }}>

            <View style={[common.fxr, { width: '100%', alignItems: 'center', padding: 10 }]}>
                <TouchableHighlight
                    underlayColor="#333"
                    onPress={() => {

                    }}
                    style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                    <Image source={backIcon} style={[common.icon, {}]}></Image>
                </TouchableHighlight>

                <View style={[styles.e, { flex: 1, }]}>
                    <Text style={[common.text, { fontSize: 24, textAlign: 'left' }]} numberOfLines={1}>제목</Text>
                </View>

                <TouchableHighlight
                    underlayColor="#333"
                    onPress={() => {

                    }}
                    style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                    <Image source={searchIcon} style={[common.icon, {}]}></Image>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor="#333"
                    onPress={() => {

                    }}
                    style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                    <Image source={helpIcon} style={[common.icon, {}]}></Image>
                </TouchableHighlight>



            </View>

            <ScrollView style={[common.e, { width: '100%', padding: 10 }]}>
                {items != undefined && items.map((item, index) => (
                    <History key={index} idx={index} item={item} showEdit={openEditHistory}></History>
                ))}
            </ScrollView>

            <View style={[common.topRound, { width: '100%', backgroundColor: colors.modal, padding: 10 }]}>
                <View style={[common.fxr, { alignItems: 'center' }]}>
                    <Text style={[common.text, { flex: 1, fontSize: 20 }]}>빠른 기록 관리</Text>

                    <TouchableHighlight
                        underlayColor="#555"
                        onPress={() => {
                            setShowAddQuick(true);
                        }}
                        style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                        <Image source={addIcon} style={[common.icon, {}]}></Image>
                    </TouchableHighlight>
                </View>

                <ScrollView horizontal={true} style={[styles.s, { marginTop: 10 }]}>
                    {quicks != undefined && quicks.map((_, index) => (
                        <View key={index} style={[styles.s, { marginHorizontal: 10 }]}>
                            <ModalButton text={quicks[index].title}></ModalButton>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {showEditHistory && <EditHistoryModal show={setShowEditHistory} item={selectHis}></EditHistoryModal>}
            {showAddQuick && <AddQuickModal show={setShowAddQuick}></AddQuickModal>}
        </View>
    );
}

const styles = StyleSheet.create({})