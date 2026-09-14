function doGet() {
	return HtmlService.createHtmlOutputFromFile('ADD YOUR INDEX FILE HERE')
	.setTitle('Secure Login and Register')
	.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function registerUser(email, username, password) {
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ADD YOUR SHEET NAME HERE");

	if (!sheet) {
		return "Error: Sheet 'Users' not found!";
	}

	var data = sheet.getDataRange().getValues();

	// Check if email already exists
	for (var i = 1; i < data.length; i++) {
		if (data[i][0] === email) {
			return "Email already registered";
		}
	}

	// Save the password exactly as entered (no encoding)
	sheet.appendRow([email, username, password]);

	return "success"; // This response will be used in JavaScript
}

function loginUser(email, password) {
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ADD YOUR SHEET NAME HERE");
	if (!sheet) {
		return "Error: Users sheet not found!";
	}

	var data = sheet.getDataRange().getValues();
	if (!email || !password) {
		return "Error: Email or password cannot be empty!";
	}

	email = email.trim().toLowerCase();
	password = password.trim();

	for (var i = 1; i < data.length; i++) {
		var storedEmail = data[i][0].toString().trim().toLowerCase();
		var storedPassword = data[i][2].toString().trim();

		if (storedEmail === email && storedPassword === password) {
			var html = HtmlService.createHtmlOutputFromFile('ADD YOUR WELCOME FILE HERE')
			.setTitle('Welcome')
			.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
			return html.getContent();
		}
	}

	return "Incorrect email or password!";
}
