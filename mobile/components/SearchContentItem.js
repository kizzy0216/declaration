import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

function SearchContentItem({children}) {

  return (
      <View
        style={[
          styles.cardWrapper
        ]}
      >
        {children}
      </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    marginLeft: 16,
  },
});

export default SearchContentItem;
