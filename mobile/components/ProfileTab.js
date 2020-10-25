
import * as React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

const ProfileTab = ({ isActive, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
            styles.smallShadow, 
            {
                backgroundColor: isActive ? "#FFFFFF" : "transparent"
            }
        ]}
      >
        <Text
          style={{
            color: '#222'
          }}
        >{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    smallShadow: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 17,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 20,
    },    
})
export default ProfileTab