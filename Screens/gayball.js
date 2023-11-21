import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PontoBck from '../assets/images/fundoponto.png';
import PointBola from '../assets/images/bola.png'
import setaDir from '../assets/images/setaDir.png'
import setaEsq from '../assets/images/setaEsq.png'
import reset from '../assets/images/reset.png'

export default function Gayball({ navigation }) {
  const [nomeTimeA, setNomeTimeA] = useState('Time A');
  const [nomeTimeB, setNomeTimeB] = useState('Time B');
  const [pontosTimeA, setPontosTimeA] = useState(0);
  const [pontosTimeB, setPontosTimeB] = useState(0);
  const [setsTimeA, setSetsTimeA] = useState(0);
  const [setsTimeB, setSetsTimeB] = useState(0);

  const Nomes = async () => {
    navigation.navigate('Resultados', { nomeTimeA });
  };

  useEffect(() => {
    const saveData = async () => {
      try {
        const partida = {
          nomeTimeA,
          nomeTimeB,
          pontosTimeA,
          pontosTimeB,
          setsTimeA,
          setsTimeB,
          NPartida: await AsyncStorage.getItem('NPartida'),
        };

        const partidasAnterioresJSON = await AsyncStorage.getItem('partidas');
        const partidasAnteriores = partidasAnterioresJSON ? JSON.parse(partidasAnterioresJSON) : [];

        const proximaPartida = partidasAnteriores.length + 1;

        await AsyncStorage.setItem('nomeTimeA', nomeTimeA);
        await AsyncStorage.setItem('nomeTimeB', nomeTimeB);
        await AsyncStorage.setItem('NPartida', proximaPartida.toString());
        const novasPartidas = [...partidasAnteriores, partida];

        await AsyncStorage.setItem('partidas', JSON.stringify(novasPartidas));
      } catch (error) {
        console.error('Erro ao salvar os dados da partida:', error);
      }
    };

    if (setsTimeA === 3 || setsTimeB === 3) {
      saveData();
    }
  }, [setsTimeA, setsTimeB]);


  const Pontuacao = (time) => {
    if (setsTimeA == 3 || setsTimeB == 3) {
      if (time == 'A') {
        setPontosTimeA(pontosTimeA + 0);
      } else {
        setPontosTimeB(pontosTimeB + 0);
      }
    } else {
      if (time == 'A') {
        setPontosTimeA(pontosTimeA + 1);
      } else {
        setPontosTimeB(pontosTimeB + 1);
      }
    }

    if (setsTimeA + setsTimeB < 4) {
      if (pontosTimeA > 24 && pontosTimeA - pontosTimeB >= 2) {
        setSetsTimeA(setsTimeA + 1);
        resetarPontuacao();
      } else if (pontosTimeB > 24 && pontosTimeB - pontosTimeA >= 2) {
        setSetsTimeB(setsTimeB + 1);
        resetarPontuacao();
      }
    } else {
      if (pontosTimeA >= 15 && pontosTimeA - pontosTimeB >= 2) {
        setSetsTimeA(setsTimeA + 1);
        resetarPontuacao();
      } else if (pontosTimeB >= 15 && pontosTimeB - pontosTimeA >= 2) {
        setSetsTimeB(setsTimeB + 1);
        resetarPontuacao();
      }
    }
  };

  const resetarPontuacao = () => {
    setPontosTimeA(0);
    setPontosTimeB(0);
  };

  const reiniciar = () => {
    setPontosTimeA(0);
    setPontosTimeB(0);
    setSetsTimeA(0);
    setSetsTimeB(0);
  };

  return (
    <ImageBackground source={PontoBck} style={styles.imageBackground}>
      <View style={styles.container}>
        <Image source={PointBola} style={styles.bola} />
        <Text style={styles.titulo}>Pontuação</Text>
        <View style={styles.containerPlacares}>
          <View style={styles.containerPlacar}>
            <View style={styles.PlacarA}>
              <TextInput placeholder='Nome' style={styles.PlacarATxt} value={nomeTimeA} onChangeText={(text) => setNomeTimeA(text)}></TextInput>
              <Text style={styles.PontoA}>{pontosTimeA}</Text>
              <TouchableOpacity onPress={() => Pontuacao('A')}>
                <Image source={setaEsq} style={styles.setaEsq}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerPlacar}>
            <View style={styles.PlacarB}>
              <TextInput placeholder='Nome' style={styles.PlacarBTxt} value={nomeTimeB} onChangeText={(text) => setNomeTimeB(text)}></TextInput>
              <Text style={styles.PontoB}>{pontosTimeB}</Text>
              <TouchableOpacity onPress={() => Pontuacao('B')}>
                <Image source={setaDir} style={styles.setaDir}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerSets}>
          <Text style={styles.Sets}>{`${setsTimeA} - ${setsTimeB}`}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={reiniciar} style={styles.reset}>
            <Image source={reset} style={styles.reseticon}></Image>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={Nomes}style={styles.historico}>
          <Text style={styles.historicoTxt}>Histórico</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  historicoTxt:{
    color: '#2D436E',
    textAlign: 'center',
    fontSize: 27,
    fontWeight: '700',
    textTransform: 'uppercase',
    lineHeight: 27 * 1.2,
  },
  historico:{
    marginLeft: 90,
    marginTop: -55,
    backgroundColor: '#Ffff',
    paddingVertical: 10,
    paddingHorizontal: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderRadius: 100,
  },
  reseticon: {
    width: 30,
    height: 30,
  },
  reset: {
    marginTop: 20,
    marginRight: 240,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 54,
    backgroundColor: '#2D436F',
    borderRadius: 25,
  },
  Sets: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 55,
    fontWeight: '500',
    textTransform: 'uppercase',
    lineHeight: 55 * 1.5,
  },
  containerSets: {
    marginTop: -80,
    width: 172,
    height: 97,
    borderRadius: 50,
    backgroundColor: '#B1E3FA',
  },
  setaEsq: {
    marginTop: 20,
    marginLeft: 20,
    width: 39,
    height: 17,
  },
  setaDir: {
    marginTop: 20,
    marginLeft: 100,
    width: 39,
    height: 18,
  },
  PontoA: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 120,
    fontWeight: '500',
    textTransform: 'uppercase',
    lineHeight: 150 * 1.2,
  },
  PontoB: {
    color: '#061B3A',
    textAlign: 'center',
    fontSize: 120,
    fontWeight: '500',
    textTransform: 'uppercase',
    lineHeight: 150 * 1.2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bola: {
    marginTop: -60,
    marginBottom: 22,
    width: 57,
    height: 62,
  },
  PlacarA: {
    width: 155,
    height: 380,
    borderRadius: 50,
    backgroundColor: '#2D436E',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    lineHeight: 30 * 4,
  },
  PlacarB: {
    width: 155,
    height: 380,
    borderRadius: 50,
    backgroundColor: '#FFF',
    color: '#061B3A',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    lineHeight: 30 * 1.2,
    paddingTop: -10,
  },
  PlacarBTxt: {
    color: '#061B3A',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    lineHeight: 30 * 4,
  },
  PlacarATxt: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    lineHeight: 30 * 4,
  },
  containerPlacares: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  containerPlacar: {
    flex: 1,
    height: 380,
    borderRadius: 50,
    marginHorizontal: 5,
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
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
