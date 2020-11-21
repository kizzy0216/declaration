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
    // RefreshControl
} from 'react-native'
import { UserContext } from '../../contexts/UserContext';
// import { formatDateTimeAgo } from '@shared/utils/formatDate';
import {
    formatDate,
    formatTime,
  } from '@shared/utils/formatDate';
import Avatar from '../../components/Avatar';
import { MessageContext } from '../../contexts/MessageContext';
import TypingIndicator from './TypingIndicator';

const MessageList = ({chatMessages, isLoop, channel_uuid}) => {

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

    return (
        <ScrollView
            ref={scrollViewRef}
            style={{flex: 1, paddingHorizontal: 30}}
            contentContainerStyle={{paddingBottom: 30}}
            onContentSizeChange={goToBottomList}
            // refreshControl={
            //     <RefreshControl
            //       refreshing={isFetching}
            //       onRefresh={handleRefresh}
            //     />
            // }
        >
            {chatMessages && chatMessages.map((message, idx) => {
                return (
                <View key={idx} style={{paddingVertical: 5}}>
                    <Text style={{textAlign: 'center', fontSize: 10, color: '#ccc'}}>{message.created_at ? `${formatDate(message.created_at)} ${formatTime(message.created_at)}` : 'Sending ...'}</Text>
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