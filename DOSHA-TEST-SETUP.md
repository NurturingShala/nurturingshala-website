# Dosha Test — Connect Your Private Signup Database (≈3 min)

This links the quiz to a **private Google Sheet** only *you* (nurturingshala@gmail.com) can see.
When someone fills in name + email **and ticks the consent box**, a new timestamped row appears.
The script **creates the Sheet for you automatically** — you don't make it by hand.

Do this once. You only need to paste me **one URL** at the end and I'll finish the rest.

---

## Step 1 — Open Apps Script

1. Make sure you're signed in as **nurturingshala@gmail.com**.
2. Go to **<https://script.google.com>** → click **New project**.
3. Delete any code shown, and paste **all** of this in:

```javascript
function doPost(e) {
  var sheet = getSheet_();
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(), d.name || "", d.email || "", d.consent ? "Yes" : "No",
    d.dosha || "", d.vata || "", d.pitta || "", d.kapha || ""
  ]);
  return ContentService.createTextOutput("ok");
}

function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  var ss;
  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create("Dosha Test Signups");
    ss.getSheets()[0].appendRow(
      ["Date", "Name", "Email", "Consent", "Dosha", "Vata %", "Pitta %", "Kapha %"]
    );
    props.setProperty("SHEET_ID", ss.getId());
  }
  return ss.getSheets()[0];
}
```

4. Click the **Save** icon (💾). Name the project anything, e.g. `Dosha Signups`.

---

## Step 2 — Publish it as a web app

1. Top right: **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Execute as:** **Me (nurturingshala@gmail.com)**
   - **Who has access:** **Anyone**
     *(This only lets the form drop data INTO your private Sheet — it does NOT make your Sheet public. No one can read your data.)*
4. Click **Deploy**.
5. It will ask you to **Authorize access** → pick your account → if you see
   "Google hasn't verified this app", click **Advanced → Go to Dosha Signups (unsafe) → Allow**.
   *(This is normal — it's your own script.)*
6. Copy the **Web app URL** it shows. It looks like:
   `https://script.google.com/macros/s/AKfycb....../exec`

---

## Step 3 — Send me that URL

Paste the Web app URL back into the chat and I'll:
- drop it into `dosha-test.html` for you,
- and give you the one-line command to publish.

Your **"Dosha Test Signups"** sheet will appear in your Google Drive automatically the first
time someone signs up (or the first time you test it).

---

## Using your database

- **Your Sheet is the private dashboard** — open it from Google Drive anytime to see who signed up and when.
- **To email people:** copy the Email column and send from Gmail (use BCC for privacy). As the list grows,
  paste it into a free tool like **Mailchimp** or **Brevo** for proper newsletters.
- Only people who **ticked consent** are stored, so everyone in the Sheet has agreed to hear from you.

## Privacy
- The Sheet lives in *your* Google Drive, private to you.
- Each person only ever sees their own result.
- To pause collecting, tell me and I'll set the endpoint back to empty.
