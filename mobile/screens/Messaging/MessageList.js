import React, {
    useRef,
    useEffect,
    useContext
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

const MessageList = ({chatMessages, isFetching, handleRefresh}) => {

    const { user } = useContext(UserContext);

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
                    <Text style={{textAlign: 'center', fontSize: 10, color: '#ccc'}}>{`${formatDate(message.created_at)} ${formatTime(message.created_at)}`}</Text>
                    <View style={[styles.messageContainer, message.sender.uuid === user.uuid ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'}]}>
                        {message.sender.uuid !== user.uuid ? (
                            <Avatar
                                imageSrc={message.sender.user_profile.photo}
                                size="small"
                                name={message.sender.name}
                                avatarStyle={{marginRight: 20}}
                            />
                            // <Image
                            //     source={message.photoUrl}
                            //     style={[styles.avatar, message.online ? styles.online : null]}
                            // />
                        ) : null}
                        <View>
                            {message.text ? <View style={[styles.messageBox, message.sender.uuid === user.uuid ? {backgroundColor: '#f4f4f4'} : {backgroundColor: '#6ac2bd'}]}>
                                <Text style={message.sender.uuid === user.uuid ? styles.myMessageText : styles.messageText}>{message.text}</Text>
                            </View> : <></>}
                            {message.media && message.media.original_url ? 
                                <Image 
                                    style={{
                                        width: 240, 
                                        height: 240, 
                                        resizeMode: 'contain', 
                                        backgroundColor: message.sender.uuid === user.uuid ? '#f4f4f4' : '#6ac2bd',
                                        borderRadius: 8,
                                    }} 
                                    source={{uri: message.media.original_url}}
                                />
                            : <></>}
                        </View>
                    </View>
                </View>
                )
            })}
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