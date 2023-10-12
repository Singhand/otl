import { StyleSheet, Text, View, Platform } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import React from 'react'

const unitID =
    Platform.select({
        ios: 'ca-app-pub-복사한ID',
        android: 'ca-app-pub-1583983896718087/2427467801',
    }) || '';

const adUnitId = __DEV__ ? TestIds.BANNER : unitID;

export default function MyAdBanner() {
    return (
        <View style={[styles.adBanner, {}]}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    adBanner: {
        width: '100%',
        height: '10%',
    }
})