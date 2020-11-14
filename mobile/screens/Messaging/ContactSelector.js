import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from 'urql';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import GetNetworkUsers from '~/queries/GetNetworkUsers';
// import * as Sentry from "@sentry/react-native";
import mapUser from '@shared/mappings/mapUser';

import ContactItem from './ContactItem'

const ContactSelector = ({selectContact, selectedIds}) => {


    // TODO - MOVE ALL THIS TO NETWORK CONTEXT
    const [ dataList, setDataList ] = useState([])
    const [ userList, setUserList ] = useState([])
    const { user } = useContext(UserContext);
    const { activeNetwork } = useContext(NetworkContext);

    const [getUsersResult,getUsers] = useQuery({
      query: GetNetworkUsers,
      variables: {
        network_uuid: activeNetwork.uuid,
        not_user_uuid: user.uuid,
      },
      pause: !activeNetwork.uuid,
    });

    useFocusEffect(useCallback(() => {
        getUsers({requestPolicy: 'network-only'});
    }, []));

    useEffect(() => {
        if (getUsersResult.error) {
            setUserList([])
            throw new Error(getUsersResult.error.message)
        }
        if (getUsersResult.fetching) { return }
        if (getUsersResult.data && getUsersResult.data.network_user) {
            const data = getUsersResult.data.network_user.map(({ user }) => mapUser(user))
            setDataList(data)
            setUserList(data)
        } else {
            setUserList([])
        }
    }, [getUsersResult.data, getUsersResult.error, getUsersResult.fetching]);

    const filterUsers = value => {
        try {
            if (value !== '') {
                const lowerValue = value.toLowerCase()
                const newList = dataList.filter(item => 
                    item.name.toLowerCase().includes(lowerValue) ||
                    (item.profile.workTitle && item.profile.workTitle.toLowerCase().includes(lowerValue))
                )
                setUserList(newList)
            } else {
                setUserList(dataList)
            }
        } catch {
            setUserList([])
        }
    }
    return (
        <View style={styles.root}>
            <View style={styles.searchBoxContainer}>
                <Text style={styles.searchHeading}>Send to members</Text>
                <TextInput
                    placeholder="Search by name"
                    placeholderTextColor="#979797"
                    style={styles.searchBox}
                    onChangeText={filterUsers}
                />
            </View>
            <View style={contactListStyles.container}>
                <View style={contactListStyles.listContainer}>
                    {!getUsersResult.fetching && userList.length === 0 ? (
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={styles.searchHeading}>Nobody here</Text>
                        </View>
                    ) : <ScrollView showsVerticalScrollIndicator={false} style={contactListStyles.list}>
                        {userList.map((contact, idx) => (
                            <ContactItem
                                key={idx}
                                contact={contact}
                                selectItem={selectContact}
                                selected={selectedIds.includes(contact.uuid)}
                            />
                            ))}
                    </ScrollView>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: wp('100%'),
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        flex: 1
    },
    searchBoxContainer: {
        marginBottom: 20,
    },
    searchHeading: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        color: '#222',
    },
    searchBox: {
        marginVertical: 10,
        height: 60,
        backgroundColor: '#f5f5f5',
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 15
    },
})


const contactListStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        marginBottom: 100
        // marginBottom: 80
    },
    list: {
        // marginBottom: 80
    }
})
export default ContactSelector