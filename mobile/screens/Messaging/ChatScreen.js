import React, {
    useState,
    useEffect,
    useContext
} from 'react'
import {
    KeyboardAvoidingView,
    View,
    StyleSheet
} from 'react-native'

import { BorderlessButton } from 'react-native-gesture-handler';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
import Button from '~/components/Button';
import CloseIcon from '@shared/components/icons/CloseIcon';
import DoubleConfirmModal from '~/components/DoubleConfirmModal';
import ScreenHeader from '~/components/ScreenHeader';
import MessageList from './MessageList'
import MessageInputBox from './MessageInputBox'
import { useMutation, useQuery } from 'urql';
import GetLoopByUuid from '../../queries/GetLoopByUuid';
import GetConversationByUuid from '../../queries/GetConversationByUuid';
import { UserContext } from '../../contexts/UserContext';
import InsertChatMessage from '../../mutations/InsertChatMessage';

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
    const [isDoubleConfirmConnectionModalActive, setIsDoubleConfirmConnectionModalActive] = useState(false)
    const { user } = useContext(UserContext);

    const [getLoopResult, refreshLoopResult] = useQuery({
        query: GetLoopByUuid,
        variables: {
          uuid: loop_uuid,
          user_uuid: user.uuid,
          limit
        },
        pause: !loop_uuid
    });

    const [getConversationResult, refreshConversationResult] = useQuery({
        query: GetConversationByUuid,
        variables: {
          uuid: conversation_uuid,
          limit
        },
        pause: !conversation_uuid
    });

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
            } else {
                console.log('SUCCESS', result.data)
            }
        })
    }

    useEffect(() => {
        if (getConversationResult.error || getLoopResult.error) {
            console.error('GET MESSAGES ERROR', getConversationResult?.error, getLoopResult?.error)
        }
        if (getConversationResult.fetching || getLoopResult.fetching) { return }
        console.log("CHANNEL UPUDATED")
        if (getConversationResult.data) {
            // console.log('CONVO DATA', getConversationResult.data)
        }
        if (getLoopResult.data) {
            console.log('LOOP DATA', getLoopResult.data.loop_by_pk)
            setChannel(getLoopResult.data.loop_by_pk)
        }
    }, [getConversationResult.data, getConversationResult.error,getLoopResult.data, getLoopResult.error]);

    const handleRefresh = () => {
        const old = limit
        setLimit(Number(old + 10))
    }
      
    const handleDeleteLoop = () => {
        alert('DELETE!!!!!')
    }
    // useEffect(() => {
    //     setMessages(testingMessages)
    // }, [])

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
            <ScreenHeader
                containerStyle={{marginTop: 20}}
                heading={'#' + (channel && channel.name ? channel.name : 'Chat')}
                leftElement={
                    <BorderlessButton onPress={() => navigation.navigate('Messaging')}>
                        <ArrowLeftIcon
                            width={22}
                            height={22}
                            fill={'#000000'}
                        />
                    </BorderlessButton>
                }
                rightElement={channel && channel.owner_uuid && user && channel.owner_uuid === user.uuid ?
                    <BorderlessButton onPress={() => setIsDoubleConfirmConnectionModalActive(true)}>
                        <CloseIcon
                            width={22}
                            height={22}
                            fill="black"
                        />
                    </BorderlessButton>
                    // <Button
                    //     label={'Delete'}
                    //     theme="danger"
                    //     size="small"
                    //     onPress={() => }
                    // />
                : <></>}
            />

            <MessageList
                chatMessages={channel.chat_messages || []}
                isFetching={getConversationResult.fetching || getLoopResult.fetching}
                handleRefresh={handleRefresh}
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
    }
})

export default ChatScreen