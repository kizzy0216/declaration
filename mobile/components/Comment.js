import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

const { REST_BASE_URL } = Constants.manifest.extra;

import Avatar from '~/components/Avatar';
import { GRAY } from '~/constants';
import { formatDateTimeAgo } from '@shared/utils/formatDate';

function Comment({
  id,
  creator,
  text,
  children = [],
  commentsById = {},
  isParent = false,
  isActive = false,
  isFirstChild = false,
  canReply = true,
  createdAt,
  onCreatorPress = () => {},
  onViewReplies = () => {},
  onReply = () => {},
}) {
  const profilePhoto = (
    creator && creator.profile && creator.profile.photo
      ? creator.profile.photo
      : `${REST_BASE_URL}/avatar/${creator.uuid}`
  );

  const verbalizedCreatedAt = formatDateTimeAgo(createdAt);
  const fullComment = commentsById[id];
  const countChildren = fullComment && fullComment.countChildren;

  return (
    <View style={styles.comment}>
      <TouchableOpacity
        onPress={
          !isActive
            ? () => onViewReplies({ id })
            : () => {}
        }
      >
        {creator &&
          <TouchableOpacity
            style={styles.creator}
            onPress={() => onCreatorPress(creator)}
          >
            <Avatar
              imageSrc={profilePhoto}
              size="small"
            />

            <Text style={styles.creatorName} >
              {creator.name}
            </Text>
          </TouchableOpacity>
        }

        <Text
          style={[
            styles.text,
            isActive && styles.activeText,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.createdAt}>
          {verbalizedCreatedAt}
        </Text>

        {canReply &&
          <TouchableOpacity onPress={() => onReply({ id })}>
            <Text style={styles.action}>
              Reply {(countChildren > 1 || (countChildren > 0 && isFirstChild)) && `(${countChildren})`}
            </Text>
          </TouchableOpacity>
        }
      </View>

      {children.length > 0 && !isFirstChild && !isParent &&
        <View style={styles.children}>
          <View style={styles.verticalSeparator} />

          <Comment
            id={children[0].uuid}
            creator={children[0].creator}
            text={children[0].text}
            createdAt={children[0].createdAt}
            children={children[0].children}
            commentsById={commentsById}
            isFirstChild={true}
            onCreatorPress={() => onCreatorPress(children[0].creator)}
            onViewReplies={() => onViewReplies({ id: children[0].uuid })}
            onReply={() => onReply({ id: children[0].uuid })}
          />

          {countChildren > 1 &&
            <>
              <View style={styles.verticalSeparator} />

              <TouchableOpacity onPress={() => onViewReplies({ id })}>
                <Text style={styles.action}>
                  View replies ({(countChildren - 1).toLocaleString()})
                </Text>
              </TouchableOpacity>
            </>
          }
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
    marginBottom: 5,
  },
  creatorName: {
    fontSize: 12,
    fontWeight: '600',
    paddingRight: 5,
    paddingLeft: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  activeText: {
    fontSize: 18,
    lineHeight: 24,
  },
  children: {
  },

  verticalSeparator: {
    height: 20,
    width: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: GRAY,
  },

  action: {
    fontSize: 12,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  createdAt: {
    fontSize: 12,
    marginRight: 10,
  },
});

export default Comment;
