import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import React, { useState } from 'react'
import { common, text } from '../style';
import { appThemeColor, appLang } from '../utils/appSetting'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import * as DocPick from 'expo-document-picker'
import { close, open } from '../sqlite/database'
import { useDispatch, useSelector } from "react-redux";

import ModalButton from './ModalButton';

import Toast from 'react-native-root-toast';

import * as UserDAO from '../sqlite/user';

export default function SettingModal({ show, reload }) {
    // Redux
    const dispatch = useDispatch();
    let appTheme = useSelector(state => state.user.theme);
    let appLang = useSelector(state => state.user.lang);

    // 백업
    async function exportDb(params) {
        if (Platform.OS === "android") {
            console.log('hi android')
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const content = await FileSystem.readAsStringAsync(
                    FileSystem.documentDirectory + 'SQLite/main.db',
                    {
                        encoding: FileSystem.EncodingType.Base64
                    }
                )

                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'main.db',
                    'application/octet-stream'
                ).then(async (uri) => {
                    console.log(uri)
                    await FileSystem.writeAsStringAsync(uri, content, {
                        encoding: FileSystem.EncodingType.Base64
                    })
                    toast()
                })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        } else {
            await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/main.db')
        }
    }

    async function importDb(params) {
        let result = await DocPick.getDocumentAsync({
            copyToCacheDirectory: true
        })

        console.log(result)

        if (result != undefined && result.assets != null) {
            console.log('ok')
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
                console.log('no dir')
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite')
            }

            console.log(result.assets[0].uri)

            const content = await FileSystem.readAsStringAsync(
                result.assets[0].uri,
                {
                    encoding: FileSystem.EncodingType.Base64
                }
            )

            await close()
            await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/main.db', content, {
                encoding: FileSystem.EncodingType.Base64
            })

            open()

            Alert.alert('백업 완료', '앱을 새로고침해 주세요', [
                {
                    text: '새로고침', onPress: () => {
                        reload()
                    }, style: 'destructive',
                },
            ]);
        }
    }

    function changeTheme(params) {
        UserDAO.updateTheme(appTheme == 0 ? 1 : 0, dispatch)
        show(false)
    }

    function changeLang(params) {
        UserDAO.updateLang(appLang == 0 ? 1 : 0, dispatch)
        show(false)
    }

    function toast() {
        // Add a Toast on screen.
        let toast = Toast.show(text.backup, {
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
            <View style={[common.modal, { backgroundColor: appThemeColor.modal }]}>
                <View style={[styles.fxr, { flexDirection: 'row', marginBottom: 10 }]}>
                    <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', }]}>설정</Text>
                </View>

                <ModalButton text={'데이터 내보내기'} idx={1} click={exportDb}> </ModalButton>
                <View style={[styles.w, { height: 10 }]}></View>
                <ModalButton text='데이터 가져오기' idx={2} click={importDb}> </ModalButton>
                <View style={[styles.w, { height: 10 }]}></View>
                <ModalButton text='다크모드 / 라이트모드' idx={3} click={changeTheme}> </ModalButton>
                <View style={[styles.w, { height: 10 }]}></View>
                <ModalButton text='한국어 / English' idx={4} click={changeLang}> </ModalButton>

                <View style={[styles.fxr, { justifyContent: 'flex-end', flexDirection: 'row', marginTop: 10 }]}>
                    <TouchableHighlight
                        underlayColor={appThemeColor.modalButtonClk}
                        onPress={() => {
                            show(false);
                        }}>

                        <Text style={[common.text, { color: appThemeColor.text }, { fontWeight: 'bold', padding: 10, }]}>닫기</Text>


                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})