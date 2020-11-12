import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import Animated, {
    abs,
    add,
    cond,
    eq,
    set,
    useCode,
} from 'react-native-reanimated'
import {
    PanGestureHandler,
    State,
    TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import {
    snapPoint,
    timing,
    useClock,
    usePanGestureHandler,
    useValue,
    minus,
    clamp,
} from 'react-native-redash/lib/module/v1'

import ConversationItemLayout from './ConversationItemLayout';
import Action from './Action';

const snapPoints = [-75, 0];

const ConversationItem = ({
    conversation,
    deleteItem
}) => {
    const {
        gestureHandler,
        translation,
        velocity,
        state
    } = usePanGestureHandler()

    const translateX = useValue(0);
    const offsetX = useValue(0);
    const height = useValue(95);
    const deleteOpacity = useValue(1);
    const clock = useClock();
    const to = snapPoint(translateX, velocity.x, snapPoints);
    useCode(
        () => [
            cond(eq(state, State.ACTIVE),
                set(translateX, add(offsetX, clamp(translation.x, -9999, minus(offsetX))))
            ),
            cond(eq(state, State.END), [
                set(translateX, timing({ clock, from: translateX, to })),
                set(offsetX, translateX),
            ]),
        ],
        []
    );

    return (
        <Animated.View>
            <View style={styles.background}>
                <TouchableWithoutFeedback onPress={() => deleteItem(conversation.id)}>
                    <Action x={abs(translateX)} height={95} {...{ deleteOpacity }} />
                </TouchableWithoutFeedback>
            </View>
            <PanGestureHandler failOffsetY={[-5, 5]} activeOffsetX={[-5, 5]} {...gestureHandler}>
                <Animated.View style={{ height, transform: [{ translateX }] }}>
                    <ConversationItemLayout {...{ conversation }} />
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden'
    }
})

export default ConversationItem