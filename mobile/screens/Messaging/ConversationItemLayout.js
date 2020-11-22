import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import Avatar from '~/components/Avatar';

import NewMsgAlert from '~/assets/images/red-dot.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MessageContext } from '../../contexts/MessageContext';

const ConversationItemLayout = ({ conversation }) => {
    const navigation = useNavigation()
    const { onlineUsers } = useContext(MessageContext);
    const firstUser = conversation.conversation_users && conversation.conversation_users.length > 0 ?
                conversation.conversation_users[0] : {}
    const lastMsg = conversation.chat_messages.length === 0 ? '' : (
        conversation.chat_messages[0].text ? conversation.chat_messages[0].text : (
            conversation.chat_messages[0].media_uuid ? 'Attachment: 1 image' : ''
        )
    )
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { conversation_uuid: conversation.uuid })}>
        <View style={styles.item}>
            <View style={styles.photoNameContainer}>
                {/* <Image
                    source={{uri: }}
                    style={contact.onLine ? styles.avatarOnline : styles.avatar}
                /> */}
                <Avatar
                    showBorder={onlineUsers.includes(firstUser.user_uuid)}
                    imageSrc={firstUser.user.user_profile.photo}
                    name={firstUser.user.name}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{firstUser.user.name}</Text>
                    <Text style={styles.lastMsg}>
                        {(lastMsg.length < 34) ? lastMsg : lastMsg.substring(0, 33) + '...'}
                    </Text>
                </View>
            </View>

            <View style={styles.timeAlertContainer}>
                {/* {conversation.readMsg ? null : <NewMsgAlert />}
                <Text style={styles.lastMsg}>{conversation.msgTime || ''}</Text> */}
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 95,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5'
    },
    photoNameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeAlertContainer: {
        alignItems: 'flex-end'
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 55,
    },
    avatarOnline: {
        width: 55,
        height: 55,
        borderRadius: 55,
        borderColor: '#43cb6f',
        borderWidth: 2
    },
    textContainer: {
        marginLeft: 10
    },
    name: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#222',
    },
    lastMsg: {
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: '#999'
    },
});

export default ConversationItemLayout;