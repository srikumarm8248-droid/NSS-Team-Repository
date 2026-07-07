/**
 * NSS Volunteer Registration — Apps Script Backend
 * ==================================================
 * SETUP (one-time):
 * 1. Create a Google Sheet with a tab named exactly: Registrations
 *    Header row (row 1): 
 *    S.No | NSS ID | Name | Gender | DOB | Class | Subject | Mobile | Email |
 *    Aadhaar | Community | Blood Group | Remarks | Photo Drive Link |
 *    Card PNG Link | Card PDF Link | Timestamp
 * 2. Create a Google Drive folder for photos and another for cards (or reuse one).
 * 3. Paste this whole file into Extensions > Apps Script in that Sheet.
 * 4. Fill in the three constants just below with your real IDs.
 * 5. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
 * 6. Copy the deployment URL into APPS_SCRIPT_URL at the top of registration.html.
 */

const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const PHOTOS_FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';
const CARDS_FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';

const ADMIN_EMAIL = 'srikumarm161@gmail.com';
const ID_PREFIX = 'C26UG111NSS';
const REGISTRATION_CAP = 500;
const SHEET_NAME = 'Registrations';

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut({ success: false, error: 'Malformed request.' });
  }

  switch (body.action) {
    case 'register': return handleRegister(body.data);
    case 'finalize': return handleFinalize(body);
    case 'lookup':   return handleLookup(body.query);
    default:         return jsonOut({ success: false, error: 'Unknown action.' });
  }
}

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

/* ---------------- Register: validate, assign ID, save row + photo ---------------- */
function handleRegister(data) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  const currentCount = lastRow - 1; // minus header

  if (currentCount >= REGISTRATION_CAP) {
    return jsonOut({ success: false, error: 'Registration is currently full. Please contact the NSS office.' });
  }

  // ---- basic server-side validation (never trust the client alone) ----
  const required = ['name','gender','dob','className','subject','mobile','email','aadhaar','community','bloodGroup'];
  for (const key of required) {
    if (!data[key] || String(data[key]).trim() === '') {
      return jsonOut({ success: false, error: 'Missing required field: ' + key });
    }
  }
  if (!/^\d{10}$/.test(data.mobile)) return jsonOut({ success:false, error:'Invalid mobile number.' });
  if (!/^\d{12}$/.test(data.aadhaar)) return jsonOut({ success:false, error:'Invalid Aadhaar number.' });
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return jsonOut({ success:false, error:'Invalid email address.' });

  // ---- prevent duplicate registration by email ----
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][8]).toLowerCase() === data.email.toLowerCase()) {
      return jsonOut({ success:false, error:'This email is already registered as ' + values[i][1] });
    }
  }

  // ---- assign sequential ID ----
  const nextNum = currentCount + 1;
  const studentId = ID_PREFIX + String(nextNum).padStart(3, '0');

  // ---- save photo to Drive ----
  let photoUrl = '';
  if (data.photo) {
    try {
      const blob = base64ToBlob(data.photo, 'image/jpeg', studentId + '-photo.jpg');
      const folder = DriveApp.getFolderById(PHOTOS_FOLDER_ID);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      photoUrl = file.getUrl();
    } catch (err) {
      photoUrl = 'upload failed: ' + err;
    }
  }

  // ---- append row ----
  sheet.appendRow([
    nextNum, studentId, data.name, data.gender, data.dob, data.className, data.subject,
    data.mobile, data.email, data.aadhaar, data.community, data.bloodGroup,
    data.remarks || '', photoUrl, '', '', new Date()
  ]);

  return jsonOut({ success: true, studentId: studentId });
}

