import React from 'react'
import {
    ScrollView,
    StyleSheet,
} from 'react-native'

import ContactItem from './ContactItem'

const ContactSelector = ({
    contacts,
    selectContact,
    selectedIds
}) => {
    return (
        <ScrollView style={styles.list}>
            {contacts && contacts.map(contact => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                    selectItem={selectContact}
                    selected={selectedIds.includes(contact.id)}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 30
    },
})

export default ContactSelector