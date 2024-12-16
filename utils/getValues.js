const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");

// Function to get cell values from Google Sheets
async function getValues(spreadsheetId, range) {

  // If data is not in cache, make a request to Google Sheets API
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const service = google.sheets({ version: "v4", auth });

  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const data = result.data.values;

    console.log(`${data.length} rows retrieved.`);
    return data;
  } catch (err) {
    throw new Error(`Error retrieving data: ${err.message}`);
  }
}

module.exports = getValues