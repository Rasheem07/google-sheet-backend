const getValues = require("./getValues");

// Retry logic for fetching data with exponential backoff
async function fetchDataWithRetry(spreadsheetId, range) {
    let retryCount = 0;
    const maxRetries = 2;
  
    while (retryCount < maxRetries) {
      try {
        return await getValues(spreadsheetId, range);
      } catch (error) {
        retryCount++;
        console.error(`Error fetching data, attempt ${retryCount}:`, error);
        if (retryCount === maxRetries) {
          throw error;  // Fail after max retries
        }
        // Optional: Add delay between retries (e.g., exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));  // Backoff time
      }
    }
  }

  module.exports = fetchDataWithRetry;