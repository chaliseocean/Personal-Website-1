// Updated Google Apps Script code to handle form submissions with automatic header setup
// Deploy this as a web app in Google Apps Script with your deployment ID: AKfycbw66_Hdjqyxz8YRPCZ-ro87ukwhBul10slaTuLCKwj3IvbAIJ5WDhoQ-ki6fl2Uctqm2g

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
          timestamp: params.get("timestamp") || new Date().toISOString(),
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

    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    let sheet = spreadsheet.getActiveSheet()

    // If no active sheet exists, create one
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Contact Form Submissions")
    }

    // Check if this is the first time (no headers exist)
    const lastRow = sheet.getLastRow()

    if (lastRow === 0) {
      // Add headers for the first time
      const headers = ["Timestamp", "Name", "Email", "Message"]
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])

      // Format the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length)
      headerRange.setFontWeight("bold")
      headerRange.setBackground("#4285f4")
      headerRange.setFontColor("white")

      // Set column widths for better readability
      sheet.setColumnWidth(1, 150) // Timestamp
      sheet.setColumnWidth(2, 120) // Name
      sheet.setColumnWidth(3, 200) // Email
      sheet.setColumnWidth(4, 300) // Message

      console.log("Headers created successfully")
    }

    // Format the timestamp to be more readable
    const formattedTimestamp = new Date(data.timestamp).toLocaleString()

    // Add the new row with form data
    const newRowData = [formattedTimestamp, data.name || "N/A", data.email || "N/A", data.message || "N/A"]

    sheet.appendRow(newRowData)

    console.log("Form submission added:", newRowData)

    // Return success response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully",
        data: {
          timestamp: formattedTimestamp,
          name: data.name,
          email: data.email,
        },
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      })
  } catch (error) {
    console.error("Error in doPost:", error)

    // Return error response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        message: "There was an error processing your form submission",
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      })
  }
}

function doGet(e) {
  // Handle GET requests and preflight OPTIONS requests
  return ContentService.createTextOutput("Ocean Chalise Contact Form Handler is working! ✅")
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

// Optional: Function to manually set up headers if needed
function setupHeaders() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getActiveSheet()

  if (!sheet) {
    sheet = spreadsheet.insertSheet("Contact Form Submissions")
  }

  // Clear existing content and add headers
  sheet.clear()
  const headers = ["Timestamp", "Name", "Email", "Message"]
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])

  // Format the header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length)
  headerRange.setFontWeight("bold")
  headerRange.setBackground("#4285f4")
  headerRange.setFontColor("white")

  // Set column widths
  sheet.setColumnWidth(1, 150) // Timestamp
  sheet.setColumnWidth(2, 120) // Name
  sheet.setColumnWidth(3, 200) // Email
  sheet.setColumnWidth(4, 300) // Message

  console.log("Headers setup completed manually")
}
