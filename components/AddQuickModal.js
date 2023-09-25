import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { common, colors } from '../style';
import getFontSize from '../utils/getFontSize'

import ModalButton from './ModalButton';
import TextInputLine from './TextInputLine';

import * as QuickDAO from '../sqlite/quick';


export default function AddQuickModal({ show, click, itemId }) {
    // Redux
    const dispatch = useDispatch();

    // state
    const [showPage, setShowPage] = useState(0) // 선택 타입
    const [type1title, setType1title] = useState('');
    const [type2title, setType2title] = useState('');

    function add() {
        let quickAdd = {
            itemId,
            prefix: '',
            suffix: '',
        }

        if (showPage == 1) {
            if (type1title.length > 0 && type1title.length <= 100) {
                quickAdd['title'] = type1title
                quickAdd['type'] = 1
                QuickDAO.add(quickAdd, dispatch)
            }
        } else if (showPage == 2) {
            if (type2title.length > 0 && type2title.length <= 100) {
                quickAdd['title'] = type2title
                quickAdd['type'] = 2
                QuickDAO.add(quickAdd, dispatch)
            }
        }
    }

    return (
        <View style={[common.modalBg, { flexDirection: 'row' }]}>
            <View style={[common.modal, {}]}>
                <View style={[styles.fxr, { flexDirection: 'row', marginBottom: 10 }]}>
                    <Text style={[common.text, { fontWeight: 'bold', }]}>빠른 기록 추가</Text>
                </View>

                {showPage == 0 && <View><ModalButton text={'고정 텍스트'} idx={1} click={setShowPage}> </ModalButton>
                    <View style={[styles.w, { height: 10 }]}></View>
                    <ModalButton text='직접 입력' idx={2} click={setShowPage}> </ModalButton></View>}

                {showPage == 1 && <View>
                    <TextInputLine value={type1title} set={setType1title} placeholder={'고정 텍스트를 입력하세요'}></TextInputLine>
                </View>}

                {showPage == 2 && <View>
                    <TextInputLine value={type2title} set={setType2title} placeholder={'표시될 이름을 입력하세요'}></TextInputLine>
                </View>}

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row', marginTop: 10 }]}>
                    <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>닫기</Text>


                    </TouchableHighlight>

                    {showPage != 0 && <TouchableHighlight
                        underlayColor="#292929"
                        onPress={() => {
                            add();
                            show(false);
                        }}>

                        <Text style={[common.text, { fontWeight: 'bold', padding: getFontSize(10), }]}>추가</Text>


                    </TouchableHighlight>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})