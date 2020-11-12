import React, {
    useState,
    useEffect,
} from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Text,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'

import {
    useFonts,
    Roboto_500Medium,
    Roboto_400Regular
} from '@expo-google-fonts/roboto'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import ContactSelector from './ContactSelector'

const testingData = [
    {id: '1', firstName: 'Susan', lastName: 'Mitchell', position: 'Founder and CEO', photoUrl: require('../../assets/images/avatar/alexandru-zdrobau--djRG1vB1pw-unsplash.jpg'), onLine: true},
    {id: '2', firstName: 'Ryan', lastName: 'Edmonson', position: 'Interaction Designer', photoUrl: require('../../assets/images/avatar/azamat-zhanisov-a5sRFieA3BY-unsplash.jpg'), onLine: false},
    {id: '3', firstName: 'Amber', lastName: 'Alexander', position: 'Project Manager', photoUrl: require('../../assets/images/avatar/carlos-vaz-KP4bxnxAilU-unsplash.jpg'), onLine: false},
    {id: '4', firstName: 'Daniel', lastName: 'Raddson', position: 'Brand Manager', photoUrl: require('../../assets/images/avatar/alexandru-zdrobau--djRG1vB1pw-unsplash.jpg'), onLine: false},
    {id: '5', firstName: 'Susan', lastName: 'Mitchell', position: 'Founder and CEO', photoUrl: require('../../assets/images/avatar/daniil-lobachev-jn-nsWeYOrY-unsplash.jpg'), onLine: false},
    {id: '6', firstName: 'Susan', lastName: 'Mitchell', position: 'Project Manager', photoUrl: require('../../assets/images/avatar/alexandru-zdrobau--djRG1vB1pw-unsplash.jpg'), onLine: false},
    {id: '7', firstName: 'Susan', lastName: 'Mitchell', position: 'Marketing Director', photoUrl: require('../../assets/images/avatar/carlos-vaz-KP4bxnxAilU-unsplash.jpg'), onLine: true},
]

const NewConversationScreen = ({
    navigation
}) => {
    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
        Roboto_400Regular
    })

    const [contactList, setContactList] = useState([])
    const [selectedIds, setSelectedIds] = useState([])

    const selectContact = id => {
        if (!selectedIds.includes(id)) {
            setSelectedIds([...selectedIds, id])
        } else {
            setSelectedIds(selectedIds.filter(item => item !== id))
        }
    }

    const filterContacts = value => {
        try {
            if (value !== '') {
                setContactList(testingData.filter(item => (item.firstName + item.lastName).search(value) !== -1))
            } else {
                setContactList(testingData)
            }
        } catch {
            setContactList([])
        }
    }

    const goToHome = () => navigation.goBack()

    const goToDMChat = () => navigation.navigate('ChatScreen')

    useEffect(() => {
        setContactList(testingData)
    }, [])

    if (!fontsLoaded) {
        return <View />
        // return <AppLoading />
    } else {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.root}
            >
                {/* <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#fff"
                /> */}
                <Header
                    filterContacts={filterContacts}
                    leftBtnAction={goToHome}
                    rightBtnAction={goToDMChat}
                />
                <View style={contactListStyles.container}>
                    <Text style={contactListStyles.heading}>
                        Recent conversations
                    </Text>
                    <View style={contactListStyles.listContainer}>
                        <ContactSelector
                            contacts={contactList}
                            selectContact={selectContact}
                            selectedIds={selectedIds}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const Header = ({
    leftBtnAction,
    rightBtnAction,
    filterContacts
}) => {
    return (
        <View style={headerStyles.container}>
            <View style={headerStyles.header}>
                <TouchableOpacity style={headerStyles.leftButton} onPress={leftBtnAction}>
                    <Text style={headerStyles.letfButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={headerStyles.heading}>New messages</Text>
                <TouchableOpacity style={headerStyles.rightButton} onPress={rightBtnAction}>
                    <Text style={headerStyles.rightButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={headerStyles.searchBoxContainer}>
                <Text style={headerStyles.searchHeading}>Send to members</Text>
                <TextInput
                    placeholder="Search by name"
                    placeholderTextColor="#979797"
                    style={headerStyles.searchBox}
                    onChangeText={filterContacts}
                />
            </View>
        </View>
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