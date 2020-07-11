function formatDate(timestamp) {
  return (new Date(timestamp))
    .toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
}

export default formatDate;
