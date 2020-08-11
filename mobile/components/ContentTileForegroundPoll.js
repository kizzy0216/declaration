import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { GRAY } from '~/constants';

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
          <Fragment key={option.id}>
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
                  index !== options.length - 1 && isMultipleChoice && styles.textWithGutter,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
            {index === 0 && isSingleChoice &&
              <View style={styles.verticalSeparator} />
            }
            {(index != options.length - 1) && isMultipleChoice &&
              <View style={styles.horizontalSeparator} />
            }
          </Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poll: {
    borderRadius: 17,
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

  touchableContainer: {
  },
  touchableRow: {
    flex: 1,
    width: '50%',
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  touchableColumn: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },

  verticalSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: GRAY,
    opacity: 0.3,
  },
  horizontalSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: GRAY,
    opacity: 0.3,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 20,
  },
  textRow: {
    textAlign: 'center',
  },
  textColumn: {
  },
});

export default ContentTileForegroundPoll;
