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

import ToggleSwitchOn from '~/assets/images/toggle-switch-on.svg'
import ToggleSwitchOff from '~/assets/images/toggle-switch-off.svg'

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

const NewLoopScreen = ({
    navigation
}) => {
    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
        Roboto_400Regular
    })

    const [contactList, setContactList] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [name, setName] = useState('')
    const [loopPublic, setLoopPublic] = useState(true)

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

    useEffect(() => {
        setContactList(testingData)
    }, [])

    if (!fontsLoaded) {
        return <View />
        // return <AppLoading />
    } else {
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.root}>
                {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}

                <View style={headerStyles.container}>
                    <View style={headerStyles.header}>
                        <TouchableOpacity style={headerStyles.leftButton} onPress={() => navigation.goBack()}>
                            <Text style={headerStyles.letfButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={headerStyles.heading}>New loop</Text>
                        <TouchableOpacity style={headerStyles.rightButton}onPress={() => navigation.navigate('ChatScreen')}>
                            <Text style={headerStyles.rightButtonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={headerStyles.searchBoxContainer}>
                        <Text style={headerStyles.searchHeading}>Make Public</Text>
                        <View style={[headerStyles.searchBox, headerStyles.publicBox]}>
                            <Text>Anyone can join this loop</Text>
                            <View>
                                {loopPublic ? <ToggleSwitchOn onPress={() => setLoopPublic(false)} /> : <ToggleSwitchOff onPress={() => setLoopPublic(true)} />}
                            </View>
                        </View>
                    </View>
                    <View style={headerStyles.searchBoxContainer}>
                        <Text style={headerStyles.searchHeading}>Name (lowercase, no spaces or periods)</Text>
                        <TextInput
                            placeholder="Name this loop"
                            placeholderTextColor="#979797"
                            style={headerStyles.searchBox}
                            autoCapitalize="none"
                            value={name}
                            onChangeText={text => setName(text.toLowerCase())}
                        />
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

                <View style={contactListStyles.container}>
                    <View style={contactListStyles.listContainer}>
                        <ContactSelector contacts={contactList} selectContact={selectContact} selectedIds={selectedIds} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
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
        marginBottom: 40,
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
        marginBottom: 20,
    },
    searchHeading: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        color: '#222',
    },
    publicBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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

export default NewLoopScreen