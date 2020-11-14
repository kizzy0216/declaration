import React, { useCallback, useContext, useEffect } from 'react'
import { View,StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ConversationItem from './ConversationItem'
// import { useFocusEffect } from '@react-navigation/native';
// import { useQuery } from 'urql';
// import { NetworkContext } from '~/contexts/NetworkContext';
// import { UserContext } from '~/contexts/UserContext';
// import GetNetworkUsers from '~/queries/GetNetworkUsers';
// // import * as Sentry from "@sentry/react-native";
// import mapUser from '@shared/mappings/mapUser';

const ConversationsContainer = ({conversations, removeConversation}) => {
    // const [ userList, setUserList ] = React.useState()
    // const { user } = useContext(UserContext);
    // const { activeNetwork } = useContext(NetworkContext);

    // const [getUsersResult,getUsers] = useQuery({
    //   query: GetNetworkUsers,
    //   variables: {
    //     network_uuid: activeNetwork.uuid,
    //     not_user_uuid: user.uuid,
    //   },
    //   pause: !activeNetwork.uuid,
    // });

    // useFocusEffect(useCallback(() => {
    //     getUsers({requestPolicy: 'network-only'});
    // }, []));

    // useEffect(() => {
    //     if (getUsersResult.error) {
    //         setUserList([])
    //         throw new Error(getUsersResult.error.message)
    //     }
    //     if (getUsersResult.fetching) { return }
    //     if (getUsersResult.data && getUsersResult.data.network_user) {
    //         const list = getUsersResult.data.network_user.map(({ user }) => mapUser(user))
    //         // console.log('GET USER DATA', list)
    //         setUserList(list)
    //     } else {
    //         setUserList([])
    //     }
    // }, [getUsersResult.data, getUsersResult.error, getUsersResult.fetching]);
    return (
        <View style={styles.container}>
            {conversations.map((conversation, idx) => (
                <ConversationItem
                    key={idx}
                    conversation={conversation}
                    deleteItem={removeConversation}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
    },
})

export default ConversationsContainer