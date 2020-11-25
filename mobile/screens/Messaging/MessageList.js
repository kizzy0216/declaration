import React, {
    useRef,
    useEffect,
    useContext,
    useState
} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Keyboard,
    Image,
    Modal,
    SafeAreaView,
    // RefreshControl
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import { UserContext } from '../../contexts/UserContext';
// import { formatDateTimeAgo } from '@shared/utils/formatDate';
import {
    formatDate,
    formatTime,
  } from '@shared/utils/formatDate';
import { differenceInMinutes } from 'date-fns'
import Avatar from '../../components/Avatar';
import { BorderlessButton } from 'react-native-gesture-handler';
import CloseIcon from '@shared/components/icons/CloseIcon';
import { MessageContext } from '../../contexts/MessageContext';
import TypingIndicator from './TypingIndicator';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MessageList = ({chatMessages, isLoop, channel_uuid}) => {

    const [imageToView, setImageToView] = useState()
    const { user } = useContext(UserContext);
    const { onlineUsers } = useContext(MessageContext);
    const scrollViewRef = useRef()

    const goToBottomList = () => {
        try {
            scrollViewRef.current.scrollToEnd({ animated: false })
        } catch {
        }
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', goToBottomList)
        return () => {
            Keyboard.removeListener('keyboardDidShow', goToBottomList)
        }
    }, [])

    const getDeliveryTime = (message, index) => {
        if (!message.created_at) { return 'Sending...' }
        if (index === 0)   { return `${formatDate(message.created_at)} ${formatTime(message.created_at)}`}
        const messageTime = message.created_at
        const previousTime = chatMessages[index - 1] ? chatMessages[index - 1].created_at : new Date()
        if (differenceInMinutes(new Date(messageTime), new Date(previousTime)) >= 60) {
            return `${formatDate(message.created_at)} ${formatTime(message.created_at)}`
        } else {
            return ''
        }
    }
    return (
        <ScrollView
            ref={scrollViewRef}
            style={{flex: 1, paddingHorizontal: 30}}
            contentContainerStyle={{paddingBottom: 30}}
            onContentSizeChange={goToBottomList}
            onScrollEndDrag={() => Keyboard.dismiss()}
            // refreshControl={
            //     <RefreshControl
            //       refreshing={isFetching}
            //       onRefresh={handleRefresh}
            //     />
            // }
        >
            <Modal visible={Boolean(imageToView)} transparent={true}>
                <ImageViewer 
                    imageUrls={[{
                        url: imageToView,
                    }]}
                    enableSwipeDown={true}
                    onCancel={() => setImageToView(null)}
                    renderIndicator={() => {} }
                    saveToLocalByLongPress={false}
                    // menuContext={
                    //     { saveToLocal: 'Save Image', cancel: 'Cancel' }
                    // }
                    renderHeader={() => <View style={{zIndex: 999,position: 'absolute', top: 50, right: 30, color: '#FFF'}}>
                        <BorderlessButton onPress={() => setImageToView(null)}>
                            <CloseIcon
                                width={22}
                                height={22}
                                fill="white"
                            />
                        </BorderlessButton>
                    </View> }
                    />
            </Modal>
            {chatMessages && chatMessages.map((message, idx) => {
                const deliveryTime  = getDeliveryTime(message, idx)
                return (
                <View key={idx} style={{paddingTop: 2, paddingBottom: 2}}>
                    {deliveryTime ?  <Text style={{textAlign: 'center', paddingTop: 8, fontSize: 10, color: '#ccc'}}>{deliveryTime}</Text> : <></>}
                    <View style={[styles.messageContainer, message.sender.uuid && message.sender.uuid !== user.uuid ? {alignSelf: 'flex-start'} : {alignSelf: 'flex-end'} ]}>
                        {message.sender.uuid && message.sender.uuid !== user.uuid ? (
                            <Avatar
                                imageSrc={message.sender.user_profile.photo}
                                showBorder={onlineUsers.includes(message.sender.uuid)}
                                size="small"
                                name={message.sender.name}
                                avatarStyle={{marginRight: 20}}
                            />
                        ) : null}
                        <View>
                            {message.text ? <View style={[styles.messageBox, message.sender.uuid && message.sender.uuid !== user.uuid ? {backgroundColor: '#6ac2bd'} : {backgroundColor: '#f4f4f4'}]}>
                                <Text style={message.sender.uuid && message.sender.uuid !== user.uuid ? styles.messageText : styles.myMessageText}>{message.text}</Text>
                            </View> : <></>}
                            {message.media && (message.media.localSource || message.media.original_url) ? 
                                <TouchableOpacity onPress={() => setImageToView(message.media.localSource || message.media.original_url)}>
                                    <Image 
                                        style={{
                                            width: 240, 
                                            height: 240, 
                                            resizeMode: 'contain', 
                                            backgroundColor: message.sender.uuid && message.sender.uuid !== user.uuid ? '#6ac2bd' : '#f4f4f4',
                                            borderRadius: 8,
                                        }} 
                                        source={{uri: message.media.localSource || message.media.original_url}}
                                        />
                                </TouchableOpacity>
                            : <></>}
                        </View>
                    </View>
                </View>
                )
            })}
            <TypingIndicator
                channel_uuid={channel_uuid}
                isLoop={isLoop}
            />
        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        maxWidth: '90%',
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