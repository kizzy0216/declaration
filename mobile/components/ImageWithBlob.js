import React, { useEffect } from 'react';
import { Image } from 'react-native';

import urlToBlob from '~/utils/urlToBlob';

function ImageWithBlob(props) {
  const {
    source,
    onBlobLoad = () => {},
  } = props;

  useEffect(() => {
    (async () => {
      const blob = await urlToBlob(source.uri);
      onBlobLoad({ blob });
    })();
  }, []);

  return (
    <Image {...props} />
  );
}

export default ImageWithBlob;
