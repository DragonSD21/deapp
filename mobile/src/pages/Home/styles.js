import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        // justifyContent: 'center', //Alinhar na vertical
        alignItems: 'center', //Alinhar na horizontal
        backgroundColor: '#000',
    },

    //Modal login
    containerModal: {
        backgroundColor: "#FFF",
        height: 300,
        marginTop: 110,
        marginBottom: 200,
        marginHorizontal: 20,
        alignItems: 'center',
        borderRadius: 8,
    },

    textTitleModal: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 10,
    },

    containerForm: {
        width: 280,
    },

    textUserPassword: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    textInputLogin: {
        borderBottomWidth: 1,
        fontSize: 18,
    },
    containerPassword: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    textInputPassword: {
        fontSize: 18,
    },

    containerButtonsModal: {
        marginTop: 40,
        paddingHorizontal: 25,
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

    buttonMain: {
        marginTop: 20,
        width: 200,
        height: 60,
        backgroundColor: '#3e56e8',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: "#FFF",
    },
    textButton: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold'
    },

    buttonExit: {
        marginTop: 65,
    },
    textExit: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },

});