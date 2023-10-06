import { StyleSheet, Text, View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import React from 'react'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

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