import React, { Component  } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles';

function AddServant({ navigation }) {

    return (
      <>

      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View>
          
        </View>
    </KeyboardAvoidingView>

  <Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => { 
      setOpacityBackground(1);
      setModalVisible(!modalVisible) 
  }}
  >
  <View style={styles.containerModal}>
      <Text style={styles.textModalHeader}>Novo servo</Text>

      <View style={styles.containerForm}>
          <Text style={styles.textPropTitle}>Nome</Text>
          <TextInput
              style={styles.textInputPropValue}
              placeholder="Digite o nome do novo servo"
              placeholderTextColor="#999"
              autoCapitalize="words"
              autoCorrect={false}
              value={nameNewServant}
              onChangeText={() => {
                  setNameNewServant(nameNewServant);
                  var aux = nameNewServant.split(" ");
                  
              }}
          />

          <Text style={styles.textPropTitle}>Login (por padrão o primeiro e ultimo nome)</Text>
          <TextInput
              style={styles.textInputPropValue}
              autoCapitalize="none"
              autoCorrect={false}
              value={loginNewServant}
              onChangeText={setLoginNewServant}
          />
          
          <Text style={styles.textPropTitle}>Senha (provisória)</Text>
          <TextInput
              style={styles.textInputPropValue}
              autoCapitalize="none"
              autoCorrect={false}
              value={passwordNewServant}
              onChangeText={setPasswordNewServant}
          />

          <Text style={styles.textPropTitle}>Tipo do novo servo</Text>
          <View style={styles.containerPickerTypeServants}>
              <Picker
                  selectedValue={typeServant}
                  onValueChange={(itemValue, itemIndex) => {
                      setTypeServant(itemValue);
                  }}
              >
                  <Picker.Item label="Servo" value="Servo" />
                  <Picker.Item label="Servo responsável pela chamada" value="Servo responsável pela chamada" />
                  <Picker.Item label="Servo responsável geral" value="Servo responsável geral" />
              </Picker>
          </View>
      </View>

      <View style={styles.containerButtonsDoneClear}>
          <TouchableOpacity
              style={styles.buttonsDoneClear}
              onPress={() => { 
                  setOpacityBackground(1);
                  setModalVisible(!modalVisible);
              }}
          >
              <MaterialIcons name="clear" size={50} color="#FF0000" />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.buttonsDoneClear}
              onPress={() => { 
                  setOpacityBackground(1);
                  setModalVisible(!modalVisible)
              }}
          >
              <MaterialIcons name="done" size={50} color="#247E16" />
          </TouchableOpacity>
      </View>

  </View>

  </Modal>
</>
    );
}

export default AddServant;