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

import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
// import Button from '~/components/Button';
// import CloseIcon from '@shared/components/icons/CloseIcon';
// import DoubleConfirmModal from '~/components/DoubleConfirmModal';
// import ScreenHeader from '~/components/ScreenHeader';
import MessageList from './MessageList'
import MessageInputBox from './MessageInputBox'
import { useMutation, useQuery, useSubscription } from 'urql';
import GetLoopByUuid from '../../queries/GetLoopByUuid';
import GetConversationByUuid from '../../queries/GetConversationByUuid';
import { UserContext } from '../../contexts/UserContext';
import InsertChatMessage from '../../mutations/InsertChatMessage';
import SubscribeChatMessages from '../../subscriptions/SubscribeChatMessages';
import Avatar from '../../components/Avatar';
import useMediaUpload from '../../hooks/useMediaUpload';
import { MessageContext } from '../../contexts/MessageContext';
// import Plus from '~/assets/images/sm-plus.svg'

const updateConversationUserTyping = `
mutation UpdateConversationUserTyping($conversation_uuid: uuid, $user_uuid: uuid, $last_typed_at: timestamptz = "now()") {
    update_conversation_user(
        where: {
            user_uuid: {_eq: $user_uuid}, 
            conversation_uuid: {_eq: $conversation_uuid}
        }, 
        _set: {
            last_typed_at: $last_typed_at
        }
    ) {
      affected_rows
    }
}  
`

