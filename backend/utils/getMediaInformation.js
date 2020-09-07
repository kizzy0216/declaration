import sharp from 'sharp';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
import mimeTypes from 'mime-types';

const ffprobePath = ffprobeStatic.path;

async function getAudioInformation({
  filePath,
}) {
  const metadata = await ffprobe(filePath, { path: ffprobePath });
  const stream = metadata.streams.find(s => s.codec_type === 'audio');

  if (!stream) {
    throw new Error('audio stream not found');
  }

  return {
    duration: parseFloat(stream.duration),
  };
}

function getImageInformation({
  filePath,
}) {
  const metadata = sharp(filePath).metadata();
  const { width, height, orientation } = metadata;

  // Fix the height and width if the orientation is > 4
  // 1-4 are flipped either horizontally or vertically so dimensions don't change
  // 5-8 are all rotated 90 or 270 with or without flipping so need to be swapped.
  // @see http://sylvana.net/jpegcrop/exif_orientation.html
  return orientation > 4 ? { width: height, height: width } : { width, height };
}

async function getVideoInformation({
  filePath,
}) {
  const metadata = await ffprobe(filePath, { path: ffprobePath });
  const stream = metadata.streams.find(s => s.codec_type === 'video');
  if (!stream) {
    throw new Error('video stream not found');
  }

  const { rotation, side_data_list: sideDataList = [] } = stream;
  const { rotation: sideDataRotation } = sideDataList.find(sideData => sideData.rotation) || {};

  const { width, height, duration } = stream;
  return Math.abs((rotation || sideDataRotation || 0) % 180) === 90
    ? { width: height, height: width, duration: parseFloat(duration) }
    : { width, height, duration: parseFloat(duration) };
}

async function getMediaInformation({
  filePath,
  mediaType, // image, video, audio
}) {
  if (!mediaType) {
    return console.error('Pass mediaType (one of "image", "video", "audio")');
  }

  const contentType = mimeTypes.lookup(filePath);
  if (mediaType === 'image') {
    return {
      ...getImageInformation({ filePath }),
      contentType,
    };
  } else if (mediaType === 'video') {
    return {
      ...await getVideoInformation({ filePath }),
      contentType,
    };
  } else if (mediaType === 'audio') {
    return {
      ...await getAudioInformation({ filePath }),
      contentType,
    };
  }
}

export default getMediaInformation;
