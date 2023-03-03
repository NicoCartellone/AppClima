import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions, Image, StatusBar } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Container from '../components/Container'
import LottieView from 'lottie-react-native'

// Details: esta screen muestra los detalles de la ciudad elegida por el usuario
// se muetra temperatura, sensacion termina, presion, humedad, temp minima y maxima y ademas incluye
// un modal para mostrar un mapa

const Details = ({ navigation, route }) => {
  // se declaran las variables y los estados

  const size = Dimensions.get('window').width * 0.5

  const ciudad = route.params.ciudad
  const pais = route.params.pais

  const [temperatura, setTemperatura] = useState('')
  const [latitud, setLatitud] = useState(0)
  const [longitud, setLongitud] = useState(0)
  const [view, setView] = useState(false)
  const kelvin = 273.15
  const tempActual = parseInt(temperatura - kelvin)
  const [icon, setIcon] = useState('')
  const [feelslike, setfeelslike] = useState('')
  const fellsActual = parseInt(feelslike - kelvin)
  const [tempMax, setTempMax] = useState('')
  const [tempMin, setTempMin] = useState('')
  const [presion, setPresion] = useState('')
  const [humedad, setHumedad] = useState('')

  // useEffect para llamar a la api

  useEffect(() => {
    const consultaApi = async () => {
      const appId = 'fe45a7c6ad0948be418a88f00ba462af'
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setLatitud(resultado.coord.lat)
        setLongitud(resultado.coord.lon)
        setTemperatura(resultado.main.temp)
        setIcon(resultado.weather[0].icon)
        setfeelslike(resultado.main.feels_like)
        setTempMax(resultado.main.temp_max)
        setTempMin(resultado.main.temp_min)
        setPresion(resultado.main.pressure)
        setHumedad(resultado.main.humidity)
      } catch (error) {

      }
    }
    consultaApi()
  }, [])

  return (
    <Container>
      <StatusBar
        animated
        translucent
        backgroundColor='#192f6a'
        barStyle='light-content'
      />
      <TouchableOpacity
        style={styles.btnVolver}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name='arrow-left' color='white' size={50} />
      </TouchableOpacity>
      {temperatura !== ''
        ? (
          <View style={styles.contain}>
            <Text style={styles.ciudad}>{ciudad}</Text>
            <View style={styles.containerTemp}>
              <Text style={styles.tempActual}> {tempActual} &#x2103;</Text>
              <Image
                style={{ width: 66, height: 58, top: '8%', left: '20%' }}
                source={{ uri: `http://openweathermap.org/img/w/${icon}.png` }}
              />
            </View>
            <View style={styles.FellsLike}>
              <Text style={{ marginRight: '1%', color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                ST:
              </Text>
              <Text style={styles.fellsActual}>{fellsActual} &#x2103;</Text>
            </View>
            <View style={styles.minMax}>
              <Text style={styles.textMinMax}>Min {parseInt(tempMin - kelvin)}&#x2103;</Text>
              <Text style={styles.textMinMax}>Max {parseInt(tempMax - kelvin)}&#x2103;</Text>
            </View>
            <View style={styles.PresHum}>
              <Text style={styles.textPresHum}>Presión: {presion} hPa</Text>
              <Text style={styles.textPresHum}>Humedad: {humedad} %</Text>
            </View>
            <View>
              <LottieView
                style={{ width: size + 50, height: size + 50, marginTop: '5%' }}
                autoPlay
                loop
                resizeMode='contain'
                source={require('../../assets/mapaicon.json')}
              />
              <View style={{ bottom: 30 }}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => { setView(true) }}
                >
                  <Text style={styles.btnText}>Abrir Mapa</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType='fade'
              transparent
              visible={view}
            >
              <View
                style={{ flex: 1, backgroundColor: 'rgba(1,1,1,0.5)', justifyContent: 'center', alignItems: 'center' }}
              >
                <View
                  style={{ height: '75%', width: '90%', backgroundColor: '#fff' }}
                >
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: latitud,
                      longitude: longitud,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: latitud,
                        longitude: longitud
                      }}
                      title={ciudad}
                      description={pais}
                    />
                  </MapView>
                  <TouchableOpacity style={styles.btnModal} onPress={() => { setView(false) }}>
                    <MaterialCommunityIcons name='arrow-left' color='black' size={35} />
                    <Text style={styles.btnTextoModal}>Volver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          )
        : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>Cargando..</Text>
          </View>
          )}

    </Container>
  )
}

export default Details

const styles = StyleSheet.create({
  contain: {
    alignItems: 'center',
    marginTop: '10%'
  },
  btn: {
    marginBottom: '5%',
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 15
  },
  btnVolver: {
    display: 'flex',
    position: 'absolute',
    top: 40,
    left: 10
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%'
  },
  btnModal: {
    display: 'flex',
    position: 'absolute',
    zIndex: 100,
    padding: 10
  },
  btnTextoModal: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black'
  },
  fellsActual: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  ciudad: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  tempActual: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold'
  },
  containerTemp: {
    flexDirection: 'row'
  },
  FellsLike: {
    flexDirection: 'row'
  },
  minMax: {
    flexDirection: 'row',
    marginTop: '2%',
    marginHorizontal: '10%'
  },
  textMinMax: {
    fontWeight: 'bold',
    color: 'white',
    marginRight: '4%',
    marginLeft: '11%',
    fontSize: 20
  },
  PresHum: {
    flexDirection: 'row',
    marginHorizontal: '20%'
  },
  textPresHum: {
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: '8%',
    fontSize: 20
  }
})
