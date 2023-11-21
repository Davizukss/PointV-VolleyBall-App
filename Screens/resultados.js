import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PointBola from '../assets/images/bola.png'
import HisBck from '../assets/images/fundohistorico.png'
import { ScrollView } from 'react-native-gesture-handler';
import setaEsq from '../assets/images/setaEsq.png'
export default function ResultadosPage({ navigation }) {
    const [historicoPartidas, setHistoricoPartidas] = useState([]);
    useEffect(() => {
        const carregarHistorico = async () => {
            const partidasJSON = await AsyncStorage.getItem('partidas');
            const partidas = partidasJSON ? JSON.parse(partidasJSON) : [];
            setHistoricoPartidas(partidas);
            const numeroPartida = partidas.length + 1;
            await AsyncStorage.setItem('NPartida', numeroPartida.toString());
        };

        carregarHistorico();
    }, []);

    const apagarHistorico = async () => {
        await AsyncStorage.removeItem('partidas');
        setHistoricoPartidas([]);
        await AsyncStorage.setItem('NPartida', '1');
        Alert.alert('Histórico apagado com sucesso!');
    };

    return (
        <ImageBackground source={HisBck} style={styles.imageBackground}>
            <ScrollView>
                <View style={styles.container}>
                    <Image source={PointBola} style={styles.bola} />
                    <Text style={styles.titulo}>Histórico</Text>
                </View>
                {historicoPartidas.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.ContainerBck}>
                            <View style={styles.numeroPartContainer}>
                                <Text style={styles.numeroPart}>{`Partida ${index + 1}`}</Text>
                            </View>

                            <View style={styles.resultadosContainer}>
                                <Text style={styles.timeA}>{`${item.nomeTimeA}`}</Text>


                                <Text style={styles.timeB}>{`${item.nomeTimeB}`}</Text>

                            </View>
                            <View style={styles.resultadosContainer2}>
                                <Text style={styles.sets}>{`${item.setsTimeA}`} | {`${item.setsTimeB}`}</Text>
                            </View>
                        </View>

                    </View>

                ))}
                <View style={styles.botoesContainer}>
                    <TouchableOpacity onPress={apagarHistorico} style={styles.apghis}>
                        <Text style={styles.apghistxt}>Apagar Histórico</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.setaEsqbck} onPress={() => navigation.navigate('Gayball')}>
                        <Image style={styles.setaEsq} source={setaEsq}></Image>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    apghistxt: {
        color: '#CB7D16',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
        textTransform: 'uppercase',
        lineHeight: 27 * 1.2,
    },
    setaEsq: {
        backgroundColor: '#CB7D16',
        width: 39,
        height: 17,
        marginTop: 13,
    },
    setaEsqbck: {
        marginTop: -50,
        marginLeft: 40,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#CB7D16',
        width: 60,
        height: 40,
    },
    apghis: {
        width: 190,
        marginLeft: 180,
        marginTop: -55,
        backgroundColor: '#Ffff',
        paddingVertical: 10,
        paddingHorizontal: 47,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderRadius: 10,
    },
    botoesContainer: {
        marginTop: 50,
    },
    sets: {
        marginTop: 20,
        color: '#fff',
        fontSize: 30,
        fontWeight:'bold',
        display: 'flex',
        paddingVertical: 27,
        paddingHorizontal: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CB7D16',
        borderRadius: 20,
    },
    timeB: {
        marginTop: -25,
        marginLeft: 250,
        color: '#CB7D16',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '500',
        textTransform: 'uppercase',
        lineHeight: 24 * 1.2,
    },
    timeA: {
        marginTop: 90,
        marginRight: 250,
        color: '#CB7D16',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '500',
        textTransform: 'uppercase',
        lineHeight: 24 * 1.2,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bola: {
        marginTop: 70,
        marginBottom: 22,
        width: 57,
        height: 62,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        color: '#FFF',
        textAlign: 'justify',
        fontSize: 48,
        fontWeight: '900',
        textTransform: 'uppercase',
        lineHeight: 48 * 1.2,
        marginBottom: 29,
    },
    ContainerBck: {
        backgroundColor: '#fff',
        alignItems: 'center',
        width: 390,
        height: 118,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 50,
    },
    numeroPart: {
        marginTop: 35,
        color: '#BE5E02',
        textAlign: 'justify',
        fontSize: 24,
        fontWeight: '500',
        textTransform: 'uppercase',
        lineHeight: 24 * 1.5,
    },
});

