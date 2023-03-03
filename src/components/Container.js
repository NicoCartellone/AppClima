import { StyleSheet, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

// Componente que renderiza un fondo gradiente
const Container = ({ children }) => {
  return (
    <LinearGradient
      colors={['#192f6a', '#3b5998', '#4c669f']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Container

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