/* ---------------- Finalize: save card files, send emails ---------------- */
function handleFinalize(body) {
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  let rowIndex = -1, rowData = null;
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === body.studentId) { rowIndex = i + 1; rowData = values[i]; break; }
  }
  if (rowIndex === -1) return jsonOut({ success:false, error:'Registration not found.' });

  const pngBlob = base64ToBlob(body.png, 'image/png', body.studentId + '-card.png');
  const pdfBlob = base64ToBlob(body.pdf, 'application/pdf', body.studentId + '-card.pdf');

  const folder = DriveApp.getFolderById(CARDS_FOLDER_ID);
  const pngFile = folder.createFile(pngBlob);
  const pdfFile = folder.createFile(pdfBlob);
  pngFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  sheet.getRange(rowIndex, 15).setValue(pngFile.getUrl()); // Card PNG Link
  sheet.getRange(rowIndex, 16).setValue(pdfFile.getUrl()); // Card PDF Link

  // ---- email the student ----
  MailApp.sendEmail({
    to: body.email,
    subject: 'Your NSS Volunteer ID — ' + body.studentId,
    htmlBody:
      '<p>Hi ' + rowData[2] + ',</p>' +
      '<p>You are registered as an NSS volunteer at M.G.R. College, Hosur for 2025–2026.</p>' +
      '<p><b>Your Volunteer ID: ' + body.studentId + '</b></p>' +
      '<p>Your ID card is attached as both an image and a PDF. Please keep it safe — you can also use your ID or this email address to retrieve it again anytime.</p>' +
      '<p>— NSS Unit, M.G.R. College</p>',
    attachments: [pngBlob, pdfBlob]
  });

  // ---- notify admin ----
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: 'New NSS registration — ' + body.studentId + ' — ' + rowData[2],
    htmlBody:
      '<p>New volunteer registered:</p>' +
      '<table border="1" cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:13px;">' +
      '<tr><td>ID</td><td>' + body.studentId + '</td></tr>' +
      '<tr><td>Name</td><td>' + rowData[2] + '</td></tr>' +
      '<tr><td>Gender</td><td>' + rowData[3] + '</td></tr>' +
      '<tr><td>DOB</td><td>' + rowData[4] + '</td></tr>' +
      '<tr><td>Class</td><td>' + rowData[5] + '</td></tr>' +
      '<tr><td>Subject</td><td>' + rowData[6] + '</td></tr>' +
      '<tr><td>Mobile</td><td>' + rowData[7] + '</td></tr>' +
      '<tr><td>Email</td><td>' + rowData[8] + '</td></tr>' +
      '<tr><td>Community</td><td>' + rowData[10] + '</td></tr>' +
      '<tr><td>Blood group</td><td>' + rowData[11] + '</td></tr>' +
      '<tr><td>Remarks</td><td>' + (rowData[12] || '—') + '</td></tr>' +
      '<tr><td>Photo</td><td>' + rowData[13] + '</td></tr>' +
      '</table>',
    attachments: [pngBlob]
  });

  return jsonOut({ success: true });
}

/* ---------------- Lookup: find by ID or email, resend stored card ---------------- */
function handleLookup(query) {
  if (!query) return jsonOut({ success:false });
  const sheet = getSheet();
  const values = sheet.getDataRange().getValues();
  const q = query.trim().toLowerCase();

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (String(row[1]).toLowerCase() === q || String(row[8]).toLowerCase() === q) {
      const pngUrl = row[14], pdfUrl = row[15];
      if (!pngUrl) return jsonOut({ success:false, error:'Card not ready yet — please try again shortly.' });

      const pngFile = DriveApp.getFileById(extractFileId(pngUrl));
      const pdfFile = DriveApp.getFileById(extractFileId(pdfUrl));

      MailApp.sendEmail({
        to: row[8],
        subject: 'Your NSS Volunteer ID — ' + row[1] + ' (resend)',
        htmlBody: '<p>Hi ' + row[2] + ', here is your NSS volunteer ID card again.</p><p><b>ID: ' + row[1] + '</b></p>',
        attachments: [pngFile.getBlob(), pdfFile.getBlob()]
      });
      return jsonOut({ success:true });
    }
  }
  return jsonOut({ success:false, error:'No matching registration found.' });
}

/* ---------------- Helpers ---------------- */
function base64ToBlob(dataUrl, mimeType, filename) {
  const base64 = dataUrl.split(',')[1] || dataUrl;
  const bytes = Utilities.base64Decode(base64);
  return Utilities.newBlob(bytes, mimeType, filename);
}

function extractFileId(driveUrl) {
  const match = driveUrl.match(/[-\w]{25,}/);
  return match ? match[0] : driveUrl;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
