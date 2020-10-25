import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

function SearchContentScroller({ title, children, viewStyle }) {

  return (
        <View style={{...viewStyle}}>
          <Text style={styles.heading}>
            {title || 'Posts'}
          </Text>
          <View style={{marginLeft: 16}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
              contentContainerStyle={styles.contentContainer}
            >
              {children}
            </ScrollView>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    overflow: 'visible'
  },
  contentContainer: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default SearchContentScroller;
