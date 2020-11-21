import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { useSubscription } from 'urql'
import { UserContext } from '../../contexts/UserContext'


const TypingLoopSubscription = `
subscription TypingLoopSubscription($loop_uuid: uuid = "", $user_uuid: uuid = "") {
    loop_user_typing_view(
        limit: 1, 
        order_by: {last_typed_at: desc}, 
        where: {
            loop_uuid: {_eq: $loop_uuid},
            user_uuid: {_neq: $user_uuid}
        }
    ) {
      user_uuid
    }
}
`

const TypingConversationSubscription = `
subscription TypingConversationSubscription($conversation_uuid: uuid = "", $user_uuid: uuid = "") {
    conversation_user_typing_view(
        limit: 1, 
        order_by: {last_typed_at: desc}, 
        where: {
            conversation_uuid: {_eq: $conversation_uuid},
            user_uuid: {_neq: $user_uuid}
        }
    ) {
      user_uuid
    }
}
`

const TypingIndicator = ({channel_uuid, isLoop}) => {
    const [show, setShow] = React.useState(false)
    const { user } = useContext(UserContext);
    useSubscription({
        query: TypingLoopSubscription,
        variables: {
            loop_uuid: channel_uuid,
            user_uuid: user.uuid
        },
        pause: !isLoop || !user.uuid
      }, (_, result) => {
        // console.log('LOOP TYPING RERSULT', result)
        setShow(result.loop_user_typing_view.length > 0)
    })
    useSubscription({
        query: TypingConversationSubscription,
        variables: {
            conversation_uuid: channel_uuid,
            user_uuid: user.uuid
        },
        pause: isLoop || !user.uuid
      }, (_, result) => {
        // console.log('CONVO TYPING RERSULT', result)
        setShow(result.conversation_user_typing_view.length > 0)
    })

    return (
        <View>
            {show 
                ? <View style={styles.messageContainer}>
                    <Image 
                        source={require('../../assets/images/typing.gif')} 
                        style={{
                            width: 100, 
                            height: 40, 
                            resizeMode: 'contain', 
                            borderRadius: 17,
                            marginTop: 4
                        }}  />
                </View>
                : <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        maxWidth: '90%',
        marginTop: 5,
        marginLeft: 28,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
})

export default TypingIndicator