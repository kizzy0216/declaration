import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BLUE } from '~/constants';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';

function MediaLibraryTile({
  index,
  item,
  selectedItem,
  countColumns,
  countItems,
  containerWidth,
  gutterWidth,
  onPress = () => {},
}) {
  const imageSize = (containerWidth / countColumns) - (((countColumns - 1) * gutterWidth) / countColumns);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.imageTile,
          (index % countColumns != countColumns - 1) && styles.withGutter,
          (index === 0) && styles.topLeftItem,
          (index === (countColumns - 1)) && styles.topRightItem,
          // EW!!!!
          (index === (countItems - (countItems % countColumns === 0 ? countColumns : countItems % countColumns))) && styles.bottomLeftItem,
          (countItems % 3 === 0) && (index === (countItems - 1)) && styles.bottomRightItem,
          (selectedItem.id === item.id) && styles.selectedItem,
        ]}
      >
        {selectedItem.id === item.id &&
          <View style={styles.selectedOverlay}>
            <CheckmarkIcon
              width={32}
              height={32}
              fill="white"
            />
          </View>
        }

        <Image
          source={item}
          style={{
            width: imageSize,
            height: imageSize,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  imageTile: {
    position: 'relative',
    marginBottom: 5,
  },
  withGutter: {
    marginRight: 5,
  },
  topLeftItem: {
    borderTopLeftRadius: 17,
    overflow: 'hidden',
  },
  topRightItem: {
    borderTopRightRadius: 17,
    overflow: 'hidden',
  },
  bottomLeftItem: {
    borderBottomLeftRadius: 17,
    overflow: 'hidden',
  },
  bottomRightItem: {
    borderBottomRightRadius: 17,
    overflow: 'hidden',
  },
  selectedOverlay: {
    opacity: 0.7,
    backgroundColor: BLUE,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MediaLibraryTile;
