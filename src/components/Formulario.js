import { useState } from 'react'
import { StyleSheet, TextInput, View, TouchableWithoutFeedback, Text, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'

// Coponente del formulario que hace la busqueda de ciudades en particular y que no se guardan en storage
const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
  const { pais, ciudad } = busqueda

  const [animacionboton] = useState(new Animated.Value(1))
  // validacion al ingresar datos en el formulario
  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta()
      return
    }

    // cambia el estado para consultar la api
    guardarConsultar(true)
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Agrega una ciudad y país para realizar la búsqueda',
      [{ text: 'Entendido' }]
    )
  }

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.9,
      useNativeDriver: true
    }).start()
  }
  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true
    }).start()
  }

  const estiloAnimacion = {
    transform: [{ scale: animacionboton }]
  }

  return (
    <>
      <View>
        <Picker
          style={styles.picker}
          selectedValue={pais}
          onValueChange={pais => guardarBusqueda({ ...busqueda, pais })}
          mode='dialog'
        >
          <Picker.Item label='Seleccione un país' value='' />
          <Picker.Item label='Argentina' value='AR' />
          <Picker.Item label='Brasil' value='BR' />
          <Picker.Item label='Colombia' value='CO' />
          <Picker.Item label='Chile' value='CL' />
          <Picker.Item label='España' value='ES' />
          <Picker.Item label='Francia' value='FR' />
          <Picker.Item label='Alemania' value='DE' />
          <Picker.Item label='Rusia' value='RU' />
          <Picker.Item label='Italia' value='IT' />
          <Picker.Item label='Emiratos Arabes' value='AE' />
        </Picker>
      </View>
      <View>
        <TextInput
          value={ciudad}
          style={styles.input}
          onChangeText={ciudad => guardarBusqueda({ ...busqueda, ciudad })}
          placeholder='Escriba una ciudad'
          placeholderTextColor='#666'
        />
      </View>
      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={() => consultarClima()}
      >
        <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 50,
    textAlign: 'center',
    borderRadius: 15,
    borderColor: 'gray'
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 15,
    bottom: 10
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18
  },
  picker: {
    height: 10,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 15,
    bottom: 20
  }
})

export default Formulario
