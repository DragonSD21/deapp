import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1
    },

    containerTop: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDate: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center',
    },

    //Pesquisar servos
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

    //Lista de servos
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
        width: 70,
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

    containerJustification: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#cbcbcb",
        justifyContent: 'center',
        marginTop: 5,
    },
    textJustification: {
        fontSize: 16,
    },

});