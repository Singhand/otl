import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import {
    RewardedInterstitialAd,
    RewardedAdEventType,
    TestIds,
} from 'react-native-google-mobile-ads';

const unitID =
    Platform.select({
        ios: 'ca-app-pub-복사한ID',
        android: 'ca-app-pub-1583983896718087/2773036441',
    }) || '';

const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : unitID;

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
});

export default function HistoryAd() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => {
                console.log('set load true')
                setLoaded(true);
            },
        );
        const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded interstitial ad straight away
        rewardedInterstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    if (!loaded) {
        return null;
    } else {
        console.log('load true')
        rewardedInterstitial.show();
    }

    return (
        <View>
        </View>
    )
}

const styles = StyleSheet.create({})