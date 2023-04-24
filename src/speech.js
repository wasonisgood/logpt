import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as SpeechRecognition from 'expo-speech';

const Dictaphone = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  const handleStart = async () => {
    try {
      await SpeechRecognition.requestPermissionsAsync();
      await SpeechRecognition.startListeningAsync();
      setListening(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStop = async () => {
    try {
      await SpeechRecognition.stopListeningAsync();
      setListening(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setTranscript('');
  };

  const handleTranscription = (event) => {
    setTranscript(event.nativeEvent.transcription);
  };

  return (
    <View>
      <Text>Microphone: {listening ? 'on' : 'off'}</Text>
      <Button title="Start" onPress={handleStart} />
      <Button title="Stop" onPress={handleStop} />
      <Button title="Reset" onPress={handleReset} />
      <Text>{transcript}</Text>
    </View>
  );
};
export default Dictaphone;