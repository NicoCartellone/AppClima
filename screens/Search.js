import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, StatusBar, Alert } from 'react-native'
import Formulario from '../components/Formulario';
import Clima from '../components/Clima';
import Container from '../components/Container';


//Esta pantalla corresponde a la busqueda de ciudades en particular que no van a quedar almacenadas
const Search = () => {
    const [busqueda, guardarBusqueda] = useState({
        ciudad: "",
        pais: "",
    });
    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});
    const [bgcolor, guardarBgcolor] = useState('#012A4A');
    const { ciudad, pais } = busqueda;

    //effect con llamado a la api mostrar datos y cambiar el color de la pantalla segun la temperatura obtenida
    useEffect(() => {
        const consultarClima = async () => {
            if (consultar) {
                const appId = 'fe45a7c6ad0948be418a88f00ba462af';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

                try {
                    const respuesta = await fetch(url);
                    const resultado = await respuesta.json();
                    guardarResultado(resultado);
                    guardarConsultar(false);
                    //modifica los colores de fondo basados en la temperatura
                    const kelvin = 273.15;
                    const { main } = resultado;
                    const actual = main.temp - kelvin;

                    if (actual < 10) {
                        guardarBgcolor('#3287c4');
                    } else if (actual >= 10 && actual < 25) {
                        guardarBgcolor('#192f6a');
                    } else {
                        guardarBgcolor('#f87070');
                    }

                } catch (error) {
                    mostrarAlerta();
                }
            }
        }
        consultarClima();
    }, [consultar]);

    const mostrarAlerta = () => {
        Alert.alert(
            "Error",
            "No hay resultados, intenta con otra ciudad o país",
            [{ text: "OK" }]
        )
    }

    const ocultarTecaldo = () => {
        Keyboard.dismiss();
    }


    const bgColorApp = {
        backgroundColor: bgcolor
    }
    return (
        <Container>
            <StatusBar
                animated={true}
                translucent={true}
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <TouchableWithoutFeedback onPress={() => ocultarTecaldo()}>
                <View style={styles.app}>
                    <View style={styles.contenido}>
                        <Clima
                            resultado={resultado}
                        />
                        <Formulario
                            busqueda={busqueda}
                            guardarBusqueda={guardarBusqueda}
                            guardarConsultar={guardarConsultar}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Container>
    );
}

export default Search

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: "center",
    },
    contenido: {
        marginHorizontal: "2.5%"
    }
});