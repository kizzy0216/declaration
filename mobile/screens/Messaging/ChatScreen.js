import React, {
    useState,
    useEffect,
    useContext
} from 'react'
import {
    KeyboardAvoidingView,
    View,
    StyleSheet,
    Text
} from 'react-native'

import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
import Button from '~/components/Button';
import CloseIcon from '@shared/components/icons/CloseIcon';
import DoubleConfirmModal from '~/components/DoubleConfirmModal';
import ScreenHeader from '~/components/ScreenHeader';
import MessageList from './MessageList'
import MessageInputBox from './MessageInputBox'
import { useMutation, useQuery, useSubscription } from 'urql';
import GetLoopByUuid from '../../queries/GetLoopByUuid';
import GetConversationByUuid from '../../queries/GetConversationByUuid';
import { UserContext } from '../../contexts/UserContext';
import InsertChatMessage from '../../mutations/InsertChatMessage';
import SubscribeChatMessages from '../../subscriptions/SubscribeChatMessages';
import Avatar from '../../components/Avatar';
import Plus from '~/assets/images/sm-plus.svg'

const testingData = [
    // {photoUrl: require('~/assets/images/avatar/azamat-zhanisov-a5sRFieA3BY-unsplash.jpg'), online: true},
    // {photoUrl: require('~/assets/images/avatar/alexandru-zdrobau--djRG1vB1pw-unsplash.jpg'), online: false},
    // {photoUrl: require('~/assets/images/avatar/azamat-zhanisov-a5sRFieA3BY-unsplash.jpg'), online: false},
    // {photoUrl: require('~/assets/images/avatar/alexandru-zdrobau--djRG1vB1pw-unsplash.jpg'), online: false}
]

const testingMessages = [
    // {content: 'How has your work been coming along?', time: 'Yesterday 10:53', from: '1'},
    // {content: 'Just keep at it?', time: 'Yesterday 10:54', from: '1'},
    // {content: `Thanks, I really appreciate your support. It's helped!`, time: 'Yesterday 10:56', from: '2'},
    // {content: `Anytime. I'll check in tomorrow.`, time: 'Yesterday 10:56', from: '1'},
    // {content: `Send me your work when you have a chance. I'm free today.`, time: 'Today 10:56', from: '1'},
    // {content: `Ok!, I'll send it soon.`, time: 'Today 10:56', from: '2'},
    // {content: 'How has your work been coming along?', time: 'Yesterday 10:53', from: '1'},
    // {content: 'Just keep at it?', time: 'Yesterday 10:54', from: '1'},
    // {content: `Thanks, I really appreciate your support. It's helped!`, time: 'Yesterday 10:56', from: '2'},
    // {content: `Anytime. I'll check in tomorrow.`, time: 'Yesterday 10:56', from: '1'},
    // {content: `Send me your work when you have a chance. I'm free today.`, time: 'Today 10:56', from: '1'},
    // {content: `Ok!, I'll send it soon.`, time: 'Today 10:56', from: '2'},
]

