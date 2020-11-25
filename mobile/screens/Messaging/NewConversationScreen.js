import React, { useContext, useState } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useMutation } from 'urql'
import { NetworkContext } from '../../contexts/NetworkContext'
import { UserContext } from '../../contexts/UserContext'
import InsertConversation from '../../mutations/InsertConversation'

import ContactSelector from './ContactSelector'

const NewConversationScreen = ({navigation}) => {

    const [selectedIds, setSelectedIds] = useState([])

    const { user } = useContext(UserContext);
    const { activeNetwork } = useContext(NetworkContext);

    const [_, insertConversation] = useMutation(InsertConversation);


    const selectContact = id => {
        if (!selectedIds.includes(id)) {
            setSelectedIds([...selectedIds, id])
        } else {
            setSelectedIds(selectedIds.filter(item => item !== id))
        }
    }

    const handleSubmit = () => {
        const variables = {
            network_uuid: activeNetwork.uuid,
            user_data: [...selectedIds.map(x => ({ user_uuid: x})), {user_uuid: user.uuid}],
        }
        insertConversation(variables).then(result => {
            if (result.error) {
                console.error('CONVO INSERT ISSUE', result.error)
            } else {
                setSelectedIds([])
                navigation.navigate('ChatScreen', { conversation_uuid: result.data.insert_conversation_one.uuid })
            }
        })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.root}
        >
            <View style={headerStyles.container}>
                <View style={headerStyles.header}>
                    <TouchableOpacity style={headerStyles.leftButton} onPress={() => navigation.goBack()}>
                        <Text style={headerStyles.letfButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={headerStyles.heading}>New messages</Text>
                    <TouchableOpacity style={headerStyles.rightButton} onPress={handleSubmit}>
                        <Text style={headerStyles.rightButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={contactListStyles.container}>
                <ContactSelector
                    selectContact={selectContact}
                    selectedIds={selectedIds}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fdfdfd'
    }
})

const headerStyles = StyleSheet.create({
    container: {
        paddingTop: 40,
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
    leftButton: {
        flex: 1,
        alignItems: 'center',
    },
    letfButtonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#999',
    },
    heading: {
        flex: 4,
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#222',
        alignSelf: 'center',
        textAlign: 'center'
    },
    rightButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 20
    },
    rightButtonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#222',
    },
    searchBoxContainer: {
        marginTop: 40,
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
    }
})

const contactListStyles = StyleSheet.create({
    container: {
        width: wp('100%'),
        paddingHorizontal: 30,
        flex: 1,
        paddingBottom: 20
    },
    heading: {
        marginVertical: 20,
        paddingHorizontal: 30,
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        color: '#222'
    },
    listContainer: {
        flex: 1,
    },
})

export default NewConversationScreen