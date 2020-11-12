import React, {
    useRef,
    useEffect
} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Keyboard,
    Image
} from 'react-native'
import {
    useFonts,
    Roboto_400Regular
} from '@expo-google-fonts/roboto'

const MessageList = ({
    messagesHistory
}) => {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
    })

    const scrollViewRef = useRef()

    const goToBottomList = () => {
        scrollViewRef.current.scrollToEnd({ animated: false })
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', goToBottomList)
        return () => {
            Keyboard.removeListener('keyboardDidShow', goToBottomList)
        }
    }, [])

    if (!fontsLoaded) {
        return <View />
        // return <AppLoading />
    } else {
        return (
            <ScrollView
                ref={scrollViewRef}
                style={{flex: 1, paddingHorizontal: 30}}
                contentContainerStyle={{paddingBottom: 30}}
                onContentSizeChange={goToBottomList}
            >
                {messagesHistory && messagesHistory.map((message, index) => <Message key={index} {...{ message }} />)}
            </ScrollView>
        )
    }
}

const Message = ({ message }) => {
    return (
        <View style={[styles.messageContainer, message.from === '2' ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'}]}>
            {message.from !== '2' ? (
                <Image
                    source={message.photoUrl}
                    style={[styles.avatar, message.online ? styles.online : null]}
                />
            ) : null}
            <View style={[styles.messageBox, message.from === '2' ? {backgroundColor: '#f4f4f4', alignSelf: 'flex-end'} : {backgroundColor: '#6ac2bd', alignSelf: 'flex-start'}]}>
                <Text style={message.from === '2' ? styles.myMessageText : styles.messageText}>{message.content}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        maxWidth: '90%',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 25,
        marginRight: 10
    },
    online: {
        borderColor: '#43cb6f',
        borderWidth: 2
    },
    messageBox: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 22,
    },
    messageText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#fff'
    },
    myMessageText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#222'
    }
})

export default MessageList