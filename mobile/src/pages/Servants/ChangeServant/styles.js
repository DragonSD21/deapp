import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#FFF",
        height: 380,
        marginTop: 80,
        marginBottom: 200,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    textModalHeader: {
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 30,
    },

    containerForm: {
        width: 280,
    },

    textPropTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    textInputPropValue: {
        borderBottomWidth: 1,
        fontSize: 18,
    },

    containerPickerTypeServants: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
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