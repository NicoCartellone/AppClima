import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Container from '../components/Container'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native'
import Constants from 'expo-constants'

const Home = ({ navigation }) => {
  // datosStorage contiene el array con los datos que se guardaron en el storage
  // filterDatosStorage contiene los datos de storage duplicados para filtralos en una funcion
  // search captura el input de la barra de busqueda
  const [datosStorage, setdatosStorage] = useState([])
  const [filterDatosStorage, setFilterDatosStorage] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getData()
  }, [])

  // se obtiene la data del storage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('datosFormulario')
      setdatosStorage(JSON.parse(jsonValue))
      setFilterDatosStorage(JSON.parse(jsonValue))
    } catch (error) {
      console.log(error)
    }
  }

  // Elimina las ciudades del state
  const eliminarCiudad = async (id) => {
    const ciudadesFiltradas = filterDatosStorage.filter(filterDatosStorage => filterDatosStorage.id !== id)
    setFilterDatosStorage(ciudadesFiltradas)
    const jsonValue = JSON.stringify(ciudadesFiltradas)
    await AsyncStorage.setItem('datosFormulario', jsonValue)
  }
  // funcion utilizada en el buscador para filtrar y mostar resultados
  const searchFilter = (text) => {
    if (text) {
      const newData = datosStorage.filter((item) => {
        const itemData = item.ciudad ? item.ciudad.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilterDatosStorage(newData)
      setSearch(text)
    } else {
      setFilterDatosStorage(datosStorage)
      setSearch(text)
    }
  }

  return (
    <Container>
      {datosStorage !== null && datosStorage.length !== 0
        ? (
          <>
            <StatusBar
              backgroundColor='#eaeaea'
              barStyle='dark-content'
            />
            <View style={styles.buscadorContainer}>
              <TextInput
                style={styles.buscador}
                value={search}
                placeholder='Buscar entre tus ciudades'
                placeholderTextColor='#666'
                underlineColorAndroid='transparent'
                onChangeText={(text) => searchFilter(text)}
              />
              <View style={{ position: 'absolute', right: 90 }}>
                <MaterialCommunityIcons name='magnify' color='gray' size={25} />
              </View>
            </View>
            <View style={styles.contain}>
              <FlatList
                data={filterDatosStorage}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <GestureHandlerRootView>
                    <Swipeable
                      renderRightActions={() => {
                        return (
                          <View style={styles.containerBtns}>
                            <TouchableOpacity
                              style={styles.btnBuscador}
                              onPress={() => eliminarCiudad(item.id)}
                            >
                              <LottieView
                                style={{ width: 60, height: 60, alignItems: 'center' }}
                                source={require('../../assets/delete2.json')}
                                autoPlay
                                resizeMode='contain'
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      }}
                    >
                      <View style={styles.flatListContainer}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Details', item)}
                        >

                          <View style={styles.containerText}>
                            <Text style={styles.textFlatList}>{item.ciudad}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Swipeable>
                  </GestureHandlerRootView>
                )}
              />
            </View>
          </>
          )
        : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar
              animated
              translucent
              backgroundColor='#192f6a'
              barStyle='light-content'
            />
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>No tienes ciudades guardadas</Text>
          </View>
          )}
      <TouchableOpacity
        style={styles.btnAgregarCiudad}
        onPress={() => navigation.navigate('Form')}
      >
        <MaterialCommunityIcons name='plus' color='#51608F' size={40} />
      </TouchableOpacity>
    </Container>
  )
}

export default Home

const styles = StyleSheet.create({
  contain: {
    height: '69%',
    marginBottom: 50
  },
  textFlatList: {
    marginRight: 10,
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: 'bold'
  },
  flatListContainer: {
    backgroundColor: '#eaeaea',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    height: 50,
    borderRadius: 10,
    alignItems: 'center'
  },
  buscadorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    bottom: Constants.statusBarHeight,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  buscador: {
    width: '70%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 20
  },
  btnBuscar: {
    right: 50,
    backgroundColor: '#eaeaea',
    zIndex: 100
  },
  containerBtnInput: {
    top: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerText: {
    // justifyContent: "flex-start",
    marginHorizontal: 40
  },
  btnBuscador: {
    // justifyContent: "center",
    bottom: 5
  },
  containerBtns: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: '7%',
    backgroundColor: '#FF0025',
    height: 50,
    top: 15,
    borderRadius: 15
  },
  btnAgregarCiudad: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 75,
    right: 20,
    backgroundColor: '#eaeaea',
    borderRadius: 100,
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  }
})
