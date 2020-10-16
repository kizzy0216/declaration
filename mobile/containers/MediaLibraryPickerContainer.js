import React, {
  useState,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import EmptyState from '~/components/EmptyState';
import { IS_IOS } from '~/constants';
import MediaLibraryTile from '~/components/MediaLibraryTile';

const GUTTER_WIDTH = 5;
const COUNT_COLUMNS = 3;

function MediaLibraryPickerContainer({
  isJustImage = false,
  isJustVideo = false,
  onChange = () => {},
}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [hasSettledPermissions, setHasSettledPermissions] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const [media, setMedia] = useState({});
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    (async () => {
      if (IS_IOS) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to upload media.');
          setHasPermission(false);
        } else {
          setHasPermission(true);
        }

        setHasSettledPermissions(true);
      }
    })();
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [hasSettledPermissions, hasPermission]);

  if (!hasSettledPermissions) {
    return null;
  }

  if (!hasPermission) {
    return (
      <EmptyState
        heading="Can't access media"
      />
    );
  }

  async function fetchMedia() {
    if (hasSettledPermissions && hasPermission && (!media.assets || media.hasNextPage)) {
      const {
        assets,
        endCursor,
        hasNextPage,
        totalCount,
      } = await MediaLibrary.getAssetsAsync({
        first: 20,
        after: media.endCursor,
        mediaType: [
          isJustImage && MediaLibrary.MediaType.photo,
          isJustVideo && MediaLibrary.MediaType.video,
        ].filter(x => x),
      });

      setMedia({
        assets: [
          ...(media.assets || []),
          ...assets,
        ],
        endCursor,
        hasNextPage,
        totalCount,
      });
    }
  }

  function handleLayout(event) {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }

  function handlePress(item) {
    setSelectedItem(item);
    onChange(item);
  }

  return (
    <View
      style={styles.mediaLibraryPicker}
      onLayout={handleLayout}
    >
      {containerWidth &&
        <FlatList
          data={media.assets || []}
          numColumns={COUNT_COLUMNS}
          renderItem={({ item, index }) => (
            <MediaLibraryTile
              item={item}
              index={index}
              selectedItem={selectedItem}
              countColumns={COUNT_COLUMNS}
              countItems={media.assets.length}
              gutterWidth={GUTTER_WIDTH}
              containerWidth={containerWidth}
              onPress={() => handlePress(item)}
            />
          )}
          keyExtractor={item => item.id}
          onEndReached={()=> fetchMedia()}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ margin: 50 }} />}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mediaLibraryPicker: {
    flex: 1,
  },
});

export default MediaLibraryPickerContainer;
