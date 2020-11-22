
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import NewMsgAlert from '~/assets/images/red-dot.svg'

const LoopItem = ({loop}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { loop_uuid: loop.uuid })}>
            <View style={styles.item}>
                <Text style={styles.title}># {loop.name}</Text>
                {/* {loop.hasNewMsg ? <NewMsgAlert /> : null} */}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginHorizontal: 30,
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#fff',
    },
});

export default LoopItem