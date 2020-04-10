import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
    },

    textWarning: {
        fontSize: 18,
        padding: 20,
        textAlign: 'justify',
    },

    containerForm: {
        padding: 5,
        marginBottom: 30,
        width: 330,
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

    textUser: {
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

    button: {
        backgroundColor: "#3e56e8",
        marginTop: 50,
        width: 100,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
});