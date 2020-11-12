import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NewMsgAlert from '~/assets/images/red-dot.svg'

const ConversationItemLayout = ({ conversation }) => {
    return (
        <View style={styles.item}>
            <View style={styles.photoNameContainer}>
                <Image
                    source={conversation.photoUrl}
                    style={conversation.onLine ? styles.avatarOnline : styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{conversation.firstName} {conversation.lastName}</Text>
                    <Text style={styles.lastMsg}>{(conversation.lastMsg.length < 28) ? conversation.lastMsg : conversation.lastMsg.substring(0, 27) + '...'}</Text>
                </View>
            </View>

            <View style={styles.timeAlertContainer}>
                {conversation.readMsg ? null : <NewMsgAlert />}
                <Text style={styles.lastMsg}>{conversation.msgTime}</Text>
            </View>
        </View>
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