import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        padding: 20,
    },

    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 350,
        marginTop: 50,
        marginBottom: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textHeaderModal:{
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },

    containerForm: {
        paddingHorizontal: 5,
        marginBottom: 30,
        width: 320,
    },

    textTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
    },
    textInputUser: {
        marginTop: 5,
        borderBottomWidth: 1,
        fontSize: 18,
        paddingVertical: 2,
    },
    containerPassword: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
        marginTop: 5,
    },
    textInputPassword: {
        fontSize: 18,
        width: 280,
    },

    containerButtonsModal: {
        marginTop: 25,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    buttonsModal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButtonsModal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3866B7',
    },

    textPropTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: '#FFF',
    },
    textPropValue: {
        fontSize: 20,
        color: '#FFF',
    },

    buttonChangePassword: {
        backgroundColor: "#3e56e8",
        marginTop: 50,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF'
    },
    textButtonChangePassword: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },

});