import { ImageBackground, View, Text, StyleSheet, Image, Platform } from 'react-native';
import PointVBck from '../assets/images/fundoinicio.png';
import PointVTitulo from '../assets/images/pointvolley.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PointV({navigation}) {
    return (
        <View style={styles.container}>
        <ImageBackground source={PointVBck} style={styles.imageBackground}>
            <View style={styles.content}>
                <Image source={PointVTitulo} style={styles.titulo} />
                <Text style={styles.texto}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin, lectus ac vulputate convallis, nisl erat euismod nunc, eget ornare nisl est at dolor. Morbi ultrices at ex sed hendrerit. Phasellus ut volutpat ligula. Morbi eget velit quam. Etiam blandit, ante vitae pulvinar dignissim, erat tellus volutpat orci, et dictum libero metus vestibulum tortor.
                </Text>
            </View>
            <View style={styles.botaoContainer}>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Gayball')}>
                        <Text style={styles.botaotxt}>Entrar</Text>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
    </View>
);
}

const styles = StyleSheet.create({
    botaoContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao: {
        marginTop: 650, 
        width: 325,
        height: 54,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
       
    },
    botaotxt:{
        textAlign: 'center',
        color: '#CF6902',
        fontSize: 27,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 27 * 2,
        textTransform: 'uppercase',
    },
    texto: {
        width: 324,
        color: '#FFF',
        textAlign: 'justify',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 24, 
        marginTop: 36,
    },
    titulo: {
        width: 332,
        height: 67,
        marginTop: -300,
    },
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
