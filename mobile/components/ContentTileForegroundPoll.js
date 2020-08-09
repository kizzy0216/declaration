import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ContentTileForegroundPoll({
  poll,
  onSelect = () => {},
}) {
  if (!poll) {
    return null;
  }

  const { options } = poll;

  const isSingleChoice = options.length === 2;
  const isMultipleChoice = options.length > 2;

  return (
    <View style={styles.poll}>
      <View
        style={[
          styles.container,
          isSingleChoice && styles.containerRow,
          isMultipleChoice && styles.containerColumn,
        ]}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            containerStyle={[
              styles.touchableContainer,
              isSingleChoice && styles.touchableRow,
              isMultipleChoice && styles.touchableColumn,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.text,
                isSingleChoice && styles.textRow,
                isMultipleChoice && styles.textColumn,
                index === 0 && isSingleChoice && styles.textLeft,
                index === 1 && isSingleChoice && styles.textRight,
                index !== options.length - 1 && isMultipleChoice && styles.textWithGutter,
              ]}
            >
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poll: {
    borderRadius: 17,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'visible',
    backgroundColor: 'white',
    width: '85%',
  },

  container: {
    borderRadius: 13,
    overflow: 'hidden',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerColumn: {
    flexDirection: 'column',
  },

  touchableRow: {
    flex: 1,
    width: '50%',
  },
  touchableColumn: {
  },

  textRight: {
    textAlign: 'right',
  },
  textRow: {
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    fontSize: 13,
    lineHeight: 20,
  },
  textColumn: {
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    fontSize: 13,
    lineHeight: 20,
  },
  textWithGutter: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default ContentTileForegroundPoll;
