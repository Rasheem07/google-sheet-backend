const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// Function to get cell values from Google Sheets
async function getValues(spreadsheetId, range) {
  // Path to your credentials file (using path.dirname to resolve dynamically)
  const credentialsPath = path.join(__dirname, "credentials.json");
  
  // Read the credentials file
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

  // Create GoogleAuth instance with credentials
  const auth = new GoogleAuth({
    credentials: credentials,
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

module.exports = getValues;
