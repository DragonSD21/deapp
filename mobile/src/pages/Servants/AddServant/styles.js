import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: 'center',
    },

    containerForm: {
        marginVertical: 10,
        marginHorizontal: 30,
        // justifyContent: 'space-around',
    },
    textPropTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    textInputPropValue: {
        borderBottomWidth: 1,
        fontSize: 20,
    },
    containerPickerTypeServants: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 8,
    },

    containerButtonsBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
    },
    buttonsBottom: {
        backgroundColor: "#3e56e8",
        marginTop: 50,
        width: 100,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonsBottom: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
    
});