
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

// Load the credentials from the .env file

module.exports = async function getValues(spreadsheetId, range) {
  const googleCredentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  
  // Set up GoogleAuth with the loaded credentials
  const auth = new GoogleAuth({
    credentials: googleCredentials,  // Pass the credentials object directly
    scopes: 'https://www.googleapis.com/auth/spreadsheets',  // Use the required scope
  });
  
  // Use this auth object to authenticate requests
  const service = google.sheets({ version: 'v4', auth });
  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const data = result.data.values;
    console.log(`${data.length} rows retrieved.`);
    return data;
  } catch (err) {
    console.error('Error retrieving data: ', err);
    throw new Error(`Error retrieving data: ${err.message}`);
  }
}
