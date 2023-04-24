import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import * as Speech from 'expo-speech';
import Dictaphone from './speech';


const ChatGPT = () => {
    const [data, setData] = useState([]);
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textInput, setTextInput] = useState('');
    const handleSend = async () => {
        const prompt = '請用繁體中文100字以下文字摘要下面段落重點'+textInput
        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,


        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const text = response.data.choices[0].text;
        setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
        setTextInput('');
    }
    const speak = (text) => {
        const thingToSay = text;
        Speech.speak(thingToSay);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>樂齡生成式輔具</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) => (
                    <View style={item.type === 'user' ? styles.messageContainer : styles.botMessageContainer}>
                        <Text style={styles.messageText}>{item.text}{speak(item.text)}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={text => setTextInput(text)}
                placeholder='請輸入'
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
            >
                <Text style={styles.buttonText}>讓我們走!</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}            >
                <Text style={styles.buttonText}
                >語音轉文字</Text>
            </TouchableOpacity>
            <Dictaphone></Dictaphone>
        </View>
    )
}
export default ChatGPT




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    body: {
        flex: 1,
        alignSelf: 'stretch',
    },
    messageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#DCF8C5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    botMessageContainer: {
        alignSelf: 'flex-end',
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modal: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'stretch',
    },
});





