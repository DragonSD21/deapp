import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#141932",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#E7E7E7",
        height: 320,
        marginTop: 80,
        marginBottom: 200,
        marginHorizontal: 10,
        alignItems: 'center',
        borderColor: "#4278D0",
        borderWidth: 1,
    },
    textModalHeader: {
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 30,
    },
    textInputNameServant: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: 300,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 8,
    },
    containerTextInputAbsencesServant: {
        backgroundColor: "#fff",
        flexDirection: "row",
        marginTop: 10,
        width: 300,
        height: 40,
        paddingHorizontal: 8,
        alignItems: "center",
    },
    textInputAbsencesServant: {
        backgroundColor: "#fff",
        width: 200,
        fontSize: 16,
        marginTop: 3,
    },
    containerPickerTypeServant: {
        backgroundColor: "#fff",
        marginTop: 10,
    },
    pickerTypeServant: {
        height: 50,
        width: 300,
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

    //Pesquisar servos
    containerSearchServant: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginTop: 10,
    },
    searchServant: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingHorizontal: 20,
    },

    //Lista de servos
    list: {
        paddingHorizontal: 20,
    },
    containerItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
    },
    containerName: {
        flex: 1,
    },
    textName: {
        width: 200,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: 'center',
    },
    containerAbsences: {
        height: 50,
        width: 80,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAbsences: {
        fontSize: 16,
        fontWeight: "bold",
    },
});