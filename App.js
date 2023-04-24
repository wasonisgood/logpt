import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import * as Speech from 'expo-speech';
import ChatGPT from './src';
import Dictaphone from './src/speech';

export default function App() {
  /*
  const speak = () => {
    const thingToSay = '彭威翔是大帥哥';
    Speech.speak(thingToSay);
  };
*/
  return (
    <View style={styles.container}>
      <ChatGPT></ChatGPT>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    
  },
});





