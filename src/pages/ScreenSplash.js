import { useEffect } from 'react'
import { Dimensions, StyleSheet, View, StatusBar, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import SplashScreen from '../../assets/screensplash.json'
import Container from '../components/Container'

// Esta screen corresponde a la animacion inicial

const size = Dimensions.get('window').width * 0.5

const ScreenSplash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DescriptionApp' }]
      })
    }, 4000)
  }, [])

  return (
    <Container>
      <View style={styles.contain}>
        <StatusBar
          animated
          backgroundColor='#192f6a'
          barStyle='light-content'
        />
        <LottieView
          style={{ width: size + 50, height: size + 50, right: 8 }}
          autoPlay
          loop
          resizeMode='contain'
          source={SplashScreen}
        />
        <Text style={styles.texto}>ClimaApp</Text>
      </View>
    </Container>
  )
}

export default ScreenSplash

const styles = StyleSheet.create({
  contain: {
    alignItems: 'center',
    marginBottom: '10%'
  },
  texto: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30%'
  }
})
