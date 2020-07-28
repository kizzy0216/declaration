function chunkString({ string, length }) {
  const size = Math.ceil(string.length/length);
  const chunks = Array(size);
  let offset = 0;

  for (let i = 0; i < size; i++) {
    chunks[i] = string.substr(offset, length);
    offset += length;
  }

  return chunks;
}

export default chunkString;
