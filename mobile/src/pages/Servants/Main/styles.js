import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1
    },

    containerIconMenu: {
        padding: 5,
    },

    containerMenu: {
        backgroundColor: '#FFF',
        width: 250,
        height: '100%',
        alignSelf: "flex-end",
        // borderWidth: 1,
        
        position: 'absolute',
    },
    textHeaderMenu: {
        paddingVertical: 10,
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 1,
    },
    buttonsMenu: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textButtonsMenu: {
        fontSize: 22,
        marginLeft: 10,
    },

    //Modal Cadastrar
    containerModal: {
        backgroundColor: "#FFF",
        height: 470,
        marginTop: 30,
        marginBottom: 200,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    textModalHeader: {
        marginVertical: 10,
        fontWeight: "bold",
        fontSize: 30,
    },
    textInputNewServants: {
        backgroundColor: "#fff",
        marginTop: 10,
        width: 300,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 8,
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
    
    //Botões superiores
    containerButtonsTop: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonsTop: {
        backgroundColor: "#3e56e8",
        width: 150,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    textButtonsTop: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
    },

    //Pesquisar Servo
    containerSearchServants: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 10,
    },
    searchServants: {
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
        marginTop: 5,
    },
    textAbsences: {
        fontSize: 16,
        fontWeight: "bold",
    },

    //Botões inferiores
    containerButtonsBottom: {
        padding: 20,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonsBottom: {
        backgroundColor: "#3e56e8",
        width: 80,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    textButtonsBottom: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFF",
    },
});