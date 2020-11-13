import React, {
  useState,
  useEffect,
  useContext,
} from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'

import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { BorderlessButton } from 'react-native-gesture-handler';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';

import LoopItem from './LoopItem'
import ConversationItem from './ConversationItem'

import ScreenHeader from '~/components/ScreenHeader';
import PlusIcon from '~/assets/images/plus.svg'
import LoopBack from '~/assets/images/loop-back.svg'
import Chat from '~/assets/images/chat.svg'


import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular
} from '@expo-google-fonts/roboto'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MessageContext } from '../../contexts/MessageContext';
import ConversationsContainer from './Conversations';

// const testingDataLoops = [
//   {id: '1', title: 'sds_announcements', hasNewMsg: false},
//   {id: '2', title: 'sds_events', hasNewMsg: true},
//   {id: '3', title: 'sds_thepowerofwe', hasNewMsg: false},
//   {id: '4', title: 'sds_thepowerofwe2', hasNewMsg: false},
// ]
// const testingDataDM = [
//   {id: '1', firstName: 'Susan', lastName: 'Mitchell', lastMsg: 'Yes, I think so.', msgTime: 'Fri', onLine: false, readMsg: true, photoUrl: require('~/assets/images/avatar/alexandru-zdrobau--djRG1vB1pw-unsplash.jpg')},
//   {id: '2', firstName: 'Amber', lastName: 'Alexander', lastMsg: 'This is great. I would love to do that.', msgTime: '11:19', onLine: false, readMsg: false, photoUrl: require('~/assets/images/avatar/azamat-zhanisov-a5sRFieA3BY-unsplash.jpg')},
//   {id: '3', firstName: 'Hope', lastName: 'Morison', lastMsg: 'How is it going?', msgTime: 'Wed', onLine: true, readMsg: true, photoUrl: require('~/assets/images/avatar/carlos-vaz-KP4bxnxAilU-unsplash.jpg')},
//   {id: '4', firstName: 'Susan', lastName: 'Mitchell', lastMsg: `What's up?`, msgTime: '11:19', onLine: true, readMsg: true, photoUrl: require('~/assets/images/avatar/daniil-lobachev-jn-nsWeYOrY-unsplash.jpg')},
// ]

function MessagingHomeScreen({ navigation }) {
    const [loops, setLoops] = useState([])
    const [conversations, setConversations] = useState([])
    const { isFetchingItems, loops: loopData, conversations: conversationData, refresh } = useContext(MessageContext);
    
    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
        Roboto_400Regular
    })

  const removeConversation = id => {
      setConversations(conversations.filter(item => item.id !== id))
        // mutation for DB
        // refresh real data on success
  }

  useEffect(() => {
      setLoops(loopData),
      setConversations(conversationData)
  }, [])

  if (!fontsLoaded) {
    return <View />
    // return <AppLoading />
  } else {
    return (
    <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <ScreenHeader
                heading="Messages"
                leftElement={
                    <BorderlessButton onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon
                            width={22}
                            height={22}
                            fill={'#000000'}
                        />
                    </BorderlessButton>
                }
                rightElement={<></>}
            />
            <ScrollView 
                style={styles.root}
                refreshControl={
                    <RefreshControl
                      refreshing={isFetchingItems}
                      onRefresh={refresh}
                    />
                }
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
                <View style={headerStyles.container}>
                    <View style={headerStyles.searchBoxContainer}>
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="#979797"
                            style={headerStyles.searchBox}
                            />
                    </View>
                </View>

                <View style={loopsStyles.container}>
                    <View style={loopsStyles.loops}>
                        <View style={loopsStyles.header}>
                            <Text style={loopsStyles.title}>Loops</Text>
                            <TouchableOpacity
                                style={styles.plusButton}
                                onPress={() => navigation.navigate('NewLoop')}
                                >
                                <PlusIcon
                                    width={14}
                                    height={14}
                                    fill={'#000000'}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={loopsStyles.content}>
                            {(loops && loops.length !== 0) ? 
                                (
                                    <View style={styles.fullWidthContainer}>
                                        {loops.map((loop, idx) => (
                                            <LoopItem
                                                key={idx}
                                                loop={loop}
                                            />
                                        ))}
                                    </View>
                                ) : (
                                <>
                                    <LoopBack style={loopsStyles.loopSvg} />
                                    <Text style={loopsStyles.intro}>
                                        Life is an infinite loop of teaching and learning. Create a loop and invite others to discuss any topic using #hashtags.
                                    </Text>
                                </>
                                )
                            }
                        </View>
                    </View>
                </View>

                <View style={conversationStyles.container}>
                    <View style={conversationStyles.header}>
                        <Text style={conversationStyles.title}>Direct messages</Text>
                        <TouchableOpacity
                            style={styles.plusButton}
                            onPress={() => navigation.navigate('NewConversation')}
                            >
                                <PlusIcon
                                    width={14}
                                    height={14}
                                    fill={'#000000'}
                                />
                        </TouchableOpacity>
                    </View>

                    <View style={conversationStyles.content}>
                        {(conversations && conversations.length !== 0) ? 
                            (
                                <ConversationsContainer
                                    conversations={conversations}
                                />
                            ) : (
                            <>
                                <Chat style={conversationStyles.chatSvg} />
                                <Text style={conversationStyles.intro}>
                                    Connect and engage directly with members anywhere in the world about the things you care about the most.
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )};
}

const styles = StyleSheet.create({
    fullWidthContainer: {
        width: wp('100%'),
    },
    root: {
        backgroundColor: '#6ac2bd',
        height: '100%'
    },
    plusButton: {
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 20
    },
});

const headerStyles = StyleSheet.create({
    container: {
        paddingBottom: 25,
        paddingTop: 4,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        borderBottomRightRadius: 40,
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftButton: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    heading: {
        flex: 4,
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#222',
        alignSelf: 'center',
        textAlign: 'center'
    },
    searchBoxContainer: {
    },
    searchBox: {
        height: 60,
        backgroundColor: '#f5f5f5',
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
        paddingHorizontal: 25,
        alignItems: 'center',
        borderRadius: 15
    }
})

const loopsStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    loops: {
        backgroundColor: '#6ac2bd',
        borderTopLeftRadius: 40,
        paddingHorizontal: 30,
        paddingTop: 30,
        paddingBottom: 25
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#fff',
    },
    content: {
        justifyContent: 'center',
        alignItems: "center"
    },
    loopSvg: {
        marginTop: 30,
        marginBottom: 20
    },
    intro: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 25
    },
})

const conversationStyles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fdfdfd',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#222',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatSvg: {
        marginTop: 30,
        marginBottom: 20
    },
    intro: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#222',
        textAlign: 'center'
    },
})
export default MessagingHomeScreen;
