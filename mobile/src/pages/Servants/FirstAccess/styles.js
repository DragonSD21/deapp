import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerWarning: {
        marginTop: -50,
        backgroundColor: '#000',
        paddingHorizontal: 20,
    },
    textWarning: {
        marginTop: 5,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF'
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

    button: {
        backgroundColor: "#3e56e8",
        marginTop: 50,
        width: 320,
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