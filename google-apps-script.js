// Google Apps Script code to handle form submissions
// Deploy this as a web app in Google Apps Script

function doPost(e) {
  try {
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents)

    // Open your Google Sheet (replace with your actual sheet ID)
    const sheet = SpreadsheetApp.openById("YOUR_GOOGLE_SHEET_ID").getActiveSheet()

    // If this is the first time, add headers
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Name", "Email", "Message"]])
    }

    // Add the new row with form data
    sheet.appendRow([data.timestamp, data.name, data.email, data.message])

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

function doGet() {
  return ContentService.createTextOutput("Contact form handler is working!").setMimeType(ContentService.MimeType.TEXT)
}
