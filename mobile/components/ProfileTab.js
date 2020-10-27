
import * as React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

const ProfileTab = ({ isActive, title, icon, onPress }) => {
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
        {icon ? icon :  <Text style={{ color: '#222'}}>{title}</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    smallShadow: {
        // paddingVertical: 15,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        borderRadius: 17,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 40,
        elevation: 20,
    },    
})
export default ProfileTab