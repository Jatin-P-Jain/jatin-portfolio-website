// app/api/auth/callback/route.ts
import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 }
    );
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    `${process.env.BASE_URL}/api/auth/callback`
  );

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Store tokens securely (e.g., cookies or database)
    const response = NextResponse.redirect("/");
    response.cookies.set("access_token", tokens.access_token || "", {
      httpOnly: true,
    });
    response.cookies.set("refresh_token", tokens.refresh_token || "", {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    console.error("OAuth callback error:", err);
    return NextResponse.json(
      { error: "Failed to exchange code for tokens" },
      { status: 500 }
    );
  }
}
