import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'; // 引入 axios 套件以處理 HTTP 請求
import * as Speech from 'expo-speech'; // 引入 Expo Speech 套件以處理語音輸出
import Dictaphone from './speech'; // 引入自己寫的 Dictaphone 元件

// ChatGPT 元件
const ChatGPT = () => {
    
    const [data, setData] = useState([]); // 使用狀態管理聊天資料
    const apiKey = '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'; // OpenAI API 金鑰
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'; // OpenAI API 位置
    const [textInput, setTextInput] = useState(''); // 使用狀態管理文字輸入框的內容
    const [buttonDisabled, setButtonDisabled] = useState(false); // 管理按鈕是否可用


    // 點擊「讓我們走!」按鈕時的處理函式
    const handleSend = async () => {
        disabled={buttonDisabled}
        setButtonDisabled(true); // 設置按鈕不可用
        const prompt = '請用繁體中文100字以下文字摘要下面段落重點'+textInput // 設定 OpenAI 的 prompt 參數
        const response = await axios.post(apiUrl, { // 發送 POST 請求至 OpenAI API
            prompt: prompt, // 設定 prompt 參數
            max_tokens: 1024, // 設定 max_tokens 參數
            temperature: 0.5, // 設定 temperature 參數
        }, {
            headers: { // 設定請求標頭
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const text = response.data.choices[0].text; // 從 OpenAI API 回傳的資料中取得文字
        setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]); // 將使用者輸入與 OpenAI 回傳的結果存入聊天資料
        setTextInput(''); // 清空文字輸入框
        setButtonDisabled(false); // 啟用按鈕

    }

    // 處理語音輸出
    const speak = (text) => {
        const thingToSay = text;
        Speech.speak(thingToSay); // 使用 Expo Speech 套件語音輸出文字
    };

    // ChatGPT 元件的畫面
    return (
        <View style={styles.container}>
            <Text style={styles.title}>樂齡生成式輔具</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) => (
                    <View style={item.type === 'user' ? styles.messageContainer : styles.botMessageContainer}>
                        <Text style={styles.messageText}>{item.text}{item.type === 'bot' ? speak(item.text) :speak(1)}</Text>
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
                disabled={buttonDisabled}
            >
                <Text style={styles.buttonText}>讓我們走!</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}            >
                <Text style={styles.buttonText}
                >語音轉文字</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ChatGPT





const styles = StyleSheet.create({
    container: {
    flex: 1, // 元素在父容器中佔的比例
    backgroundColor: '#fff', // 背景色
    alignItems: 'center', // 水平方向的對齊方式
    justifyContent: 'center', // 垂直方向的對齊方式
    padding: 10, // 元素周圍的 padding
    },
    title: {
    fontSize: 24, // 標題字體大小
    fontWeight: 'bold', // 標題字體加粗
    marginVertical: 10, // 垂直方向的 margin
    },
    body: {
    flex: 1, // 元素在父容器中佔的比例
    alignSelf: 'stretch', // 自身在父容器中的對齊方式
    },
    messageContainer: {
    alignSelf: 'flex-start', // 元素在父容器中的對齊方式
    backgroundColor: '#DCF8C5', // 背景色
    borderRadius: 10, // 元素的圓角半徑
    padding: 10, // 元素周圍的 padding
    marginBottom: 10, // 元素的 margin-bottom
    maxWidth: '80%', // 最大寬度
    },
    botMessageContainer: {
    alignSelf: 'flex-end', // 元素在父容器中的對齊方式
    backgroundColor: '#E0E0E0', // 背景色
    borderRadius: 10, // 元素的圓角半徑
    padding: 10, // 元素周圍的 padding
    marginBottom: 10, // 元素的 margin-bottom
    maxWidth: '80%', // 最大寬度
    },
    messageText: {
    fontSize: 16, // 文字大小
    lineHeight: 22, // 行高
    },
    input: {
    height: 40, // 元素高度
    borderColor: 'gray', // 邊框顏色
    borderWidth: 1, // 邊框寬度
    borderRadius: 10, // 元素的圓角半徑
    paddingHorizontal: 10, // 元素水平方向的 padding
    marginBottom: 10, // 元素的 margin-bottom
    alignSelf: 'stretch', // 自身在父容器中的對齊方式
    },
    button: {
    backgroundColor: '#2196F3', // 背景色
    padding: 10, // 元素周圍的 padding
    borderRadius: 10, // 元素的圓角半徑
    },
    buttonText: {
    color: 'white', // 文字顏色
    fontWeight: 'bold', // 文字加粗
    textAlign: 'center', // 文字對齊方式
    },
});





