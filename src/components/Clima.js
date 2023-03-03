import { StyleSheet, View, Text, Image } from 'react-native'

// Este componente renderiza los datos relacionados a la temperatura mediate la llamada a la api
const Clima = ({ resultado }) => {
  const { name, main } = resultado

  if (!name) return null

  // kelvin a grados
  const kelvin = 273.15

  return (
    <View style={styles.clima}>
      <View>
        <Text style={styles.nombreTexto}>{name}</Text>
      </View>
      <Text style={[styles.texto, styles.actual]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temperatura}>
          &#x2103;
        </Text>
        <Image
          style={{ width: 66, height: 58 }}
          source={{ uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png` }}
        />
      </Text>
      <View style={styles.temperaturas}>
        <Text style={styles.texto}> Min {' '}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_min - kelvin)} &#x2103;
          </Text>
        </Text>

        <Text style={styles.texto}> Max {' '}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_max - kelvin)} &#x2103;
          </Text>
        </Text>
      </View>
      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          <Text style={styles.presion}> Presión:{' '}
            {main.pressure} hPa
          </Text>
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.humedad}> Humedad:{' '}
            {main.humidity} %
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
    bottom: 60
  },
  texto: {
    color: '#ffff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold'
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  humedad: {
    fontWeight: 'bold',
    fontSize: 15
  },
  presion: {
    fontWeight: 'bold',
    fontSize: 15
  },
  nombreTexto: {
    color: '#ffff',
    fontSize: 30,
    textAlign: 'center',
    marginRight: 20,
    fontWeight: 'bold',
    marginBottom: 15
  }
})

export default Clima