const updateLoopUserTyping = `
mutation UpdateLoopUserTyping($loop_uuid: uuid, $user_uuid: uuid, $last_typed_at: timestamptz = "now()") {
    update_loop_user(
        where: {
            user_uuid: {_eq: $user_uuid}, 
            loop_uuid: {_eq: $loop_uuid}
        }, 
        _set: {
            last_typed_at: $last_typed_at
        }
    ) {
      affected_rows
    }
}  
`
const ChatScreen = ({ navigation, route }) => {

    const { loop_uuid, conversation_uuid } = route.params;
    const [channel, setChannel] = useState({})
    // const [limit, setLimit] = useState(10)
    const [chatMessages, setChatMessages] = useState([])
    // const [isDoubleConfirmConnectionModalActive, setIsDoubleConfirmConnectionModalActive] = useState(false)
    const { user } = useContext(UserContext);
    const { onlineUsers, refresh: refreshChannels } = useContext(MessageContext);
    const { handleUpload } = useMediaUpload();

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
        // console.log(new Date(), 'Subscription result: ', result.chat_message)
        setChatMessages(result.chat_message)
        refreshChannels()
    })
    const [_, insertMessage] = useMutation(InsertChatMessage);
    const [___, updateLoopTyping] = useMutation(updateLoopUserTyping);
    const [_____, updateConversationTyping] = useMutation(updateConversationUserTyping);
    // const goToNewMessage = () => navigation.navigate('NewConversation')

    const handleSubmitMessage = async ({text, media}) => {
        if ((!text || text.trim().length === 0) && (!media || !media.uri)) { return }
        if (!channel || !channel.uuid) { return }
        const newMessage = {
            sender: {
                name: user.name,
                user_profile: {
                    photo: user.profile.photo
                }
            },
            text,
            media: media && media.uri ? {
                localSource: media.uri
            } : null
        }
        setChatMessages(old => [...old, newMessage])
        _sendMessageToServer({text, media})
    }

    const _sendMessageToServer = async ({text, media}) => {
        const uploadedAsset = media && media.uri ? await handleUpload({ asset: media }) : null
        const variables = { 
            loop_uuid: channel.__typename === 'loop' ? channel.uuid : null,
            conversation_uuid: channel.__typename === 'loop' ? null : channel.uuid,
            text,
            media: uploadedAsset && uploadedAsset.url
                ? { 
                    data: {  
                        original_url: uploadedAsset.url,
                        original_width: media.width,
                        original_height: media.height,
                        type: uploadedAsset.type,
                    }
                } 
                : null 
        }
        handleTypingEvent(new Date(new Date().setDate(new Date().getDate()-1)))
        insertMessage(variables).then(result => {
            if (result.error) { 
                console.error('MESSAGE INSERT ISSUE', result.error) 
            }
        })
    }
    const handleTypingEvent = (time) => {
        const variables = {
            user_uuid: user.uuid
        }
        if (time) {
            variables.last_typed_at = time
        }
        if (channel.__typename === 'loop') {
            updateLoopTyping({...variables, loop_uuid: channel.uuid})
        } else {
            updateConversationTyping({...variables, conversation_uuid: channel.uuid})
        }

    }
    useEffect(() => {
        if (getConversationResult.error || getLoopResult.error) {
            console.error('GET MESSAGES ERROR', getConversationResult?.error, getLoopResult?.error)
        }
        if (getConversationResult.fetching || getLoopResult.fetching) { return }
        // console.log("CHANNEL UPUDATED")
        if (getConversationResult.data) {
            // console.log('CONVO DATA', getConversationResult.data.conversation_by_pk)
            setChannel(getConversationResult.data.conversation_by_pk)
        }
        if (getLoopResult.data) {
            // console.log('LOOP DATA', getLoopResult.data.loop_by_pk)
            setChannel(getLoopResult.data.loop_by_pk)
        }
    }, [getConversationResult.data, getConversationResult.error,getLoopResult.data, getLoopResult.error]);

    // const handleDeleteLoop = () => {
    //     alert('DELETE!!!!!')
    // }
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
                        showBorder={onlineUsers.includes(item.user.uuid)}
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
                            showBorder={onlineUsers.includes(peeps[0].user.uuid)}
                            avatarStyle={[styles.avatar, {marginLeft: 0}]}
                            key={0}
                            size="medium"
                            name={peeps[0].user.name}
                            imageSrc={peeps[0].user.user_profile.photo}
                        />
                        <Avatar
                            showBorder={onlineUsers.includes(peeps[1].user.uuid)}
                            avatarStyle={[styles.avatar, {zIndex: -1}]}
                            key={1}
                            size="medium"
                            name={peeps[1].user.name}
                            imageSrc={peeps[1].user.user_profile.photo}
                        />
                        <View style={[styles.avatar, styles.extraUsersNum, {zIndex: -3}]}>
                            <Text style={styles.extraUsersNumText}>
                                {peeps.length - 1}
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
            {/* <DoubleConfirmModal
                heading={`Are you sure?`}
                subHeading="This loop will be closed and all Messages will be deleted."
                submitLabel="Yes, close the loop"
                cancelLabel="No, cancel"
                isVisible={isDoubleConfirmConnectionModalActive}
                onSubmit={handleDeleteLoop}
                onCancel={() => setIsDoubleConfirmConnectionModalActive(false)}
            /> */}
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
                    {/* {channel && channel.owner_uuid && user && channel.owner_uuid === user.uuid ?
                    <TouchableOpacity style={headerStyles.rightButton} onPress={() => setIsDoubleConfirmConnectionModalActive(true)}>
                        <CloseIcon
                            width={22}
                            height={22}
                            fill="black"
                        />
                    </TouchableOpacity> 
                    : <View style={{width: 22}}></View>}                     */}
                    <View style={{width: 22}}></View>
                </View>
            </View>
            <MessageList
                chatMessages={chatMessages}
                channel_uuid={channel.uuid}
                isLoop={Boolean(channel && channel.__typename === 'loop')} 
            />

            <View style={styles.bottom}>
                <MessageInputBox
                    userData={channel.__typename === 'loop' ? channel.loop_users || [] : channel.conversation_users || []}
                    handleSubmitMessage={handleSubmitMessage}
                    handleTypingEvent={() => handleTypingEvent()}
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
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    bottom: {
        justifyContent: 'flex-end'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
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