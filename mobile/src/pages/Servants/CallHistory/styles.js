import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 200,
        marginVertical: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textModalHeader: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center',
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

    //Pesquisar dia
    containerSearchDay: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: 10,
    },
    searchDay: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingHorizontal: 20,
    },

    //Lista dias
    scrollView: {
        // marginBottom: 10,
    },
    headerAccordion: {
        backgroundColor: '#141932',
        padding: 10,
        flexDirection: 'row',
    },
    textHeaderAccordion: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'left',
    },
    contentAccordion: {
        backgroundColor: '#141932',
        marginLeft: 30,
    },
    textContentAccordion: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'left',
    },

    //Parte inferior
    containerBottom: {
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonCallReset: {
        backgroundColor: "#3e56e8",
        width: 250,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonCallReset: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },

});