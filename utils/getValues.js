const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const credentials = {
  "type": "service_account",
  "project_id": "testimonial-435612",
  "private_key_id": "0238d312f0f4c3839d553534216f52e261ac5f31",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvUoES5F3VKb5t\nOuth0w5AtVfL9JnSs2rQx1iX0PsoQiPWVDLqdNsh0Itxq3cCR2qZ/bYCHDzOiULl\nKM774jPAjuQPw23Guqv0Zze1H0m3hWINF24t0CNFM3KNao8Sbb4WfqpZWka+qbus\ntQl7X4WVHzJhlF2K3nKZVAaX6w8BTiMsK07lVZeE2/UFDJ6L8RtshEW7a583J1KY\nIOD/0v+pzJNJ398sOQs8I73zgV6lG6pKL75CRjjaJeo4nW9D/p6QFQ8NT5bMaf8v\nx76gcCYg9ar+QaHJTV5UnZdMngx347daYEBOaVEGUnbcGQIVkznvRCJtLlPfpw+U\nfDQjKH6fAgMBAAECggEAEdbezFnRVGnRdxLaNZOArUPmgZnLdx2Lfl/yW0xH6hJE\nzD+4CJRIYdny/md4jhJPPgkLVo6h/1AHLwMmgInFQ1Am05XKm0COU6mXCQZ8fUCE\nuBlMvDukAxwXiV0w3qqs/2P3GG1vqmHh91JaeyO+l2xbt4Mdu44j8gcTPq0L01GB\nc2F46TaE29qqXewCHBL9gQxYCHWas95s0w3X/A8l2Bd8lJH/3jR+gqiRZi/Demip\nGZd/EFuVfbQfP/I0tQSuZ4wWW0fPHOCmU0RPIObxXteqtFAObZ7cXlnWeK4M9e6r\ndsnof0LfNrfYVLcZ2FzNV+tO44VFVmzA6WFal9hpWQKBgQDW9yveX2MPcAG3g+Kw\nG6sG2coFzeiTzkNro4meEvIYQg4xhW7WywP/lAQNaLfXlQ/otb6l1+vjmn38AchY\nyeRnWgU06W3totmjBZ55u50vqWYTAnGhEyXodtfvhpIBdxVtPWQoiVlIfcK9F/RU\n1nmrspojottnCZuLsu99lx4F5wKBgQDQyhElI3FZLKcsfqKH1vFGa51R9YyY6gvv\nWCW+C0I5kZNSUDvO4jhgjJOL92dl2WSqcMY3ze3tUUDReiF6FsYlUBwGd0HKw+Ef\npZ3Sz77a/QohiKdDKCjhmR+0YkWkFOq4isOmPuWEmstN3s6unFeVxaG6zyelgEKh\nJdp9uRc6iQKBgQDBk4MllLAXzr09DL6t57xzRtvtriaqMyvzWikq99Sak6FEZuwQ\n8HCBTkD38jzbHZhd7ovnvDDnnM+mh9RqYCQWDbJym2IqhGOHsh+rb490xA7vP1wj\nuKKCW8LIJ16Dg0EARjBTcJu988HRliin3RtjykmTnawFdVlky5Vuew7GMQKBgQCl\nXDSCBnUiXFQ20EDndxv2WwrpO6HUBiHXuSeDQaV8tMhKPBNyQgbGqO++vf5dUvUA\nbHsA/Y8AEwdUIPdcm6bpLG5VzKQF9GdbSi8aJMES7a/VaUaX0Lm4Gy9aDS78yjgw\nWm6kP1JGWNbF4L4u2tIfY7w4mRLcaB3dRX6rbilwiQKBgAn/eZ7L7AEi1sgXFgDl\nvSY7G/kVVRYnN1m4REKFEWkZqjvd8amSh8NI9CyfU9ATWtUQ5YbACM6ZPeph2lwA\nmtvZR+xB7l2xlsyW2HKM9MV9XNg/OeQnB/QU79bT/kd0VlCDe0uG5TuK0LJSxWhk\nZnQoTUaknb+MLNGqtvJXPnuX\n-----END PRIVATE KEY-----\n",
  "client_email": "test-google-sheets-api@testimonial-435612.iam.gserviceaccount.com",
  "client_id": "115421894865680014897",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/test-google-sheets-api%40testimonial-435612.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Function to get cell values from Google Sheets
async function getValues(spreadsheetId, range) {

  // If data is not in cache, make a request to Google Sheets API
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

module.exports = getValues