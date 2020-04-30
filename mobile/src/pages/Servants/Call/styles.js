import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1
    },

    //Parte superior
    containerTop: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
    },
    date: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center',
    },

    //Pesquisar servo
    containerSearchServant: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: -5,
    },
    searchServant: {
        backgroundColor: "#fff",
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingHorizontal: 20,
    },

    //Lista de servo
    list: {
        paddingHorizontal: 20,
    },
    containerItem: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#DDD",
        padding: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },

    containerHorizontal: {
        flexDirection: 'row',
        width: 310,
        marginRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textName: {
        width: 220,
        marginHorizontal: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: 'center',
    },
    containerAbsences: {
        height: 50,
        width: 80, //70
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
    textJustification: {
        marginTop: 5,
        fontSize: 18,
        width: '100%',
        borderBottomWidth: 1,
    },

    //Parte inferior
    containerBottom: {
        padding: 20,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonBottom: {
        backgroundColor: "#3e56e8",
        width: 100,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    textButtonsBottom: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
});