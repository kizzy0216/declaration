import React, {
    useState,
    useEffect
} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    Text,
    Keyboard
} from 'react-native'
import {
    useFonts,
    Roboto_500Medium,
    Roboto_400Regular
} from '@expo-google-fonts/roboto'
import { TouchableOpacity } from 'react-native-gesture-handler'

import FileAttach from '@shared/components/icons/ArrowLeftIcon' //'~/assets/images/file-attach.svg'
import Plus from '@shared/components/icons/ArrowLeftIcon' //'~/assets/images/sm-plus.svg'

const MessageInputBox = ({
    userData,
    btnAction,
    addNewMessage
}) => {
    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
        Roboto_400Regular
    })

    const [keyboardOpened, setKeyboardOpened] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    const sendMessage = () => {
        addNewMessage(newMessage)
        setNewMessage('')
    }

    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', () => setKeyboardOpened(true))
        Keyboard.addListener('keyboardWillHide', () => setKeyboardOpened(false))
        return () => {
            Keyboard.removeListener('keyboardWillShow', () => setKeyboardOpened(true))
            Keyboard.removeListener('keyboardWillHide', () => setKeyboardOpened(false))
        }
    }, [])

    if (!fontsLoaded) {
        return <View />
        // return <AppLoading />
    } else {
        return (
            <View style={styles.root}>
                {keyboardOpened ? (
                    <View style={styles.helper}>
                        <Text style={styles.helperText1}>{`${userData.length} members`}</Text>
                        <Text style={styles.helperText2}> will be notified</Text>
                    </View>
                ) : null}

                <TextInput
                    placeholder="Message..."
                    style={styles.textInput}
                    value={newMessage}
                    onChangeText={text => setNewMessage(text)}
                />
                <View style={styles.actionBox}>
                    <TouchableOpacity>
                        <FileAttach />
                    </TouchableOpacity>
                    {keyboardOpened ? (
                        <View style={styles.sendBtnBox}>
                            <TouchableOpacity onPress={sendMessage}>
                                <Text style={styles.sendBtnText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.photos}>
                            {userData && (userData.length <= 2 && userData.map((item, index) => (
                                <Image
                                    key={index}
                                    source={item.photoUrl}
                                    style={[styles.avatar, item.online ? styles.online : null, {zIndex: -index}]}
                                />
                            )) || (
                                <>
                                    <Image
                                        key={0}
                                        source={userData[0].photoUrl}
                                        style={[styles.avatar, userData[0].online ? styles.online : null, {zIndex: 0}]}
                                    />
                                    <View style={[styles.avatar, styles.extraUsersNum, {zIndex: -1}]}>
                                        <Text style={styles.extraUsersNumText}>
                                            {userData.length - 1}
                                        </Text>
                                    </View>
                                    <View style={[styles.avatar, styles.addNewMember, {zIndex: -3}]}>
                                        <TouchableOpacity onPress={btnAction}>
                                            <Plus />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: 115,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    helper: {
        flexDirection: 'row',
        marginTop: 10
    },
    helperText1: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 10,
        color: '#222'
    },
    helperText2: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 10,
        color: '#222'
    },
    textInput: {
        marginTop: 10,
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        color: '#222'
    },
    actionBox: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    photos: {
        flexDirection: 'row'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginLeft: -8
    },
    online: {
        borderColor: '#3bcd6b',
        borderWidth: 2
    },
    extraUsersNum: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    extraUsersNumText: {
        fontFamily: 'Roboto_500Medium',
        color: '#fff',
        fontSize: 14
    },
    addNewMember: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#222',
        backgroundColor: '#f4f4f4'
    },
    sendBtnBox: {
        height: 30,
        width: 95,
        borderLeftColor: '#d8d8d8',
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendBtnText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        marginLeft: 15,
        color: '#222'
    }
})

export default MessageInputBox