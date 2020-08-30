import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { REST_BASE_URL } = Constants.manifest.extra;

import ScreenHeader from '~/components/ScreenHeader';
import NetworkSwitcherModal from '~/components/NetworkSwitcherModal';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import MessageIcon from '@shared/components/icons/MessageIcon';
import CalendarIcon from '@shared/components/icons/CalendarIcon';
import ChevronDownIcon from '@shared/components/icons/ChevronDownIcon';
import AnimatedSpinnerIcon from '~/components/AnimatedSpinnerIcon';

function FeedHeader({
  theme = 'dark', // light or dark
  isFetching = false,
  onNetworkAdd = () => {},
  onNetworkCreate = () => {},
  onCalendarPress = () => {},
  onMessagesPress = () => {},
}) {
  const themeAnimation = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    activeNetwork,
    networks,
    setActiveNetwork,
  } = useContext(NetworkContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    Animated.timing(themeAnimation, {
      toValue: (theme === 'light' ? 1 : 0),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  // const leftElement = (
  //   <BorderlessButton onPress={onCalendarPress}>
  //     <CalendarIcon
  //       width={22}
  //       height={22}
  //       fill={
  //         themeAnimation.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: ['#000000', '#FFFFFF'],
  //         })
  //       }
  //     />
  //   </BorderlessButton>
  // );
  const leftElement = null;

  // const rightElement = (
  //   <BorderlessButton onPress={onMessagesPress}>
  //     <MessageIcon
  //       width={22}
  //       height={22}
  //       fill={
  //         themeAnimation.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: ['#000000', '#FFFFFF'],
  //         })
  //       }
  //     />
  //   </BorderlessButton>
  // );
  const rightElement = <></>;

  return (
    <View style={styles.container}>
      <NetworkSwitcherModal
        isVisible={isModalVisible}
        activeItem={activeNetwork}
        items={
          networks.map((network) => ({
            uuid: network.uuid,
            label: network.name,
            imageSrc: network.avatar,
            onPress: () => {
              setActiveNetwork(network);
              setIsModalVisible(false);
            },
          }))
        }
        onClose={() => setIsModalVisible(false)}
        onNetworkAdd={() => {
          setIsModalVisible(false);
          onNetworkAdd();
        }}
        onNetworkCreate={() => {
          setIsModalVisible(false);
          onNetworkCreate();
        }}
      />

      <ScreenHeader
        leftElement={leftElement}
        headingElement={(
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
          >
            <View style={styles.nameWrapper}>
              <Animated.Text
                style={{
                  ...styles.name,
                  color: themeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#000000', '#FFFFFF'],
                  })
                }}
              >
                {activeNetwork && activeNetwork.name}
              </Animated.Text>
              <View style={styles.iconWrapper}>
                {isFetching ?
                  (
                    <AnimatedSpinnerIcon
                      width={16}
                      height={16}
                      fill={
                        themeAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['#000000', '#FFFFFF'],
                        })
                      }
                    />
                  ) : (
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      fill={
                        themeAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['#000000', '#FFFFFF'],
                        })
                      }
                    />
                  )
                }
              </View>
            </View>
          </TouchableOpacity>
        )}
        rightElement={rightElement}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nameWrapper: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  iconWrapper: {
    marginLeft: 5,
  },
});

export default FeedHeader;
