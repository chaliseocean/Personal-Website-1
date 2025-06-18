// Updated Google Apps Script code to handle form submissions with CORS
// Deploy this as a web app in Google Apps Script

function doPost(e) {
  try {
    // Handle both JSON and form-encoded data
    let data

    if (e.postData && e.postData.contents) {
      // Try to parse as JSON first
      try {
        data = JSON.parse(e.postData.contents)
      } catch (jsonError) {
        // If JSON parsing fails, parse as form data
        const params = new URLSearchParams(e.postData.contents)
        data = {
          name: params.get("name"),
          email: params.get("email"),
          message: params.get("message"),
          timestamp: params.get("timestamp"),
        }
      }
    } else {
      // Handle URL parameters (GET-style parameters in POST)
      data = {
        name: e.parameter.name,
        email: e.parameter.email,
        message: e.parameter.message,
        timestamp: e.parameter.timestamp || new Date().toISOString(),
      }
    }

    // Open your Google Sheet (replace with your actual sheet ID)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // If this is the first time, add headers
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Name", "Email", "Message"]])
    }

    // Add the new row with form data
    sheet.appendRow([data.timestamp, data.name, data.email, data.message])

    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Form submitted successfully" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      })
  } catch (error) {
    console.error("Error in doPost:", error)

    // Return error response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      })
  }
}

function doGet(e) {
  // Handle preflight OPTIONS requests
  return ContentService.createTextOutput("Contact form handler is working!")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    })
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput("").setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  })
}
