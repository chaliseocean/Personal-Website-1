// Run this function in Google Apps Script to find or create your data sheet
function findOrCreateDataSheet() {
  try {
    // Method 1: Check if there's already an active spreadsheet
    let spreadsheet

    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
      console.log("Found existing spreadsheet:", spreadsheet.getName())
      console.log("Spreadsheet URL:", spreadsheet.getUrl())
    } catch (e) {
      // No active spreadsheet, create a new one
      spreadsheet = SpreadsheetApp.create("Ocean Chalise - Contact Form Submissions")
      console.log("Created new spreadsheet:", spreadsheet.getName())
      console.log("Spreadsheet URL:", spreadsheet.getUrl())
    }

    // Get or create the sheet
    const sheet = spreadsheet.getActiveSheet()

    // Rename the sheet if it's the default name
    if (sheet.getName() === "Sheet1") {
      sheet.setName("Contact Form Submissions")
    }

    // Set up headers if they don't exist
    if (sheet.getLastRow() === 0) {
      const headers = ["Timestamp", "Name", "Email", "Message"]
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])

      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length)
      headerRange.setFontWeight("bold")
      headerRange.setBackground("#4285f4")
      headerRange.setFontColor("white")

      // Set column widths
      sheet.setColumnWidth(1, 150) // Timestamp
      sheet.setColumnWidth(2, 120) // Name
      sheet.setColumnWidth(3, 200) // Email
      sheet.setColumnWidth(4, 300) // Message
    }

    // Log important information
    console.log("=== YOUR FORM DATA LOCATION ===")
    console.log("Spreadsheet Name:", spreadsheet.getName())
    console.log("Spreadsheet ID:", spreadsheet.getId())
    console.log("Spreadsheet URL:", spreadsheet.getUrl())
    console.log("Sheet Name:", sheet.getName())
    console.log("Current Rows:", sheet.getLastRow())

    // Return the URL so you can easily access it
    return {
      name: spreadsheet.getName(),
      id: spreadsheet.getId(),
      url: spreadsheet.getUrl(),
      sheetName: sheet.getName(),
      rows: sheet.getLastRow(),
    }
  } catch (error) {
    console.error("Error finding/creating sheet:", error)
    return null
  }
}

// Run this to get a direct link to your data
function getDataSheetInfo() {
  const info = findOrCreateDataSheet()
  if (info) {
    console.log("📊 Access your form data here:", info.url)
    return info.url
  }
}
