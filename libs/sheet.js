'use strict';

const {google} = require('googleapis');

module.exports = async (GOOGLE_SA_KEY_JSON_STR, SHEET_ID, data) => {
  
  const auth = new google.auth.GoogleAuth({
    // keyFile: GOOGLE_SA_KEY_JSON_STR,
    credentials: JSON.parse(GOOGLE_SA_KEY_JSON_STR),
    scopes: [
      `https://www.googleapis.com/auth/spreadsheets.readonly`,
      `https://www.googleapis.com/auth/spreadsheets`,
      `https://www.googleapis.com/auth/drive.file`,
      `https://www.googleapis.com/auth/drive`
    ],
  });
  const sheets = google.sheets({
    version: 'v4',
    auth: auth
  });

  let values = [data];
  const requestBody = {
    values,
  };

  try {
    const params = {
      spreadsheetId: SHEET_ID,
      range: 'sheet1!A:B',
      valueInputOption: 'RAW',
      requestBody: requestBody,
    };

    return await sheets.spreadsheets.values.append(params);
  } catch (error) {
    throw new Error(error);
  }

}