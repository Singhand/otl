import { StyleSheet, Text, View, Pressable, Image, TouchableHighlight, ScrollView, TextInput, Alert } from 'react-native'
import React, { useEffect, useState, useMemo, useRef } from 'react'

import { useDispatch, useSelector } from "react-redux";

import { common, colors } from '../style';

import History from './History';
import EditHistoryModal from './EditHistoryModal';
import ModalButton from './ModalButton';
import AddQuickModal from './AddQuickModal';
import EditQuickModal from './EditQuickModal';
import TextInputLine from './TextInputLine';

import backIcon from '../assets/imgs/back.svg'
import helpIcon from '../assets/imgs/help.svg'
import searchIcon from '../assets/imgs/search.svg'
import addIcon from '../assets/imgs/add.svg'

import * as HistoryDAO from '../sqlite/history';
import * as QuickDAO from '../sqlite/quick';

export default function Detail({ route, navigation }) {
    const { itemId } = route.params;

    // state
    const [showEditHistory, setShowEditHistory] = useState(false)
    const [selectHis, setSelectHis] = useState(0)
    const [selectQuickIdx, setSelectQuickIdx] = useState(-1)
    const [showAddQuick, setShowAddQuick] = useState(false)
    const [showEditQuick, setShowEditQuick] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [searchWord, setSearchWord] = useState('')

    // ref
    const searchInputRef = useRef(null);

    // Redux
    const dispatch = useDispatch();
    let items = useSelector(state => state.history.items[`${itemId}`]);
    let quicks = useSelector(state => state.quick.items[`${itemId}`]);


    useEffect(() => {
        console.log('useEffect-Detail', itemId);
        HistoryDAO.setSearchWord('')
        HistoryDAO.init(itemId, dispatch)
    }, []);

    function focusTextInput() {
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 10);
    };

    function searchHis() {
        HistoryDAO.setSearchWord(searchWord)
        HistoryDAO.init(itemId, dispatch)
    }

    function openEditHistory(item) {
        setSelectHis(item);
        setShowEditHistory(true)
    }

    function openEditQuick(idx) {
        setSelectQuickIdx(idx)
        setShowEditQuick(true)
    }

    function clearHistory(params) {
        Alert.alert('기록 초기화', '기록들이 모두 삭제됩니다.', [
            {
                text: '취소',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '삭제', onPress: () => {
                    console.log('OK Pressed');

                }, style: 'destructive',
            },
        ]);

        HistoryDAO.clear(itemId, dispatch)
    }

    const iter = Array(20).fill(null);
    return (
        <View style={{ backgroundColor: '#222', flex: 1, alignItems: 'center' }}>

            <View style={[common.fxr, { width: '100%', alignItems: 'center', padding: 10 }]}>
                <TouchableHighlight
                    underlayColor="#333"
                    onPress={() => {
                        navigation.goBack()
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
                        setShowSearch(!showSearch)
                        focusTextInput();
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

                <TouchableHighlight
                    underlayColor="#333"
                    onPress={() => {
                        clearHistory()
                    }}>
                    <Text style={[common.text, { padding: 10 }]}>초기화</Text>
                </TouchableHighlight>
            </View>

            {showSearch &&
                <View style={[common.fxr, { width: '100%', alignItems: 'center', justifyContent: 'center', padding: 10 }]}>
                    <TextInputLine placeholder={'검색어를 입력하세요'} value={searchWord} set={setSearchWord} forRef={searchInputRef}></TextInputLine>
                    <TouchableHighlight
                        underlayColor="#333"
                        onPress={() => {
                            searchHis()
                        }}
                        style={[styles.e, { justifyContent: 'center', borderRadius: 100, padding: 10 }]}>
                        <Image source={searchIcon} style={[common.icon, {}]}></Image>
                    </TouchableHighlight>
                </View>}

            <View>
                <Text style={[common.text, { color: 'gray' }]}>총 기록 개수 {items == undefined ? 0 : items.length}개</Text>
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
                            <ModalButton text={quicks[index].title} idx={index} click={openEditQuick}></ModalButton>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {showEditHistory && <EditHistoryModal show={setShowEditHistory} item={selectHis}></EditHistoryModal>}
            {showAddQuick && <AddQuickModal show={setShowAddQuick} itemId={itemId}></AddQuickModal>}
            {showEditQuick && <EditQuickModal item={quicks[selectQuickIdx]} idx={selectQuickIdx} show={setShowEditQuick}></EditQuickModal>}
        </View>
    );
}

const styles = StyleSheet.create({})