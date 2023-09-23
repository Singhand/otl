import { StyleSheet } from "react-native";

export const colors = {
    text: "#fff",
    bg: "#222",
    buttonClk: "#333",
    modal: "#333",
    modalBg: "#00000080",
    modalButtonClk: "",
}

export const size = {
    round: 10
}

export const common = StyleSheet.create({
    bg: {

    },
    text: {
        color: colors.text,
        fontSize: 16
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: colors.text,
    },
    fxr: {
        flexDirection: 'row'
    },
    input: {

    }
    ,
    normal: {
    },
    bold: {
        fontWeight: 'bold'
    },

    // Modal
    modalBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '90%',
        height: 'fit-content',
        padding: 20,
        backgroundColor: '#333',
        borderRadius: size.round,
    },
    round: {
        borderRadius: size.round,
    },
    topRound: {
        borderTopLeftRadius: size.round,
        borderTopRightRadius: size.round,
    },

})
