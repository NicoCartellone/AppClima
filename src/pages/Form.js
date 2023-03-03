import { Text, StyleSheet, TouchableOpacity, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import shortid from 'shortid'
import Container from '../components/Container'

const formularioScheme = Yup.object().shape({
  // Schema validacion de datos del formulario
  ciudad: Yup.string()
    .min(3, 'Minino 3 caracteres')
    .max(20, 'Maximo de caracteres superado')
    .trim('No debe contener espacio al inicio y final')
    .required('Campo obligatorio'),
  pais: Yup.string()
    .required('Campo obligatorio')
})

const Form = ({ navigation }) => {
  // Esta funcion toma los datos del formulario y guarda en storage los datos del input, ademas contempla
  // las siguiente validacion: Existencia de la ciudad y pais, y verificaion de existencia de datos duplucados
  const handleSubmit = async (values) => {
    const pais = values.pais
    const ciudad = values.ciudad
    const appId = 'f3e0019459448698b2d30f3b5e803701'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    const respuesta = await fetch(url)
    const resultado = await respuesta.json()

    if (resultado.cod === '404') {
      mostrarAlertaNoHayResultado()
    } else {
      try {
        let datosFormulario = []
        const value = await AsyncStorage.getItem('datosFormulario')
        if (value) {
          datosFormulario = JSON.parse(value)
          if (datosFormulario.find((datosFormulario) => datosFormulario.ciudad.trim().toUpperCase() === values.ciudad.trim().toUpperCase())) {
            mostrarAlertaDuplicado()
            return
          } else {
            const id = shortid.generate()
            values.id = id
            datosFormulario.push(values)
            const jsonValue = JSON.stringify(datosFormulario)
            await AsyncStorage.setItem('datosFormulario', jsonValue)
            navigation.reset({
              index: 1,
              routes: [{ name: 'Home' }]
            })
          }
        } else {
          const id = shortid.generate()
          values.id = id
          datosFormulario.push(values)
          const jsonValue = JSON.stringify(datosFormulario)
          await AsyncStorage.setItem('datosFormulario', jsonValue)
          navigation.reset({
            index: 1,
            routes: [{ name: 'Home' }]
          })
        }
      } catch (error) {
        AsyncStorage.removeItem('datosFormulario')
        console.log(error)
      }
    }
  }

  const ocultarTecaldo = () => {
    Keyboard.dismiss()
  }

  // Alerta por si se ingresa una ciudad ya existente
  const mostrarAlertaDuplicado = () => {
    Alert.alert(
      'Cuidado',
      'Esta ciudad ya ha sido ingresada, intenta con una otra',
      [{ text: 'Entendido' }]
    )
  }

  // Alerta por si la ciudad ingresa no existe en la llamda a la api
  const mostrarAlertaNoHayResultado = () => {
    Alert.alert(
      'Cuidado',
      'No hay resultados para esta ciudad, intenta con otra',
      [{ text: 'Entendido' }]
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTecaldo()}>
      <Container>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainTab')}
          style={styles.goBackIcon}
        >
          <MaterialCommunityIcons name='arrow-left' color='white' size={50} />
        </TouchableOpacity>
        <Formik
          initialValues={{ pais: '', ciudad: '', id: '' }}
          validationSchema={formularioScheme}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Picker
                style={styles.picker}
                mode='dialog'
                selectedValue={values.pais}
                onValueChange={handleChange('pais')}
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
              {errors.pais && touched.pais
                ? (
                  <Text style={styles.errorPais}>{errors.pais}</Text>
                  )
                : null}
              <TextInput
                style={styles.input}
                placeholder='Ingrese la ciudad'
                placeholderTextColor='#666'
                onChangeText={handleChange('ciudad')}
                onBlur={handleBlur('ciudad')}
                value={values.ciudad}
              />
              {errors.ciudad && touched.ciudad
                ? (
                  <Text style={styles.errorCiudad}>{errors.ciudad}</Text>
                  )
                : null}
              <TouchableOpacity
                style={styles.btnGuardar}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTexto}>Guardar Ciudad</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default Form

const styles = StyleSheet.create({

  picker: {
    height: 50,
    backgroundColor: '#e3e3e3',
    color: 'black',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#e3e3e3',
    fontSize: 15,
    marginVertical: 50,
    marginHorizontal: 20,
    bottom: 30,
    textAlign: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  goBackIcon: {
    display: 'flex',
    position: 'absolute',
    top: 30,
    left: 10
  },
  btnGuardar: {
    alignItems: 'center',
    backgroundColor: '#000',
    marginHorizontal: '20%',
    height: 30,
    borderRadius: 20,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  btnTexto: {
    top: 5,
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  errorPais: {
    bottom: '1%',
    marginHorizontal: '6%',
    color: '#000',
    fontWeight: 'bold'
  },
  errorCiudad: {
    bottom: '11%',
    left: '6%',
    color: '#000',
    fontWeight: 'bold'
  }
})