const ChatScreen = ({ navigation, route }) => {

    const { loop_uuid, conversation_uuid } = route.params;
    const [channel, setChannel] = useState({})
    const [limit, setLimit] = useState(10)
    const [chatMessages, setChatMessages] = useState([])
    const [isDoubleConfirmConnectionModalActive, setIsDoubleConfirmConnectionModalActive] = useState(false)
    const { user } = useContext(UserContext);

    const [getLoopResult, refreshLoopResult] = useQuery({
        query: GetLoopByUuid,
        variables: {
          uuid: loop_uuid,
          user_uuid: user.uuid,
        },
        pause: !loop_uuid || !user.uuid
    });

    const [getConversationResult, refreshConversationResult] = useQuery({
        query: GetConversationByUuid,
        variables: {
          uuid: conversation_uuid,
          user_uuid: user.uuid,
        },
        pause: !conversation_uuid || !user.uuid
    });

    useSubscription({
        query: SubscribeChatMessages,
        variables: {
            conversation_uuid,
            loop_uuid
        },
        pause: !conversation_uuid && !loop_uuid
    }, (_, result) => {
        // console.log('Subscription result for', user.name, new Date())
        setChatMessages(result.chat_message)
    })
    const [_, insertMessage] = useMutation(InsertChatMessage);

    // const goToNewMessage = () => navigation.navigate('NewConversation')

    const handleNewMessage = message => {
        if (!message || message.trim().length === 0) { return }
        if (!channel || !channel.uuid) { return }
        const variables = { 
            loop_uuid: channel.__typename === 'loop' ? channel.uuid : null,
            conversation_uuid: channel.__typename === 'loop' ? null : channel.uuid,
            text: message,
            // media:  { data: {  original_url ... }} // see insertContent on CreateContentContext.js
        }
        insertMessage(variables).then(result => {
            if (result.error) { 
                console.error('MESSAGE INSERT ISSUE', result.error) 
            }
            //  else {
            //     console.log('SUCCESS', result.data)
            // }
        })
    }

    useEffect(() => {
        if (getConversationResult.error || getLoopResult.error) {
            console.error('GET MESSAGES ERROR', getConversationResult?.error, getLoopResult?.error)
        }
        if (getConversationResult.fetching || getLoopResult.fetching) { return }
        console.log("CHANNEL UPUDATED")
        if (getConversationResult.data) {
            // console.log('CONVO DATA', getConversationResult.data.conversation_by_pk)
            setChannel(getConversationResult.data.conversation_by_pk)
        }
        if (getLoopResult.data) {
            // console.log('LOOP DATA', getLoopResult.data.loop_by_pk)
            setChannel(getLoopResult.data.loop_by_pk)
        }
    }, [getConversationResult.data, getConversationResult.error,getLoopResult.data, getLoopResult.error]);

    // const handleRefresh = () => {
    //     const old = limit
    //     setLimit(Number(old + 10))
    // }
      
    const handleDeleteLoop = () => {
        alert('DELETE!!!!!')
    }
    const getHeading = () => {
        if (channel && channel.__typename === 'loop') {
            return <Text>{`#${channel.name}`}</Text>
        }
        if (channel && channel.__typename === 'conversation') {
            const peeps = channel.conversation_users || []
            return <View style={{flexGrow: 1, justifyContent: 'center', flexDirection: 'row'}}>
                {peeps && (peeps.length <= 2 && peeps.map((item, idx) => (
                    <Avatar
                        key={idx}
                        name={item.user.name}
                        avatarStyle={styles.avatar}
                        size="medium"
                        imageSrc={item.user.user_profile.photo}
                    />
                    // <Image
                    //     key={index}
                    //     source={item.photoUrl}
                    //     style={[styles.avatar, item.online ? styles.online : null, {zIndex: -index}]}
                    // />
                )) ||  (
                    <>
                        <Avatar
                            avatarStyle={[styles.avatar, {marginLeft: 0}]}
                            key={0}
                            size="medium"
                            name={peeps[0].user.name}
                            imageSrc={peeps[0].user.user_profile.photo}
                        />
                        <Avatar
                            avatarStyle={[styles.avatar]}
                            key={0}
                            size="medium"
                            name={peeps[0].user.name}
                            imageSrc={peeps[0].user.user_profile.photo}
                        />
                        <View style={[styles.avatar, styles.extraUsersNum, {zIndex: -1}]}>
                            <Text style={styles.extraUsersNumText}>
                                {userData.length - 1}
                            </Text>
                        </View>
                    </>
                ))}
            </View>
            }
        return (<Text>Chat</Text>)
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
            <DoubleConfirmModal
                heading={`Are you sure?`}
                subHeading="This loop will be closed and all Messages will be deleted."
                submitLabel="Yes, close the loop"
                cancelLabel="No, cancel"
                isVisible={isDoubleConfirmConnectionModalActive}
                onSubmit={handleDeleteLoop}
                onCancel={() => setIsDoubleConfirmConnectionModalActive(false)}
            />
            <View style={headerStyles.container}>
                <View style={headerStyles.header}>
                    <TouchableOpacity style={headerStyles.leftButton} onPress={() => navigation.navigate('Messaging')}>
                        <ArrowLeftIcon
                            width={22}
                            height={22}
                            fill={'#000000'}
                        />
                    </TouchableOpacity>
                    {getHeading()}
                    {channel && channel.owner_uuid && user && channel.owner_uuid === user.uuid ?
                    <TouchableOpacity style={headerStyles.rightButton} onPress={() => setIsDoubleConfirmConnectionModalActive(true)}>
                        <CloseIcon
                            width={22}
                            height={22}
                            fill="black"
                        />
                    </TouchableOpacity> 
                    : <View style={{width: 22}}></View>}                    
                </View>
            </View>
            <MessageList
                chatMessages={chatMessages || []}
                // isFetching={getConversationResult.fetching || getLoopResult.fetching}
                // handleRefresh={() => handleRefresh()}
            />

            <View style={styles.bottom}>
                <MessageInputBox
                    userData={channel.__typename === 'loop' ? channel.loop_users || [] : channel.conversation_users || []}
                    handleNewMessage={handleNewMessage}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    bottom: {
        justifyContent: 'flex-end'
    },
    avatar: {
        // width: 30,
        // height: 30,
        // borderRadius: 30,
        marginLeft: -8
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
})

const headerStyles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    heading: {
        flex: 4,
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#222',
        alignSelf: 'center',
        textAlign: 'center'
    },
 

})
export default ChatScreen