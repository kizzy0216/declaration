import React, {
    useState,
    useEffect
} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Keyboard,
    Image
} from 'react-native'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { IS_IOS } from '~/constants';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';

import Avatar from '~/components/Avatar';
import CloseIcon from '@shared/components/icons/CloseIcon';
import FileAttach from '~/assets/images/file-attach.svg'
import Plus from '~/assets/images/sm-plus.svg'

const MessageInputBox = ({
    userData,
    handleSubmitMessage
}) => {

    
    const [keyboardOpened, setKeyboardOpened] = useState(false)
    const [newText, setNewText] = useState('')
    const [newMedia, setNewMedia] = useState()

    const submitMessage = () => {
        if (!!newText || !!newMedia)  {
            handleSubmitMessage({text: newText, media: newMedia})
        }
        setNewText('')
        setNewMedia(null)
    }

    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', () => setKeyboardOpened(true))
        Keyboard.addListener('keyboardWillHide', () => setKeyboardOpened(false))
        return () => {
            Keyboard.removeListener('keyboardWillShow')
            Keyboard.removeListener('keyboardWillHide')
        }
    }, [])

    async function handlePhotoSelection() {
        if (IS_IOS) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to select a photo.');
            return;
          }
        }
    
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.25
          });
    
          if (!result.cancelled) {
                // console.log('photo Result', result)
                setNewMedia(result)
          }
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <View style={[styles.root, {minHeight: newMedia ? 170 : 115}]}>
            {keyboardOpened ? (
                <View style={styles.helper}>
                    <Text style={styles.helperText1}>{`${userData.length} member${userData.length === 1 ? '' : 's'}`}</Text>
                    <Text style={styles.helperText2}> will be notified</Text>
                </View>
            ) : <></>}

            <View style={{flexDirection: 'row'}}>
                {newMedia 
                ?   <View style={{position: 'relative'}}>
                        <BorderlessButton style={styles.removeImageButton} onPress={() => setNewMedia(null)}>
                            <CloseIcon
                            width={12}
                            height={12}
                            fill="#FFF"
                            />
                        </BorderlessButton>
                        <Image 
                            style={{
                                width: 80, 
                                height: 80, 
                                resizeMode: 'contain', 
                                borderRadius: 17,
                                marginTop: 4
                            }} 
                            source={{uri: newMedia.uri}}
                        />
                    </View>
                :   <TextInput
                        placeholder="Message..."
                        style={styles.textInput}
                        value={newText}
                        onChangeText={text => setNewText(text)}
                        onSubmitEditing={submitMessage} // { setNewText(e.nativeEvent.text); 
                        />
                }

            </View>
            <View style={styles.actionBox}>
                <TouchableOpacity onPress={() => handlePhotoSelection()}>
                    <FileAttach />
                </TouchableOpacity>
                {keyboardOpened || newMedia ? (
                    <View style={styles.sendBtnBox}>
                        <TouchableOpacity onPress={submitMessage}>
                            <Text style={styles.sendBtnText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.photos}>
                        {userData && (userData.length <= 2 && userData.map((item, idx) => (
                            <Avatar
                                key={idx}
                                name={item.user.name}
                                avatarStyle={styles.avatar}
                                size="small"
                                imageSrc={item.user.user_profile.photo}
                            />
                            // <Image
                            //     key={index}
                            //     source={item.photoUrl}
                            //     style={[styles.avatar, item.online ? styles.online : null, {zIndex: -index}]}
                            // />
                        )) || (
                            <>
                                {userData.length > 0 ? <Avatar
                                    avatarStyle={[styles.avatar, {marginLeft: 0}]}
                                    key={0}
                                    size="small"
                                    name={userData[0].user.name}
                                    imageSrc={userData[0].user.user_profile.photo}
                                /> : <></>}
                                <View style={[styles.avatar, styles.extraUsersNum, {zIndex: -1}]}>
                                    <Text style={styles.extraUsersNumText}>
                                        {userData.length - 1}
                                    </Text>
                                </View>
                                <View style={[styles.avatar, styles.addNewMember, {zIndex: -3}]}>
                                    {/* <TouchableOpacity onPress={btnAction}> */}
                                        <Plus />
                                    {/* </TouchableOpacity> */}
                                </View>
                            </>
                        ))}
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        minHeight: 115,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        flexDirection: 'column'
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
    removeImageButton: {
        position: 'absolute', 
        right: 4, 
        top: 8,
        padding: 2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 3
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