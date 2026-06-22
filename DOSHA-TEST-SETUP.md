# Dosha Test — Private Signup Database Setup

This connects the dosha quiz to a **private Google Sheet** that only *you* (nurturingshala@gmail.com)
can see. Every time someone fills in their name + email **and ticks the consent box**, a new
timestamped row appears in your Sheet. You can then email those people about workshops whenever you like.

It's free, takes about 5 minutes, and you only do it **once**.

---

## Step 1 — Create the Sheet

1. Go to <https://sheets.google.com> (signed in as **nurturingshala@gmail.com**).
2. Create a **Blank spreadsheet**. Name it e.g. **`Dosha Test Signups`**.
3. In **row 1**, type these headers (one per column, A–H):

   | A | B | C | D | E | F | G | H |
   |---|---|---|---|---|---|---|---|
   | Date | Name | Email | Consent | Dosha | Vata % | Pitta % | Kapha % |

---

## Step 2 — Add the script

1. In that Sheet, click **Extensions → Apps Script**.
2. Delete whatever code is in the editor, and paste this in:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.consent ? "Yes" : "No",
    data.dosha || "",
    data.vata || "",
    data.pitta || "",
    data.kapha || ""
  ]);
  return ContentService.createTextOutput("ok");
}
```

3. Click the **Save** icon (💾).

---

## Step 3 — Publish it as a web app

1. Top right, click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** `Dosha signups`
   - **Execute as:** **Me (nurturingshala@gmail.com)**
   - **Who has access:** **Anyone**
     *(This only means the form can post into your private sheet — it does NOT make the sheet public. Nobody can read your data.)*
4. Click **Deploy**.
5. Google will ask you to **Authorize access** → choose your account → if you see "Google hasn't verified this app", click **Advanced → Go to (your project) → Allow**. (This is normal for your own scripts.)
6. Copy the **Web app URL** it gives you. It looks like:
   `https://script.google.com/macros/s/AKfycb..../exec`

---

## Step 4 — Paste the URL into the quiz

1. Open **`dosha-test.html`**.
2. Near the top of the `<script>` section find this line:

   ```javascript
   const SHEET_ENDPOINT = "";
   ```

3. Paste your URL between the quotes:

   ```javascript
   const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycb..../exec";
   ```

4. Save the file, then re-publish the site (`git push`).

That's it. Do the quiz yourself with a test email + consent ticked, and watch a row appear in your Sheet. 🎉

---

## Using your database

- **Your Sheet is the private dashboard.** Open it anytime to see who signed up and when (the Date column).
- **To email people:** select the Email column, copy the addresses, and send from Gmail (use BCC for privacy).
  When the list grows, you can paste it into a free tool like **Mailchimp** or **Brevo** for proper newsletters.
- Only people who **ticked the consent box** are stored — so everyone in your Sheet has agreed to hear from you.

---

## Privacy notes

- The Sheet lives in *your* Google Drive and is private to you.
- The quiz never shows anyone else's data — each person only sees their own result.
- If you ever want to stop collecting, just set `SHEET_ENDPOINT = "";` again and re-push.
