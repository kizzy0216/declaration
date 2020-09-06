import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  GRAY,
  LIGHT_BLUE,
} from '~/constants';
import Badge from '~/components/Badge';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';

const BADGE_LABELS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

function ContentTileForegroundPoll({
  poll,
  onSelect = () => {},
}) {
  if (!poll) {
    return null;
  }

  const {
    options,
    vote,
    voteCounts,
    voteCountsByOptionUuid,
    totalVoteCounts,
  } = poll;

  const hasVoted = !!vote;
  const isSingleChoice = options.length === 2;
  const isMultipleChoice = options.length > 2;

  const percentages = options.map((option, index) => {
    const voteCount = voteCountsByOptionUuid[option.uuid];

    if (!voteCount) {
      return '0%';
    }

    const percentageNumber = Math.round((voteCount * 100) / totalVoteCounts);

    return `${percentageNumber}%`;
  });

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
          <Fragment key={option.uuid}>
            <TouchableOpacity
              style={[
                isMultipleChoice && styles.touchableColumn,
              ]}
              containerStyle={[
                styles.touchableContainer,
                isSingleChoice && styles.touchableContainerRow,
                isSingleChoice && hasVoted && styles.touchableContainerRowVoted,
                isMultipleChoice && styles.touchableContainerColumn,
              ]}
              disabled={hasVoted}
              onPress={() => onSelect(option)}
            >
              {isMultipleChoice &&
                <View style={styles.badgeWrapper}>
                  <Badge label={BADGE_LABELS[index]} />
                </View>
              }

              <Text
                style={[
                  styles.text,
                  isSingleChoice && styles.textRow,
                  hasVoted && styles.textVoted,
                  isMultipleChoice && hasVoted && styles.textVotedMultipleChoice,
                  isSingleChoice && !hasVoted && styles.textCenter,
                  isSingleChoice && hasVoted && index === options.length - 1 && styles.textRight,
                  isMultipleChoice && styles.textColumn,
                  index !== options.length - 1 && isMultipleChoice && styles.textWithGutter,
                ]}
              >
                {option.text}
                {hasVoted && (vote.uuid === option.uuid) && (
                  <>
                    &nbsp;
                    <CheckmarkIcon
                      width={16}
                      height={16}
                      fill="black"
                    />
                  </>
                )}
              </Text>

              {hasVoted &&
                <Text
                  style={[
                    styles.textPercentage,
                    isSingleChoice && index === options.length - 1 && styles.textRight,
                  ]}
                >
                  {percentages[index]}
                </Text>
              }
            </TouchableOpacity>

            {index === 0 && isSingleChoice && !hasVoted &&
              <View style={styles.verticalSeparator} />
            }

            {(index != options.length - 1) && isMultipleChoice && !hasVoted &&
              <View style={styles.horizontalSeparator} />
            }
          </Fragment>
        ))}

        {hasVoted && percentages.length > 0 &&
          <View style={styles.percentagesWrapper}>
            {(isMultipleChoice ? percentages : [percentages[0]]).map((percentage, index) => (
              <View
                key={index}
                style={{
                  width: percentage,
                  height: `${(isMultipleChoice ? (100 / percentages.length) : 100)}%`,
                  backgroundColor: LIGHT_BLUE,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
            ))}
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poll: {
    borderRadius: 17,
    marginTop: 20,
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
    width: '75%',
  },

  container: {
    borderRadius: 13,
    overflow: 'hidden',
    position: 'relative',
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
  touchableContainerRow: {
    flex: 1,
    width: '50%',
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
  },
  touchableContainerRowVoted: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  touchableContainerColumn: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  touchableColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  badgeWrapper: {
    marginRight: 5,
    width: 18,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
  },
  textRow: {
  },
  textColumn: {
    flex: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textVoted: {
    fontSize: 13,
    lineHeight: 20,
  },
  textVotedMultipleChoice: {
    flexGrow: 1,
  },

  textPercentage: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },

  percentagesWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
  },
});

export default ContentTileForegroundPoll;
