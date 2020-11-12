import React from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'

import CheckOff from '@shared/components/icons/ArrowLeftIcon' // '../../assets/images/check_off.svg'
import CheckOn from '@shared/components/icons/ArrowLeftIcon' // '../../assets/images/check_on.svg'

const ContactItem = ({
    contact,
    selectItem,
    selected
}) => {
    return (
        <View style={styles.contactItem}>
            <View style={styles.photoNameContainer}>
                <Image
                    source={contact.photoUrl}
                    style={contact.onLine ? styles.avatarOnline : styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{contact.firstName} {contact.lastName}</Text>
                    <Text style={styles.position}>{contact.position}</Text>
                </View>
            </View>

            <View style={styles.checkBoxContainer}>
                {selected ? <CheckOn onPress={() => selectItem(contact.id)} /> : <CheckOff onPress={() => selectItem(contact.id)} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contactItem: {
        flexDirection: 'row',
        height: 95,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5'
    },
    photoNameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxContainer: {
        alignItems: 'center'
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
    position: {
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: '#999'
    },
})

export default ContactItem