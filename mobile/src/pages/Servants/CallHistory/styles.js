import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#FFF",
        height: 200,
        marginVertical: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textModalHeader: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
    },
    containerButtonsModal: {
        marginTop: 25,
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

    //Pesquisar dia
    containerSearchDay: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: 10,
    },
    searchDay: {
        backgroundColor: "#FFF",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingHorizontal: 20,
    },

    //Lista dias
    list: {
        // paddingHorizontal: 20,
        paddingLeft: 20,
        // borderWidth: 2,
        // borderColor: '#F00'
    },
    buttonDay: {
        backgroundColor: '#000',
        padding: 10,
        flexDirection: 'row',
    },
    textButtonDay: {
        fontSize: 32,
        // fontWeight: "bold",
        color: "#fff",
        textAlign: 'left',
    },

    //Parte inferior
    containerBottom: {
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonCallReset: {
        backgroundColor: "#3e56e8",
        width: 250,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    textButtonCallReset: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },

});