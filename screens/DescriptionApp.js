import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import slides from '../slides'
import MainTab from '../navigation/MainTab'
import LottieView from 'lottie-react-native'
import Container from '../components/Container'

//DescriptionApp corresponde al inicio donde de detalla la utilizacion de la app, 
//utilizando el paquete App intro slider

const DescriptionApp = () => {
    const size = Dimensions.get('window').width * 0.5
    const [showRealApp, setShowRealApp] = useState(false)

    const onDone = () => {
        setShowRealApp(true)
    }

    const onSkip = () => {
        setShowRealApp(true)
    }

    const renderItem = ({ item }) => {
        return (
            <Container>
                <StatusBar
                    animated={true}
                    backgroundColor="#192f6a"
                    barStyle="light-content"
                />

                <View style={styles.containerDescription}>
                    <Text style={styles.introTitle}>
                        {item.title}
                    </Text>
                    <LottieView
                        style={{ width: size + 50, height: size + 50 }}
                        autoPlay
                        resizeMode="contain"
                        source={item.image}
                    />
                    <Text style={styles.introDescrition}>
                        {item.description}
                    </Text>
                </View>
            </Container>
        )
    }

    return (
        <>
            {
                showRealApp ? (
                    <>
                        <StatusBar
                            animated={true}
                            backgroundColor="#51608F"
                            barStyle="light-content"
                        />
                        <MainTab />
                    </>
                ) : (
                    <AppIntroSlider
                        data={slides}
                        renderItem={renderItem}
                        onDone={onDone}
                        onSkip={onSkip}
                        showSkipButton={true}
                        showPrevButton
                        doneLabel="Empezar"
                        nextLabel="Siguente"
                        skipLabel="Omitir"
                        prevLabel="Atrás"
                        activeDotStyle={{
                            width: 20,
                            backgroundColor: "#EDF2F4"
                        }}
                    />
                )
            }
        </>
    )
}

export default DescriptionApp

const styles = StyleSheet.create({
    introImage: {
        width: 200,
        height: 200
    },
    introDescrition: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    introTitle: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold"
    },
    containerDescription: {
        alignItems: "center",
        marginBottom: 70
    }
})