require('dotenv').config();
const WebSocket = require('ws');
const http = require('http');
const convertValues = require('./utils/convertValues');
const fetchDataWithRetry = require('./utils/fetchDataWithRetry');
const { determineChunkSize, chunkData } = require('./utils/chunkData');

// Create HTTP server for WebSocket
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ server, maxPayload: 10 * 1024 * 1024 });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle message from client to set spreadsheetId and range
  ws.on('message', async (message) => {
    try {
      const { spreadsheetId, range } = JSON.parse(message);

      // Fetch and send the initial data when the WebSocket is connected
      const data = await fetchDataWithRetry(spreadsheetId, range);
      const convertedData = convertValues(data);

      const sendChunks = (data) => {
        if (data.length < 1000) {
          // Send data directly if it contains fewer than 1000 rows
          ws.send(JSON.stringify({ type: 'data', data }));
        } else {
          // Chunk the data if it contains 1000 rows or more
          const chunkSize = determineChunkSize(data.length);
          const chunks = chunkData(data, chunkSize);

          // Send each chunk to the client
          chunks.forEach((chunk) => {
            ws.send(JSON.stringify({ type: 'data', data: chunk }));
          });
        }
      };

      sendChunks(convertedData);

      // Indicate that all data or chunks have been sent
      ws.send(JSON.stringify({ type: 'complete' }));

      // Set up a heartbeat to check if the client is still connected
      const heartbeat = setInterval(async () => {
        if (ws.readyState === WebSocket.OPEN) {
          try {
            const data = await fetchDataWithRetry(spreadsheetId, range);
            const convertedData = convertValues(data);

            sendChunks(convertedData);

            // Indicate that all data or chunks have been sent
            ws.send(JSON.stringify({ type: 'complete' }));
          } catch (error) {
            console.error('Error fetching data: ', error);
            ws.send(JSON.stringify({ type: 'error', message: 'Failed to retrieve data.' }));
          }
        }
      }, 1000 * 60 * 5); // Poll every 5 minutes (can be adjusted)

      // Clean up the heartbeat when the connection closes
      ws.on('close', () => {
        clearInterval(heartbeat);
        console.log('Client disconnected');
      });
    } catch (error) {
      console.error('Error processing message: ', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid data.' }));
    }
  });
});

// Start the HTTP server (with WebSocket only)
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`WebSocket server running on port ${port}`);
});
