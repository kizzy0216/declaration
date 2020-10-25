import * as React from "react"
import { View } from "react-native"
import ProfileTab from "./ProfileTab"

const ProfileTabBar = ({tabList, activeIndex, onChangeIndex}) => {
    return (
        <View style={{
            borderRadius: 17,
            borderWidth: 1,
            borderColor: 'transparent',
            padding: 0,
            backgroundColor: '#F5F5F5',
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            {tabList.map((tab, index) => {
                return (
                    <ProfileTab
                    key={index}
                    isActive={activeIndex === index}
                    title={tab.title}
                    onPress={() => onChangeIndex(index)}
                    />
                )
            })}
        </View>
    )
}

export default ProfileTabBar