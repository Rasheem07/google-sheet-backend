module.exports = function convertToObjectArray(data) {
    if (!data || data.length === 0) {
      console.error('No data provided');
      return [];
    }
  
    const headers = data[0]; // The first row is the header
    const rows = data.slice(1); // All the subsequent rows are data
  
    // Ensure the headers are not empty
    if (!headers || headers.length === 0) {
      console.error('No headers found in the data');
      return [];
    }
  
    // Map each row to an object where keys are the headers and values are from the row
    return rows.map((row) => {
      return row.reduce((acc, curr, index) => {
        if (headers[index] !== undefined) {
          acc[headers[index]] = curr || ''; // Handle undefined or null values by defaulting to an empty string
        }
        return acc;
      }, {});
    });
  };
  