class ApiGoogleSheet {
  static async getResponse(range, sheetId = sheetId) {
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  static async getHeaders(range) {
    let response = await this.getResponse(range);
    response = response.result.values;
    let headers = response[0];
    headers = headers.map((item) => item.toLocaleLowerCase());
    return headers;
  }
  static async postData(range, data) {
    try {
      let response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        includeValuesInResponse: true,
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: [data],
        },
      });
      return response;
    } catch (e) {}
  }
}
