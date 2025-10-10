import { google } from "googleapis";
import readline from "readline";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3000/api/auth/callback"
);
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
});
console.log("Authorize this app by visiting:", authUrl);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter the code from that page here: ", async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("Refresh Token:", tokens.refresh_token);
  rl.close();
});
