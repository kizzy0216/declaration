
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import NewMsgAlert from '@shared/components/icons/ArrowLeftIcon' //'~/assets/images/red-dot.svg'

const LoopItem = ({loop}) => {

    return (
        <View style={styles.item}>
            <Text style={styles.title}># {loop.title}</Text>
            {loop.hasNewMsg ? <NewMsgAlert /> : null}
        </View>
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