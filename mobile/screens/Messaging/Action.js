import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import Animated, {
    divide,
    interpolate,
    Extrapolate,
    sub,
    cond,
    add,
    lessThan,
    multiply,
} from 'react-native-reanimated';

const Action = ({ x, deleteOpacity, height }) => {
    const size = cond(lessThan(x, 75), x, add(x, sub(x, 75)));
    const translateX = cond(lessThan(x, 75), 0, divide(sub(x, 75), 2));
    const scale = interpolate(size, {
        inputRange: [20, 30],
        outputRange: [0.01, 1],
        extrapolate: Extrapolate.CLAMP,
    });
    const iconOpacity = interpolate(size, {
        inputRange: [height - 25, height - 20],
        outputRange: [1, 0],
    });
    const textOpacity = sub(1, iconOpacity);
    return (
        <Animated.View
            style={{
                backgroundColor: '#ed4956',
                justifyContent: 'center',
                alignItems: 'center',
                height: height,
                width: size,
                transform: [{ translateX }],
            }}
        >
            <Animated.View
                style={{
                    height: 5,
                    width: 20,
                    opacity: iconOpacity,
                    transform: [{ scale }],
                }}
            />
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: multiply(textOpacity, deleteOpacity),
                }}
            >
                <Text style={styles.remove}>Delete</Text>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    remove: {
        backgroundColor: '#ed4956',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 14
    },
});

export default Action;