import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Avatar from '~/components/Avatar';
import { GRAY } from '~/constants';

function Comment({
  id,
  author,
  text,
  children = [],
  commentsById = {},
  isParent = false,
  isActive = false,
  isFirstChild = false,
  onAuthorPress = () => {},
  onViewReplies = () => {},
  onReply = () => {},
}) {
  return (
    <View style={styles.comment}>
      <TouchableOpacity
        onPress={
          !isActive
            ? () => onViewReplies({ id })
            : () => {}
        }
      >
        {author &&
          <TouchableOpacity
            style={styles.author}
            onPress={() => onAuthorPress(author)}
          >
            <Avatar
              imageSrc={author.profile.photo}
              size="small"
            />

            <Text style={styles.authorName} >
              {author.name}
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
        <Text style={styles.createdAt}>1m</Text>

        <TouchableOpacity onPress={() => onReply({ id })}>
          <Text style={styles.action}>
            Reply {(children.length > 1 || (children.length > 0 && isFirstChild)) && `(${children.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      {children.length > 0 && !isFirstChild && !isParent &&
        <View style={styles.children}>
          <View style={styles.verticalSeparator} />

          <Comment
            id={children[0].id}
            author={commentsById[children[0].id].author}
            text={commentsById[children[0].id].text}
            children={children[0].children}
            commentsById={commentsById}
            isFirstChild={true}
            onAuthorPress={() => onAuthorPress(commentsById[children[0].id].author)}
            onViewReplies={() => onViewReplies({ id: children[0].id })}
            onReply={() => onReply({ id: children[0].id })}
          />

          {children.length > 1 &&
            <>
              <View style={styles.verticalSeparator} />

              <TouchableOpacity onPress={() => onViewReplies({ id })}>
                <Text style={styles.action}>
                  View replies ({(children.length - 1).toLocaleString()})
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
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
    marginBottom: 5,
  },
  authorName: {
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
