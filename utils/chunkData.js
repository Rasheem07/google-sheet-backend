// Utility to split data into chunks
const chunkData = (data, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
};

// Function to dynamically determine chunk size
const determineChunkSize = (dataLength, maxChunks = 10) => {
  return Math.ceil(dataLength / maxChunks);
};

module.exports = { chunkData, determineChunkSize };
