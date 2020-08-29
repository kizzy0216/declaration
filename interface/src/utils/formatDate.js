export const formatDate = (timestamp) => {
  return (new Date(timestamp))
    .toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
}

export const formatDateTime = (timestamp) => {
  return (new Date(timestamp))
    .toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
}

export const formatTime = (timestamp) => {
  return (new Date(timestamp))
    .toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
}

export const formatDateTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + 'y ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'mo ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'd ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + 'h ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + 'm ago';
  }
  if (interval === 0) {
    return 'Just now';
  }
  return Math.floor(seconds) + 's ago';
}
