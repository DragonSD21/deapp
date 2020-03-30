import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        // justifyContent: 'center', //Alinhar na vertical
        alignItems: 'center', //Alinhar na horizontal
        backgroundColor: '#141932',
    },

    //Login
    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 270,
        marginTop: 150,
        marginBottom: 200,
        marginHorizontal: 20,
        alignItems: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textTitleModal: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 10,
    },
    textLoginPassword: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: 300,
        height: 50,
        padding: 5,
    },
    containerButtonsDoneClear: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        width: 280,
    },
    buttonsDoneClear: {
        height: 50,
        width: 60,
        borderWidth: 2,
        borderColor: "#979191",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    textTitle: {
        fontSize: 80,
        color: '#FFF',
        fontWeight: 'bold'
    },
    icon: {
        marginTop: 20,
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    buttonServos: {
        marginTop: 50,
        width: 200,
        height: 60,
        backgroundColor: '#3e56e8',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "#fff",
    },
    buttonEncontristas: {
        marginTop: 20,
        width: 200,
        height: 60,
        backgroundColor: '#3e56e8',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "#fff",
    },
    textButton: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonExit: {
        marginTop: 50,
        width: 120,
        height: 50,
        backgroundColor: '#3e56e8',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#fff",
    },
    textExit: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },

});